/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측]플레이스 반복정보(3.info2) 컴포넌트
 *
 * @author 
 * @since 2025.10.20
 * @version 0.1.0
 */

import { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";

function asRow(v) {
  // 서버 PlaceInfoDtoList 항목 예: { pirNo, pNo, fldgubun, infoName, infoText, serialNum, updatedAt, createdAt }
  if (!v) {
    return { pirNo: null, pNo: null, fldgubun: 0, infoName: "", infoText: "", serialNum: 0, updatedAt: null, createdAt: null };
  }
  return {
    pirNo: v.pirNo ?? null,
    pNo: v.pNo ?? null,
    fldgubun: v.fldgubun ?? 0,
    infoName: v.infoName ?? "",
    infoText: v.infoText ?? "",
    serialNum: v.serialNum ?? 0,
    updatedAt: v.updatedAt ?? null,
    createdAt: v.createdAt ?? null,
  };
}

const blankRow = () => ({ pirNo: null, pNo: null, fldgubun: 0, infoName: "", infoText: "", serialNum: 0, updatedAt: null, createdAt: null });


// 문자열 "YYYY-MM-DD HH:mm:ss" → Date 안전 변환
function parseKstLike(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return null;
    // 공백을 T로 치환하여 크로스브라우저 Date 파싱 안정화
    const d = new Date(dateStr.replace(" ", "T"));
    return isNaN(d.getTime()) ? null : d;
}

function pickLatest(rows, field) {
  let latest = null;     // Date
  let latestRaw = null;  // 원문 문자열
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

// 최신 표시 문자열 반환: updatedAt → 없으면 createdAt → 모두 없으면 "-"
function getLatestDisplay(rows) {
  const up = pickLatest(rows, "updatedAt");
  if (up.date) return up.raw ?? "-";
  const cr = pickLatest(rows, "createdAt");
  return cr.date ? (cr.raw ?? "-") : "-";
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
    }, []);

    // 3) 최종 수정일(메모)
    const latestUpdated = useMemo(() => getLatestDisplay(rows), [rows]);

    // 4) 상태 변경 도우미
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

                    <div className="info_date">
                        <b>최종 수정일:</b> {latestUpdated}
                    </div>
                    {/* 행 추가 */}
                    <div className="form-actions">

                        <button type="button">저장</button> <button type="button" onClick={addRow}>행 추가</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}// DetialRepeat3.jsx end