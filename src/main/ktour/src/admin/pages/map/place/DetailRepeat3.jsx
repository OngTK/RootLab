/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측]플레이스 반복정보(3.info2) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.20
 * @version 0.1.0
 */

import { useEffect, useState } from "react";

function asRow(v) {
    // 서버에서 내려오는 PlaceInfoDtoList 예: { pirNo, fldgubun, infoName, infoText, ... }
    if (!v) return { pirNo: null, infoName: "", infoText: "" };
    return {
        pirNo: v.pirNo ?? null,
        infoName: v.infoName ?? "",
        infoText: v.infoText ?? "",
    };
}

function blankRow() {
    return { pirNo: null, infoName: "", infoText: "" };
}

export default function DetailRepeat3({ items = [], onChange }) {
    // 1) 초기 동기화: null/빈 배열이면 1줄 생성
    const [rows, setRows] = useState(() =>
        Array.isArray(items) && items.length > 0 ? items.map(asRow) : [blankRow()]
    );

    // 2) 부모 detail 교체 시 동기화
    useEffect(() => {
        const init = Array.isArray(items) && items.length > 0 ? items.map(asRow) : [blankRow()];
        setRows(init);
    }, [items]);

    // 3) 상태 변경 도우미
    const emit = (next) => {
        setRows(next);
        if (typeof onChange === "function") onChange(next);
    };

    const addRow = () => emit([...rows, blankRow()]);

    const removeRow = (idx) => {
        const next = rows.filter((_, i) => i !== idx);
        // 최소 1줄 보장
        if (next.length === 0) next.push(blankRow());
        emit(next);
    };

    const updateRow = (idx, field, value) => {
        const next = rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r));
        emit(next);
    };

    /** ========================= [본문 우측] 플레이스 반복정보(3.info2) 컴포넌트============================== */
    return (
    <div className="placeRepeatWrap">
      <form aria-label="반복정보 입력">
        <fieldset>
          <legend>반복정보</legend>

          {rows.map((r, idx) => (
            <div key={r.pirNo ?? `new-${idx}`} className="form-group" style={{ display: "flex" }}>
              {/* 제목 */}
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

              {/* 내용 */}
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

              {/* 줄 삭제 */}
              <div>
                <button type="button" className="btn line" onClick={() => removeRow(idx)}>
                  삭제
                </button>
              </div>
            </div>
          ))}

          {/* 행 추가 */}
          <div className="form-actions" style={{ marginTop: 10 }}>
            <button type="button">저장</button> <button type="button" className="btn" onClick={addRow}>행 추가</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}// DetialRepeat3.jsx end