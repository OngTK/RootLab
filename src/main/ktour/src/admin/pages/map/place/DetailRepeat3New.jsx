/**
 * 관리자 > 관광정보 > 플레이스 현황(PlaceInfo) > [본문 우측] 플레이스 반복정보(3.info2) 컴포넌트
 *
 * @since 2025.10.20
 * @version 0.3.0
 */

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

function asRow(v) {
  if (!v) {
    return { pirNo: null, pNo: null, fldgubun: 0, infoName: "", infoText: "", serialNum: 0, updatedAt: null, createdAt: null };
  }
  return {
    pirNo: v.pirNo ?? null,
    pNo: v.pNo ?? v.pno ?? v.PNO ?? null,
    fldgubun: v.fldgubun ?? 0,
    infoName: v.infoName ?? "",
    infoText: v.infoText ?? "",
    serialNum: v.serialNum ?? 0,
    updatedAt: v.updatedAt ?? null,
    createdAt: v.createdAt ?? null,
  };
}

const blankRow = () => ({ pirNo: null, pNo: null, fldgubun: 0, infoName: "", infoText: "", serialNum: 0, updatedAt: null, createdAt: null });

function parseKstLike(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null;
  const d = new Date(dateStr.replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}

function pickLatest(rows, field) {
  let latest = null;
  let latestRaw = null;
  rows.forEach((r) => {
    const raw = r[field];
    const d = parseKstLike(raw);
    if (d && (!latest || d > latest)) {
      latest = d;
      latestRaw = raw;
    }
  });
  return { date: latest, raw: latestRaw };
}

function getLatestDisplay(rows) {
  const up = pickLatest(rows, "updatedAt");
  if (up.date) return up.raw ?? "-";
  const cr = pickLatest(rows, "createdAt");
  return cr.date ? (cr.raw ?? "-") : "-";
}

export default function DetailRepeat3New({ items = [], pNo, onChange }) {
  const [rows, setRows] = useState(() =>
    Array.isArray(items) && items.length > 0 ? items.map(asRow) : [blankRow()]
  );

  const originalRef = useRef([]);
  const [deleted, setDeleted] = useState([]);

  useEffect(() => {
    const init = Array.isArray(items) && items.length > 0 ? items.map(asRow) : [blankRow()];
    setRows(init);
    originalRef.current = Array.isArray(items) ? items.map(asRow) : [];
    setDeleted([]);
  }, [items]);

  const latestUpdated = useMemo(() => getLatestDisplay(rows), [rows]);

  const emit = (next) => {
    setRows(next);
    if (typeof onChange === "function") onChange(next);
  };

  const addRow = () => emit([...rows, blankRow()]);

  const markRemoveRow = (idx) => {
    const target = rows[idx];
    if (target?.pirNo) setDeleted((prev) => [...prev, target]);
    const next = rows.filter((_, i) => i !== idx);
    if (next.length === 0) next.push(blankRow());
    emit(next);
  };

  const updateRow = (idx, field, value) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r));
    emit(next);
  };

  const isModified = (r) => {
    if (!r?.pirNo) return false;
    const orig = originalRef.current.find((o) => o.pirNo === r.pirNo);
    if (!orig) return false;
    return String(orig.infoName ?? "") !== String(r.infoName ?? "") ||
           String(orig.infoText ?? "") !== String(r.infoText ?? "");
  };

  const refreshFromServer = async () => {
    const { data } = await axios.get("http://localhost:8080/placeinfo/repeatinfo", {
      params: { pno: Number(pNo) },
    });
    const next = Array.isArray(data) ? data.map(asRow) : [];
    setRows(next.length > 0 ? next : [blankRow()]);
    originalRef.current = next;
    if (typeof onChange === "function") onChange(next);
  };

  const handleSave = async () => {
    try {
      const newRows = rows.filter((r) => !r.pirNo);
      if (newRows.length > 0 && !pNo) {
        alert("플레이스가 선택되지 않았습니다.");
        return;
      }

      const payload = [];

      // 삭제 항목(기존 데이터)
      deleted.forEach((r) => {
        if (!r?.pirNo) return;
        payload.push({
          pirNo: r.pirNo,
          pNo: Number(r.pNo ?? pNo),
          pno: Number(r.pNo ?? pNo),
          fldgubun: r.fldgubun,
          infoName: r.infoName,
          infoText: r.infoText,
          serialNum: r.serialNum,
          pirStatus: 3,
        });
      });

      // 현재 행들
      rows.forEach((r) => {
        if (!r?.pirNo) {
          payload.push({
            pirNo: null,
            pNo: Number(pNo),
            pno: Number(pNo),
            fldgubun: 0,
            infoName: r.infoName ?? "",
            infoText: r.infoText ?? "",
            serialNum: 0,
            pirStatus: 1,
          });
        } else {
          const orig = originalRef.current.find((o) => o.pirNo === r.pirNo) ?? r;
          const status = deleted.some((d) => d.pirNo === r.pirNo) ? 3 : (isModified(r) ? 2 : 0);
          payload.push({
            pirNo: r.pirNo,
            pNo: Number(orig.pNo ?? orig.pno ?? orig.PNO ?? pNo),
            pno: Number(orig.pNo ?? orig.pno ?? orig.PNO ?? pNo),
            fldgubun: orig.fldgubun,
            infoName: r.infoName ?? "",
            infoText: r.infoText ?? "",
            serialNum: orig.serialNum,
            pirStatus: status,
          });
        }
      });

      console.log('[DetailRepeat3] POST /placeinfo/repeatinfo pNo=', pNo, 'payload=', payload);
      await axios.post("http://localhost:8080/placeinfo/repeatinfo", payload);
      await refreshFromServer();
      alert("저장되었습니다.");
      setDeleted([]);
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="placeRepeatWrap">
      <form aria-label="반복정보 입력">
        <fieldset>
          <legend>반복정보</legend>

          {rows.map((r, idx) => (
            <div key={r.pirNo ?? `new-${idx}`} className="form-group" style={{ display: "flex" }}>
              <div>
                <label htmlFor={`repeat-title-${idx}`} className="sr-only">제목</label>
                <input
                  type="text"
                  id={`repeat-title-${idx}`}
                  name={`repeat[${idx}].infoName`}
                  placeholder="제목"
                  value={r.infoName}
                  onChange={(e) => updateRow(idx, "infoName", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor={`repeat-content-${idx}`} className="sr-only">내용</label>
                <input
                  type="text"
                  id={`repeat-content-${idx}`}
                  name={`repeat[${idx}].infoText`}
                  placeholder="내용"
                  value={r.infoText}
                  onChange={(e) => updateRow(idx, "infoText", e.target.value)}
                />
              </div>

              <div>
                <button type="button" className="btn line" onClick={() => markRemoveRow(idx)}>
                  삭제
                </button>
              </div>
            </div>
          ))}

          <div className="info_date">
            <b>최종 수정일</b> {latestUpdated}
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

// DetailRepeat3New.jsx end
