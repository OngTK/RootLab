/**
 * Í¥ÄÎ¶¨Ïûê??> Í¥ÄÍ¥ëÏ†ïÎ≥¥Í?Î¶?> ?åÎ†à?¥Ïä§?ÑÌô©(PlaceInfo) > [Î≥∏Î¨∏ ?∞Ï∏°]?åÎ†à?¥Ïä§ Intro?ÅÏÑ∏?ïÎ≥¥(2.?∏Ìä∏Î°? Ïª¥Ìè¨?åÌä∏
 *
 * @author 
 * @since 2025.10.20
 * @version 0.1.1
 */

import { useRef } from "react";\nimport axios from "axios";\n\nexport default function TourIntro2({ data, pNo }) {
    const t = data ?? {};\n\n    const fmt = (s) => (s ?? "");\n    const dateLabel = fmt(t.updatedAt) || fmt(t.createdAt);\n\n    const formRef = useRef(null);\n\n    const collect = () => {\n        const fd = new FormData(formRef.current);\n        const get = (k) => (fd.get(k) ?? "").toString();\n        return {\n            accomcount: get("accomcount"),\n            chkBabyCarriage: get("chkBabyCarriage"),\n            chkCreditCard: get("chkCreditCard"),\n            chkPet: get("chkPet"),\n            expAgeRange: get("expAgeRange"),\n            expGuide: get("expGuide"),\n            heritage1: get("heritage1"),\n            heritage2: get("heritage2"),\n            heritage3: get("heritage3"),\n            infoCenter: get("infoCenter"),\n            openDate: get("openDate"),\n            parking: get("parking"),\n            restDate: get("restDate"),\n            useSeason: get("useSeason"),\n            useTime: get("useTime"),\n        };\n    };\n\n    const isChanged = (curr) => {\n        const same = (a, b) => String(a ?? "") === String(b ?? "");\n        return !(\n            same(curr.accomcount, t.accomcount) &&\n            same(curr.chkBabyCarriage, t.chkBabyCarriage) &&\n            same(curr.chkCreditCard, t.chkCreditCard) &&\n            same(curr.chkPet, t.chkPet) &&\n            same(curr.expAgeRange, t.expAgeRange) &&\n            same(curr.expGuide, t.expGuide) &&\n            same(curr.heritage1, t.heritage1) &&\n            same(curr.heritage2, t.heritage2) &&\n            same(curr.heritage3, t.heritage3) &&\n            same(curr.infoCenter, t.infoCenter) &&\n            same(curr.openDate, t.openDate) &&\n            same(curr.parking, t.parking) &&\n            same(curr.restDate, t.restDate) &&\n            same(curr.useSeason, t.useSeason) &&\n            same(curr.useTime, t.useTime)\n        );\n    };\n\n    const handleSave = async () => {\n        const curr = collect();\n        const tiNo = t.tiNo ?? null;\n        const hasPno = pNo ?? t.pNo ?? t.pno ?? null;\n        if (!hasPno) { alert("«√∑π¿ÃΩ∫∞° º±≈√µ«¡ˆ æ æ“Ω¿¥œ¥Ÿ."); return; }\n\n        const dto = {\n            tiNo: tiNo ?? 0,\n            pNo: Number(hasPno),\n            ...curr,\n            tiStatus: tiNo ? (isChanged(curr) ? 2 : 0) : 1,\n        };\n\n        try {\n            await axios.post("http://localhost:8080/placeinfo/tourIntro", dto);\n            alert("¿˙¿Âµ«æ˙Ω¿¥œ¥Ÿ.");\n        } catch (e) {\n            console.error(e);\n            alert("¿˙¿Â ¡ﬂ ø¿∑˘∞° πﬂª˝«ﬂΩ¿¥œ¥Ÿ.");\n        }\n    };

    const fmt = (s) => (s ?? ""); // null/undefined Î∞©Ï?
    const dateLabel = fmt(t.updatedAt) || fmt(t.createdAt);

    return (
        <div className="TourIntroWrap">
            <form ref={formRef} aria-label="∞¸±§¡ˆ ªÛºº ¡§∫∏ ¿‘∑¬">
                <fieldset>
                    <legend>∞¸±§¡ˆ ªÛºº ¡§∫∏</legend>

                    {/* ?òÏö©?∏Ïõê */}
                    <div className="form-group">
                        <label htmlFor="accomcount">?òÏö©?∏Ïõê</label>
                        <input id="accomcount" name="accomcount" type="text" defaultValue={fmt(t.accomcount)} />
                    </div>

                    {/* ?†Î™®Ï∞??†Ïö©Ïπ¥Îìú/Î∞òÎ†§?ôÎ¨º */}
                    <div className="form-group">
                        <label htmlFor="chkBabyCarriage">?†Î™®Ï∞??Ä?¨Ï†ïÎ≥?/label>
                        <input id="chkBabyCarriage" name="chkBabyCarriage" type="text" defaultValue={fmt(t.chkBabyCarriage)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chkCreditCard">?†Ïö©Ïπ¥Îìú Í∞Ä?•Ï†ïÎ≥?/label>
                        <input id="chkCreditCard" name="chkCreditCard" type="text" defaultValue={fmt(t.chkCreditCard)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chkPet">?†ÏôÑ?ôÎ¨º ?ôÎ∞ò Í∞Ä?•Ï†ïÎ≥?/label>
                        <input id="chkPet" name="chkPet" type="text" defaultValue={fmt(t.chkPet)} />
                    </div>

                    {/* Ï≤¥Ìóò/?†ÏÇ∞ */}
                    <div className="form-group">
                        <label htmlFor="expAgeRange">Ï≤¥Ìóò Í∞Ä???∞Î†π</label>
                        <input id="expAgeRange" name="expAgeRange" type="text" defaultValue={fmt(t.expAgeRange)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expGuide">Ï≤¥Ìóò ?àÎÇ¥</label>
                        <textarea id="expGuide" name="expGuide" rows={4} defaultValue={fmt(t.expGuide)} />
                    </div>
                    <div className="form-group">
                        <label>?∏Í≥ÑÎ¨∏Ìôî?†ÏÇ∞ ?†Î¨¥</label>
                        <input aria-label="Î¨∏Ìôî?†ÏÇ∞1" name="heritage1" type="text" defaultValue={fmt(t.heritage1)} />
                        <input aria-label="Î¨∏Ìôî?†ÏÇ∞2" name="heritage2" type="text" defaultValue={fmt(t.heritage2)} />
                        <input aria-label="Î¨∏Ìôî?†ÏÇ∞3" name="heritage3" type="text" defaultValue={fmt(t.heritage3)} />
                    </div>

                    {/* ?àÎÇ¥/?ºÏ†ï/Ï£ºÏ∞®/?¥Î¨¥/?¥Ïö© */}
                    <div className="form-group">
                        <label htmlFor="infoCenter">Î¨∏Ïùò Î∞??àÎÇ¥</label>
                        <input id="infoCenter" name="infoCenter" type="text" defaultValue={fmt(t.infoCenter)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="openDate">Í∞úÏû•??/label>
                        <input id="openDate" name="openDate" type="text" defaultValue={fmt(t.openDate)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="parking">Ï£ºÏ∞®?úÏÑ§</label>
                        <input id="parking" name="parking" type="text" defaultValue={fmt(t.parking)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="restDate">?¨Îäî ??/label>
                        <input id="restDate" name="restDate" type="text" defaultValue={fmt(t.restDate)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="useSeason">?¥Ïö© ?úÍ∏∞</label>
                        <input id="useSeason" name="useSeason" type="text" defaultValue={fmt(t.useSeason)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="useTime">?¥Ïö© ?úÍ∞Ñ</label>
                        <input id="useTime" name="useTime" type="text" defaultValue={fmt(t.useTime)} />
                    </div>

                    <div className="info_date">
                        <b>ÏµúÏ¢Ö ?òÏ†ï??</b> {dateLabel || "-"}
                    </div>
                    <div className="form-actions">
                        <button type="button">?Ä??/button> <button type="button">??†ú</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
} // Res.jsx end