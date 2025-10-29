/**
 * 관리자 > 관광정�?> ?�레?�스 ?�황(PlaceInfo) > [본문 ?�측] 관광�? Intro ?�세?�보 ?�?? */
import { useRef, useEffect, useState } from "react";
import axios from "axios";

export default function TourIntro2New({ data, pNo }) {
  const t = data ?? {};
  const fmt = (s) => (s ?? "");
  const dateLabel = fmt((baseRef.current||{}).updatedAt) || fmt((baseRef.current||{}).createdAt);

  const formRef = useRef(null);

  const baseRef = useRef(t);
  const [ver, setVer] = useState(0);
  useEffect(() => { baseRef.current = t; setVer(v=>v+1); }, [data]);

  const collect = () => {
    const fd = new FormData(formRef.current);
    const get = (k) => (fd.get(k) ?? "").toString();
    return {
      accomcount: get("accomcount"),
      chkBabyCarriage: get("chkBabyCarriage"),
      chkCreditCard: get("chkCreditCard"),
      chkPet: get("chkPet"),
      expAgeRange: get("expAgeRange"),
      expGuide: get("expGuide"),
      heritage1: get("heritage1"),
      heritage2: get("heritage2"),
      heritage3: get("heritage3"),
      infoCenter: get("infoCenter"),
      openDate: get("openDate"),
      parking: get("parking"),
      restDate: get("restDate"),
      useSeason: get("useSeason"),
      useTime: get("useTime"),
    };
  };

  const isChanged = (curr) => {
  const same = (a,b)=>String(a??'')===String(b??'');
  const base = baseRef.current || {};
  const keys = ['accomcount','chkBabyCarriage','chkCreditCard','chkPet','expAgeRange','expGuide','heritage1','heritage2','heritage3','infoCenter','openDate','parking','restDate','useSeason','useTime'];
  return keys.some(k => !same(curr[k], base[k]));
};

  const handleSave = async () => {
    const curr = collect(); const prev = baseRef.current || {}; const tiNo = prev.tiNo ?? null; const hasPno = pNo ?? prev.pNo ?? prev.pno ?? null;
    if (!hasPno) { alert("?�레?�스가 ?�택?��? ?�았?�니??"); return; }

    const dto = {
      tiNo: tiNo ?? 0,
      pNo: Number(hasPno),
      ...curr,
      tiStatus: tiNo ? (isChanged(curr) ? 2 : 0) : 1,
    };

    try {
      const resp = await axios.post("http://localhost:8080/placeinfo/tourIntro", dto); const saved = resp?.data; if (saved && formRef.current) { const f=formRef.current; const keys=["accomcount","chkBabyCarriage","chkCreditCard","chkPet","expAgeRange","expGuide","heritage1","heritage2","heritage3","infoCenter","openDate","parking","restDate","useSeason","useTime"]; keys.forEach(k=>{ if(f.elements[k]) f.elements[k].value = saved[k] ?? ""; }); baseRef.current = saved; setVer(v=>v+1); } else { try { const r2 = await axios.get("http://localhost:8080/placeinfo/tourIntro", { params: { pno: Number(hasPno) } }); const fetched = r2?.data; if (fetched && formRef.current) { const f=formRef.current; const keys=["accomcount","chkBabyCarriage","chkCreditCard","chkPet","expAgeRange","expGuide","heritage1","heritage2","heritage3","infoCenter","openDate","parking","restDate","useSeason","useTime"]; keys.forEach(k=>{ if(f.elements[k]) f.elements[k].value = fetched[k] ?? ""; }); baseRef.current = fetched; setVer(v=>v+1); } } catch(e) { console.error(e); } } alert("����Ǿ����ϴ�.");
    } catch (e) {
      console.error(e);
      alert("?�??�??�류가 발생?�습?�다.");
    }
  };

  return (
    <div className="TourIntroWrap">
      <form ref={formRef} aria-label="관광�? ?�세 ?�보 ?�력">
        <fieldset>
          <legend>관광�? ?�세 ?�보</legend>

          <div className="form-group">
            <label htmlFor="accomcount">?�용?�원</label>
            <input id="accomcount" name="accomcount" type="text" defaultValue={fmt(t.accomcount)} />
          </div>

          <div className="form-group">
            <label htmlFor="chkBabyCarriage">?�모�??�???�보</label>
            <input id="chkBabyCarriage" name="chkBabyCarriage" type="text" defaultValue={fmt(t.chkBabyCarriage)} />
          </div>
          <div className="form-group">
            <label htmlFor="chkCreditCard">?�용카드 가?�정�? </label>
            <input id="chkCreditCard" name="chkCreditCard" type="text" defaultValue={fmt(t.chkCreditCard)} />
          </div>
          <div className="form-group">
            <label htmlFor="chkPet">?�완?�물 ?�반 가???�보</label>
            <input id="chkPet" name="chkPet" type="text" defaultValue={fmt(t.chkPet)} />
          </div>

          <div className="form-group">
            <label htmlFor="expAgeRange">체험가?�연??</label>
            <input id="expAgeRange" name="expAgeRange" type="text" defaultValue={fmt(t.expAgeRange)} />
          </div>
          <div className="form-group">
            <label htmlFor="expGuide">체험?�내</label>
            <textarea id="expGuide" name="expGuide" rows={4} defaultValue={fmt(t.expGuide)} />
          </div>
          <div className="form-group">
            <label>?�계문화?�산 ?�무</label>
            <input aria-label="문화?�산1" name="heritage1" type="text" defaultValue={fmt(t.heritage1)} />
            <input aria-label="문화?�산2" name="heritage2" type="text" defaultValue={fmt(t.heritage2)} />
            <input aria-label="문화?�산3" name="heritage3" type="text" defaultValue={fmt(t.heritage3)} />
          </div>

          <div className="form-group">
            <label htmlFor="infoCenter">문의 �??�내</label>
            <input id="infoCenter" name="infoCenter" type="text" defaultValue={fmt(t.infoCenter)} />
          </div>
          <div className="form-group">
            <label htmlFor="openDate">개장??</label>
            <input id="openDate" name="openDate" type="text" defaultValue={fmt(t.openDate)} />
          </div>
          <div className="form-group">
            <label htmlFor="parking">주차?�설</label>
            <input id="parking" name="parking" type="text" defaultValue={fmt(t.parking)} />
          </div>
          <div className="form-group">
            <label htmlFor="restDate">?�는??</label>
            <input id="restDate" name="restDate" type="text" defaultValue={fmt(t.restDate)} />
          </div>
          <div className="form-group">
            <label htmlFor="useSeason">?�용?�기</label>
            <input id="useSeason" name="useSeason" type="text" defaultValue={fmt(t.useSeason)} />
          </div>
          <div className="form-group">
            <label htmlFor="useTime">?�용?�간</label>
            <input id="useTime" name="useTime" type="text" defaultValue={fmt(t.useTime)} />
          </div>

          <div className="info_date">
            <b>최종 ?�정??</b> {dateLabel || "-"}
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleSave}>?�??</button> <button type="button">취소</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

