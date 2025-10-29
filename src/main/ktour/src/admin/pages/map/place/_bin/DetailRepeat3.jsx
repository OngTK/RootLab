/**
 * 
 * @author 
 * @since 2025.10.20
 * @version 0.1.0
 */

import { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
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

export default function DetailRepeat3({ items = [], pNo, onChange }) {
    console.log(pNo)

    const [rows, setRows] = useState(() =>
        Array.isArray(items) && items.length > 0 ? items.map(asRow) : [blankRow()]
    );


    useEffect(() => {
        const init = Array.isArray(items) && items.length > 0 ? items.map(asRow) : [blankRow()];
        setRows(init);
    }, [items]);


    const latestUpdated = useMemo(() => getLatestDisplay(rows), [rows]);


    const emit = (next) => {
        setRows(next);
        if (typeof onChange === "function") onChange(next);
    };

    const originalRef = useRef([]);
    const [deleted, setDeleted] = useState([]);
    useEffect(() => {
        originalRef.current = Array.isArray(items) ? items.map(asRow) : [];
        setDeleted([]);
    }, [items]);

    const addRow = () => emit([...rows, blankRow()]);

    const removeRow = (idx) => {
        const next = rows.filter((_, i) => i !== idx);
        if (next.length === 0) next.push(blankRow());
        emit(next);
    };

    const updateRow = (idx, field, value) => {
        const next = rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r));
        emit(next);
    };

    const markRemoveRow = (idx) => {
        const target = rows[idx];
        if (target?.pirNo) setDeleted((prev) => [...prev, target]);
        const next = rows.filter((_, i) => i !== idx);
        if (next.length === 0) next.push(blankRow());
        emit(next);
    };

    const isModified = (r) => {
        if (!r?.pirNo) return false;
        const orig = originalRef.current.find((o) => o.pirNo === r.pirNo);
        if (!orig) return false;
        return String(orig.infoName ?? "") !== String(r.infoName ?? "") ||
            String(orig.infoText ?? "") !== String(r.infoText ?? "");
    };

    const handleSave = async () => {
        try {
            const newRows = rows.filter((r) => !r.pirNo);
            if (newRows.length > 0 && !pNo) {
                alert("?ÔøΩÎ†à?ÔøΩÏä§Í∞Ä ?ÔøΩÌÉù?ÔøΩÔøΩ? ?ÔøΩÏïò?ÔøΩÎãà??")
                return;
            }

            const payload = [];

            deleted.forEach((r) => {
                if (!r?.pirNo) return;
                payload.push({
                    pirNo: r.pirNo,
                    pNo: Number(r.pNo ?? pNo ?? 0),
                    pno: Number(r.pNo ?? pNo ?? 0),
                    fldgubun: r.fldgubun,
                    infoName: r.infoName,
                    infoText: r.infoText,
                    serialNum: r.serialNum,
                    pirStatus: 3,
                });
            });

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
                        pNo: Number((orig.pNo ?? orig.pno ?? orig.PNO ?? pNo ?? 0)),
                        pno: Number((orig.pNo ?? orig.pno ?? orig.PNO ?? pNo ?? 0)),
                        fldgubun: orig.fldgubun,
                        infoName: r.infoName ?? "",
                        infoText: r.infoText ?? "",
                        serialNum: orig.serialNum,
                        pirStatus: status,
                    });
                }
            });

            console.log('[DetailRepeat3] pNo=', pNo, 'payload=', payload);
            await axios.post("http://localhost:8080/placeinfo/repeatinfo", payload);
            alert("?Ä?•Îêò?àÏäµ?àÎã§.");
            originalRef.current = rows.map(asRow);
            setDeleted([]);
        } catch (e) {
            console.error(e);
            alert("?§Î•òÍ∞Ä Î∞úÏÉù?àÏäµ?àÎã§.");
        }
    };

    /** ========================= [Î≥∏Î¨∏ ?∞Ï∏°] ?åÎ†à?¥Ïä§ Î∞òÎ≥µ?ÔøΩÎ≥¥(3.info2) Ïª¥Ìè¨?ÔøΩÌä∏============================== */
    return (
        <div className="placeRepeatWrap">
            <form aria-label="π›∫π¡§∫∏ ¿‘∑¬"> (
                        <div key={r.pirNo ?? `new-${idx}`} className="form-group" style={{ display: "flex" }}>
                            {/* ?ÔøΩÎ™© */}
                            <div>
                                <label htmlFor={`repeat-title-${idx}`} className="sr-only">¡¶∏Ò</label>
                                <input
                                    type="text"
                                    id={`repeat-title-${idx}`}
                                    name={`repeat[${idx}].infoName`}\n                                    placeholder="¡¶∏Ò"
                                    value={r.infoName}
                                    onChange={(e) => updateRow(idx, "infoName", e.target.value)}
                                />
                            </div>

                            {/* ?ÔøΩÏö© */}
                            <div>
                                <label htmlFor={`repeat-content-${idx}`} className="sr-only">≥ªøÎ</label>
                                <input
                                    type="text"
                                    id={`repeat-content-${idx}`}
                                    name={`repeat[${idx}].infoText`}\n                                    placeholder="≥ªøÎ"
                                    value={r.infoText}
                                    onChange={(e) => updateRow(idx, "infoText", e.target.value)}
                                />
                            </div>

                            {/* ªË¡¶ */}\r\n                            <div>\r\n                                <button type="button" className="btn line" onClick={() => markRemoveRow(idx)}>\r\n                                    ªË¡¶\r\n                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="info_date">
                        <b>√÷¡æ ºˆ¡§¿œ</b> {latestUpdated}
                    </div>
                    {/* Î≤ÑÌäº */}
                    <div className="form-actions">

                        <button type="button" onClick={handleSave}>?Ôø??/button> <button type="button" onClick={addRow}>?ÔøΩÏ∂îÍ∞Ä</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}// DetialRepeat3.jsx end
