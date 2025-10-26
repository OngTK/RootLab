import { useEffect, useMemo, useState } from "react";
import axios from "axios";

/**
 * props.onChange({ ldNo, regnCd, signguCd })
 *  - 1차 표기: lDongRegnNm
 *  - 2차 표기: lDongSignguNm
 *  - 값/코드: lDongRegnCd, lDongSignguCd, ldNo(최종)
 */
export default function RegionSelect({ value, onChange }) {
    const [rows, setRows] = useState([]);
    const [regnCd, setRegnCd] = useState("");    // 1차 선택값(lDongRegnCd)
    const [signguCd, setSignguCd] = useState(""); // 2차 선택값(lDongSignguCd)
    const [ldNo, setLdNo] = useState(null);       // 최종 선택 ldNo

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/ldongcode/getAllDong");
                if (mounted) setRows(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error("지역코드 로딩 실패:", e);
                if (mounted) setRows([]);
            }
        })();
        return () => { mounted = false; };
    }, []);

    // 1차: 시/도 목록 (중복 제거)
    const regnOptions = useMemo(() => {
        const seen = new Set();
        const out = [];
        for (const r of rows) {
            const cd = r.lDongRegnCd ?? r.ldongRegnCd;     // 대/소문자 모두 허용
            const nm = r.lDongRegnNm ?? r.ldongRegnNm;
            if (!cd || seen.has(cd)) continue;
            seen.add(cd);
            out.push({ code: cd, name: nm });
        }
        // 정렬이 필요하면 아래 주석 해제
        // out.sort((a,b) => a.name.localeCompare(b.name, "ko"));
        return out;
    }, [rows]);

    // 2차: 선택된 시/도의 시군구 목록
    const signguOptions = useMemo(() => {
        if (!regnCd) return [];
        const seen = new Set();
        const out = [];
        for (const r of rows) {
            const rowRegn = r.lDongRegnCd ?? r.ldongRegnCd;
            if (rowRegn !== regnCd) continue;
            const cd = r.lDongSignguCd ?? r.ldongSignguCd;
            const nm = r.lDongSignguNm ?? r.ldongSignguNm;
            if (!cd || seen.has(cd)) continue;
            seen.add(cd);
            out.push({ code: cd, name: nm });
        }
        return out;
    }, [rows, regnCd]);

    const onChangeRegn = (e) => {
        console.log(e.target.value)
        const v = e.target.value;
        setRegnCd(v);
        setSignguCd("");
        setLdNo(null);
        const regnNm = v
            ? regnOptions.find(opt => opt.code === v)?.name
            : null;
        // 이름까지 함께 전달
        onChange?.({
            ldNo: null,
            regnCd: v || null,
            regnNm: regnNm || null,
            signguCd: null,
            signguNm: null
        });
    };

    const onChangeSigngu = (e) => {
        console.log(e.target.value)
        const v = e.target.value;
        setSignguCd(v);

        const found = rows.find(
            r => (r.lDongRegnCd ?? r.ldongRegnCd) === regnCd &&
                (r.lDongSignguCd ?? r.ldongSignguCd) === v
        );
        const nextLdNo = found?.ldNo ?? found?.ldno ?? null;
        const regnNm = found?.lDongRegnNm ?? found?.ldongRegnNm ?? null;
        const signguNm = found?.lDongSignguNm ?? found?.ldongSignguNm ?? null;

        setLdNo(nextLdNo);
        // 이름까지 함께 전달
        onChange?.({
            ldNo: nextLdNo,
            regnCd: regnCd || null,
            regnNm: regnNm || null,
            signguCd: v || null,
            signguNm: signguNm || null
        });
    };

    return (
        <span className="form-group">
            <label htmlFor="region-1">1차 지역</label>
            <select id="region-1" name="region1" value={regnCd} onChange={onChangeRegn}>
                <option value="">전체</option>
                {regnOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.name}</option>
                ))}
            </select>

            <label className="sr-only" htmlFor="region-2">2차 지역</label>
            <select
                id="region-2"
                name="region2"
                value={signguCd}
                onChange={onChangeSigngu}
                disabled={!regnCd}
            >
                <option value="">전체</option>
                {signguOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.name}</option>
                ))}
            </select>

            {/* 필요 시 폼 전송용 숨김 필드 */}
            <input type="hidden" name="ldNo" value={ldNo ?? ""} />
        </span>
    );
}
