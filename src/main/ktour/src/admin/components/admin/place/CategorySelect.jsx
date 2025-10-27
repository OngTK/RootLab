import { useEffect, useMemo, useState } from "react";
import axios from "axios";

/**
 * props.onChange({ ccNo, l1Cd, l2Cd, l3Cd })
 * labels는 화면표시(…Nm), values는 코드와 ccNo를 상태로 보관
 */
export default function CategorySelect({ value, onChange }) {
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

  return (
    <div className="form-group category-group">
      <label htmlFor="category-large">카테고리</label>

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
