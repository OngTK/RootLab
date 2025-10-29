import { useEffect, useMemo, useState } from "react";
import axios from "axios";

/**
 * props.onChange({ ccNo, l1Cd, l2Cd, l3Cd })
 * labels는 화면표시(…Nm), values는 코드와 ccNo를 상태로 보관
 */
export default function CategorySelect({ value, onChange, idSuffix = "", namePrefix = "" }) {
  const [rows, setRows] = useState([]);            // 원본 API rows
  const [l1, setL1] = useState("");                // 선택된 l1Cd
  const [l2, setL2] = useState("");                // 선택된 l2Cd
  const [l3, setL3] = useState("");                // 선택된 l3Cd
  const [ccNo, setCcNo] = useState(null);          // 최종 소분류 ccNo

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/category", { params: { active: true } });
        if (mounted) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("카테고리 로딩 실패:", e);
        if (mounted) setRows([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // 중첩 자료구조: l1Map[l1Cd] = { name, children: { [l2Cd]: { name, children: [{l3Cd,name,ccNo}] } } }
  const l1Map = useMemo(() => {
    const map = new Map();
    for (const r of rows) {
      const l1Cd = r.lclsSystm1Cd, l2Cd = r.lclsSystm2Cd, l3Cd = r.lclsSystm3Cd;
      const l1Nm = r.lclsSystm1Nm, l2Nm = r.lclsSystm2Nm, l3Nm = r.lclsSystm3Nm;
      if (!map.has(l1Cd)) map.set(l1Cd, { name: l1Nm, children: new Map() });
      const l2Map = map.get(l1Cd).children;
      if (!l2Map.has(l2Cd)) l2Map.set(l2Cd, { name: l2Nm, children: [] });
      l2Map.get(l2Cd).children.push({ code: l3Cd, name: l3Nm, ccNo: r.ccNo });
    }
    return map;
  }, [rows]);

  const l1Options = useMemo(
    () => [...l1Map.entries()].map(([code, v]) => ({ code, name: v.name })),
    [l1Map]
  );
  const l2Options = useMemo(() => {
    if (!l1 || !l1Map.has(l1)) return [];
    return [...l1Map.get(l1).children.entries()].map(([code, v]) => ({ code, name: v.name }));
  }, [l1, l1Map]);
  const l3Options = useMemo(() => {
    if (!l1 || !l2 || !l1Map.has(l1)) return [];
    const l2Map = l1Map.get(l1).children;
    if (!l2Map.has(l2)) return [];
    return l2Map.get(l2).children; // [{code,name,ccNo}]
  }, [l1, l2, l1Map]);

  // 상위 변경 시 하위 리셋
  const onChangeL1 = (e) => {
    console.log(e.target.value)
    const v = e.target.value;
    setL1(v); setL2(""); setL3(""); setCcNo(null);
    const l1Nm = v ? l1Map.get(v)?.name : null;
    onChange?.({ ccNo: null, l1Cd: v || null, l2Cd: null, l3Cd: null, l1Nm, l2Nm: null, l3Nm: null });
  };

  const onChangeL2 = (e) => {
    console.log(e.target.value)
    const v = e.target.value;
    setL2(v); setL3(""); setCcNo(null);
    const l1Nm = l1 ? l1Map.get(l1)?.name : null;
    const l2Nm = v ? l1Map.get(l1)?.children.get(v)?.name : null;
    onChange?.({ ccNo: null, l1Cd: l1 || null, l2Cd: v || null, l3Cd: null, l1Nm, l2Nm, l3Nm: null });
  };
  const onChangeL3 = (e) => {
    console.log(e.target.value)
    const v = e.target.value;
    setL3(v);
    const found = l3Options.find(x => x.code === v);
    const nextCcNo = found?.ccNo ?? null;
    setCcNo(nextCcNo);
    const l1Nm = l1 ? l1Map.get(l1)?.name : null;
    const l2Nm = l2 ? l1Map.get(l1)?.children.get(l2)?.name : null;
    const l3Nm = v ? found?.name : null;
    onChange?.({ ccNo: nextCcNo, l1Cd: l1 || null, l2Cd: l2 || null, l3Cd: v || null, l1Nm, l2Nm, l3Nm });
  };

  // 외부 value 변경 시(또는 rows 로딩 후) 초기 선택 동기화
  useEffect(() => {
    if (!rows || rows.length === 0) return;
    const v = value || {};
    let nextL1 = l1, nextL2 = l2, nextL3 = l3, nextCc = ccNo;

    const byCcNo = (cc) => rows.find(r => String(r.ccNo) === String(cc));
    const byCodes = (c1, c2, c3) => rows.find(r => String(r.lclsSystm1Cd) === String(c1)
      && String(r.lclsSystm2Cd) === String(c2) && String(r.lclsSystm3Cd) === String(c3));
    const byNames = (n1, n2, n3) => rows.find(r => String(r.lclsSystm1Nm) === String(n1)
      && String(r.lclsSystm2Nm) === String(n2) && String(r.lclsSystm3Nm) === String(n3));

    let hit = null;
    if (v.ccNo) hit = byCcNo(v.ccNo);
    if (!hit && (v.l1Cd && v.l2Cd && v.l3Cd)) hit = byCodes(v.l1Cd, v.l2Cd, v.l3Cd);
    if (!hit && (v.l1Nm && v.l2Nm && v.l3Nm)) hit = byNames(v.l1Nm, v.l2Nm, v.l3Nm);

    if (hit) {
      nextL1 = hit.lclsSystm1Cd; nextL2 = hit.lclsSystm2Cd; nextL3 = hit.lclsSystm3Cd; nextCc = hit.ccNo;
      setL1(nextL1); setL2(nextL2); setL3(nextL3); setCcNo(nextCc);
      const l1Nm = hit.lclsSystm1Nm, l2Nm = hit.lclsSystm2Nm, l3Nm = hit.lclsSystm3Nm;
      onChange?.({ ccNo: nextCc, l1Cd: nextL1, l2Cd: nextL2, l3Cd: nextL3, l1Nm, l2Nm, l3Nm });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, value?.ccNo, value?.l1Cd, value?.l2Cd, value?.l3Cd, value?.l1Nm, value?.l2Nm, value?.l3Nm]);

  return (
    <div className="form-group category-group">
      <label htmlFor="category-large{ idSuffix ? ('-' + idSuffix) : '' }">카테고리</label>

      {/* 대분류: 라벨은 lclsSystm1Nm, value는 lclsSystm1Cd */}
      <select id="category-large" name="categoryLarge" value={l1} onChange={onChangeL1}>
        <option value="">대분류</option>
        {l1Options.map(opt => (
          <option key={opt.code} value={opt.code}>{opt.name}</option>
        ))}
      </select>

      {/* 중분류 */}
      <select aria-label="카테고리 중분류" name="categoryMedium" value={l2} onChange={onChangeL2} disabled={!l1}>
        <option value="">중분류</option>
        {l2Options.map(opt => (
          <option key={opt.code} value={opt.code}>{opt.name}</option>
        ))}
      </select>

      {/* 소분류: 선택 시 ccNo가 결정됨 */}
      <select aria-label="카테고리 소분류" name="categorySmall" value={l3} onChange={onChangeL3} disabled={!l2}>
        <option value="">소분류</option>
        {l3Options.map(opt => (
          <option key={opt.code} value={opt.code}>{opt.name}</option>
        ))}
      </select>

      {/* 필요 시 숨김 필드로 ccNo를 폼에 포함 */}
      <input type="hidden" name="categoryCcNo" value={ccNo ?? ""} />
    </div>
  );
}
