/**
 * 관리자 > 관광정보 > 플레이스 현황(PlaceInfo)
 * [본문 우측] 플레이스 반복정보(3.info2)
 */
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

/**
 * 반복정보(제목/내용) 편집 컴포넌트 설명
 * - 좌측 리스트(Place 리스트)에서 행 클릭 → 우측 상세로 place pNo 및 기존 반복정보가 전달됩니다.
 * - 사용자는 행 추가/삭제 및 제목/내용 수정이 가능하며, 저장 시 상태값에 따라 서버에 일괄 반영합니다.
 * - pirStatus 규칙: 변경없음(0), 신규(C=1), 수정(U=2), 삭제(D=3)
 * - 본 컴포넌트는 화면 편집을 위한 로컬 상태(rows, deleted)와 원본 스냅샷(originalRef)을 함께 관리합니다.
 */

// 서버 DTO(PlaceInfoRepeatDto) → 화면 편집용 행으로 표준화
// - pNo 키 표기가 pNo/pno/PNO 등으로 올 수 있어 보정하여 보관합니다.
function asRow(v) {
  if (!v) return { pirNo: null, pNo: null, fldgubun: 0, infoName: "", infoText: "", serialNum: 0, updatedAt: null, createdAt: null };
  return {
    pirNo: v.pirNo ?? null,
    pno: v.pNo ?? v.pno ?? v.PNO ?? null,
    fldgubun: v.fldgubun ?? 0,
    infoName: v.infoName ?? "",
    infoText: v.infoText ?? "",
    serialNum: v.serialNum ?? 0,
    updatedAt: v.updatedAt ?? null,
    createdAt: v.createdAt ?? null,
  };
}

// 신규 입력용 기본 행(빈값)
const blankRow = () => ({ pirNo: null, pNo: null, fldgubun: 0, infoName: "", infoText: "", serialNum: 0, updatedAt: null, createdAt: null });

// 'YYYY-MM-DD HH:mm:ss' → Date 객체로 변환(파싱 실패 시 null)
function parseKst(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null;
  const d = new Date(dateStr.replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}

// rows 내에서 가장 최근(updatedAt 우선, 없으면 createdAt) 일시를 문자열로 반환
function latestDisplay(rows) {
  const pick = (f) => rows.map(r => parseKst(r[f])).filter(Boolean).sort((a, b) => b - a)[0];
  const up = pick('updatedAt');
  if (up) return rows.find(r => parseKst(r.updatedAt)?.getTime() === up.getTime())?.updatedAt ?? '-';
  const cr = pick('createdAt');
  return cr ? (rows.find(r => parseKst(r.createdAt)?.getTime() === cr.getTime())?.createdAt ?? '-') : '-';
}

export default function DetailRepeat3({ items = [], pNo, onChange }) {
  // rows: 화면에 표시/편집되는 반복정보 행 리스트
  const [rows, setRows] = useState(() => (Array.isArray(items) && items.length ? items.map(asRow) : [blankRow()]));
  // originalRef: 최초 로딩한 서버값을 보관 → 변경 여부 판단에 사용
  const originalRef = useRef([]);
  // deleted: 삭제 버튼을 눌러 제거 표시된 행 보관(저장 시 pirStatus=3)
  const [deleted, setDeleted] = useState([]);

  // 2) 부모 detail 교체 시 동기화
  useEffect(() => {
    const init = Array.isArray(items) && items.length > 0 ? items.map(asRow) : [blankRow()];
    setRows(init);
  }, []);

  // 행 상태 변경을 외부로 통지(onChange)하고 로컬 rows 갱신
  const emit = (next) => { setRows(next); if (typeof onChange === 'function') onChange(next); };
  // 행 추가
  const addRow = () => emit([...rows, blankRow()]);
  const markRemoveRow = (idx) => {
    const target = rows[idx];
    if (target?.pirNo) setDeleted((prev) => [...prev, target]);
    const next = rows.filter((_, i) => i !== idx);
    if (!next.length) next.push(blankRow());
    emit(next);
  };
  // 단일 필드 변경(infoName/infoText)
  const updateRow = (idx, field, value) => emit(rows.map((r, i) => i === idx ? { ...r, [field]: value } : r));

  const latest = useMemo(() => latestDisplay(rows), [rows]);

  // 원본 대비 행 수정 여부 판단(제목/내용 비교)
  const isModified = (r) => {
    if (!r?.pirNo) return false;
    const orig = originalRef.current.find(o => o.pirNo === r.pirNo);
    if (!orig) return false;
    return String(orig.infoName ?? '') !== String(r.infoName ?? '') || String(orig.infoText ?? '') !== String(r.infoText ?? '');
  };

  // 저장: 삭제(D) → 신규(C) → 수정/변경없음(U/0) 순으로 payload 생성 후 POST
  const handleSave = async () => {
    try {
      const newRows = rows.filter(r => !r.pirNo);
      if (newRows.length > 0 && !pNo) { alert('플레이스가 선택되지 않았습니다.'); return; }

      const payload = [];
      // 삭제
      deleted.forEach(r => {
        if (!r?.pirNo) return;
        payload.push({ pirNo: r.pirNo, pNo: Number(r.pNo ?? pNo), fldgubun: r.fldgubun, infoName: r.infoName, infoText: r.infoText, serialNum: r.serialNum, pirStatus: 3 });
      });
      // 신규/수정
      rows.forEach(r => {
        if (!r?.pirNo) {
          payload.push({ pirNo: null, pno: Number(pNo), fldgubun: 0, infoName: r.infoName ?? '', infoText: r.infoText ?? '', serialNum: 0, pirStatus: 1 });
        } else {
          const orig = originalRef.current.find(o => o.pirNo === r.pirNo) ?? r;
          const status = deleted.some(d => d.pirNo === r.pirNo) ? 3 : (isModified(r) ? 2 : 0);
          payload.push({ pirNo: r.pirNo, pno: Number(orig.pNo ?? pNo), fldgubun: orig.fldgubun, infoName: r.infoName ?? '', infoText: r.infoText ?? '', serialNum: orig.serialNum, pirStatus: status });
        }
      });

      await axios.post('http://localhost:8080/placeinfo/repeatinfo', payload);
      alert('저장되었습니다.');
      // 저장 후 원본 기준 갱신
      originalRef.current = rows.map(asRow);
      setDeleted([]);
    } catch (e) {
      console.error(e);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="placeRepeatWrap">
      <form aria-label="반복정보 입력">
        <fieldset>
          <legend>반복정보</legend>
          {rows.map((r, idx) => (
            <div key={r.pirNo ?? `new-${idx}`} className="form-group" style={{ display: 'flex' }}>
              <div>
                <label htmlFor={`repeat-title-${idx}`} className="sr-only">제목</label>
                <input type="text" id={`repeat-title-${idx}`} name={`repeat[${idx}].infoName`} placeholder="제목" value={r.infoName} onChange={(e) => updateRow(idx, 'infoName', e.target.value)} />
              </div>
              <div>
                <label htmlFor={`repeat-content-${idx}`} className="sr-only">내용</label>
                <input type="text" id={`repeat-content-${idx}`} name={`repeat[${idx}].infoText`} placeholder="내용" value={r.infoText} onChange={(e) => updateRow(idx, 'infoText', e.target.value)} />
              </div>
              <div>
                <button type="button" className="btn line" onClick={() => markRemoveRow(idx)}>삭제</button>
              </div>
            </div>
          ))}
          <div className="info_date">
            <b>최종 수정일</b> {latest}
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleSave}>저장</button>
            <button type="button" onClick={addRow}>행추가</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
