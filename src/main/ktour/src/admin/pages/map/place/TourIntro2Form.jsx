/**
 * 관리자 > 관광정보 > 플레이스 현황(PlaceInfo)
 * [본문 우측] 관광지 Intro 상세정보 저장 + 저장 후 재렌더링
 */
import { useRef, useEffect } from "react";
import axios from "axios";

export default function TourIntro2Form({ data, pNo }) {
  const baseRef = useRef(data ?? {});
  useEffect(() => { baseRef.current = data ?? {}; }, [data]);

  const fmt = (s) => (s ?? "");
  const formRef = useRef(null);

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
    const same = (a, b) => String(a ?? "") === String(b ?? "");
    const base = baseRef.current || {};
    const keys = [
      "accomcount","chkBabyCarriage","chkCreditCard","chkPet","expAgeRange","expGuide",
      "heritage1","heritage2","heritage3","infoCenter","openDate","parking",
      "restDate","useSeason","useTime"
    ];
    return keys.some((k) => !same(curr[k], base[k]));
  };

  const handleSave = async () => {
    const curr = collect();
    const prev = baseRef.current || {};
    const tiNo = prev.tiNo ?? null;
    const resolvedPno = pNo ?? prev.pNo ?? prev.pno ?? null;
    if (!resolvedPno) { alert("플레이스가 선택되지 않았습니다."); return; }

    const dto = {
      tiNo: tiNo ?? 0,
      pno: Number(resolvedPno),
      ...curr,
      tiStatus: tiNo ? (isChanged(curr) ? 2 : 0) : 1,
    };

    try {
      const { data: saved } = await axios.post("http://localhost:8080/placeinfo/tourIntro", dto);
      // 응답이 있으면 즉시 반영, 없으면 재조회
      let next = saved;
      if (!next || typeof next !== "object") {
        const r2 = await axios.get("http://localhost:8080/placeinfo/tourIntro", { params: { pNo: Number(resolvedPno) } });
        next = r2?.data;
      }
      if (next && formRef.current) {
        baseRef.current = next;
        const f = formRef.current;
        const keys = Object.keys(curr);
        keys.forEach(k => { if (f.elements[k]) f.elements[k].value = fmt(next[k]); });
      }
      alert("저장되었습니다.");
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleReset = () => {
    const form = formRef.current;
    if (!form) return;
    const skip = new Set(["tiNo","pNo","pno","createdAt","updatedAt"]);
    Array.from(form.elements).forEach((el)=>{
      if(!el||!el.name||skip.has(el.name)) return;
      const tag=(el.tagName||"").toLowerCase();
      const type=(el.type||"").toLowerCase();
      if(tag==='input'||tag==='textarea'){
        if(type==='checkbox'||type==='radio'){ el.checked=false; } else { el.value=''; }
      }
    });
  }; 

  const b = baseRef.current || {};
  const dateLabel = fmt(b.updatedAt) || fmt(b.createdAt);

  return (
    <div className="TourIntroWrap">
      <form ref={formRef} aria-label="관광지 상세 정보 입력">
        <fieldset>
          <legend>관광지 상세 정보</legend>

          <div className="form-group">
            <label htmlFor="accomcount">수용인원</label>
            <input id="accomcount" name="accomcount" type="text" defaultValue={fmt(b.accomcount)} />
          </div>

          <div className="form-group">
            <label htmlFor="chkBabyCarriage">유모차 대여 정보</label>
            <input id="chkBabyCarriage" name="chkBabyCarriage" type="text" defaultValue={fmt(b.chkBabyCarriage)} />
          </div>
          <div className="form-group">
            <label htmlFor="chkCreditCard">신용카드 가능정보</label>
            <input id="chkCreditCard" name="chkCreditCard" type="text" defaultValue={fmt(b.chkCreditCard)} />
          </div>
          <div className="form-group">
            <label htmlFor="chkPet">애완동물 동반 가능 정보</label>
            <input id="chkPet" name="chkPet" type="text" defaultValue={fmt(b.chkPet)} />
          </div>

          <div className="form-group">
            <label htmlFor="expAgeRange">체험가능연령</label>
            <input id="expAgeRange" name="expAgeRange" type="text" defaultValue={fmt(b.expAgeRange)} />
          </div>
          <div className="form-group">
            <label htmlFor="expGuide">체험안내</label>
            <textarea id="expGuide" name="expGuide" rows={4} defaultValue={fmt(b.expGuide)} />
          </div>
          <div className="form-group">
            <label>세계문화유산 유무</label>
            <input aria-label="문화유산1" name="heritage1" type="text" defaultValue={fmt(b.heritage1)} />
            <input aria-label="문화유산2" name="heritage2" type="text" defaultValue={fmt(b.heritage2)} />
            <input aria-label="문화유산3" name="heritage3" type="text" defaultValue={fmt(b.heritage3)} />
          </div>

          <div className="form-group">
            <label htmlFor="infoCenter">문의 및 안내</label>
            <input id="infoCenter" name="infoCenter" type="text" defaultValue={fmt(b.infoCenter)} />
          </div>
          <div className="form-group">
            <label htmlFor="openDate">개장일</label>
            <input id="openDate" name="openDate" type="text" defaultValue={fmt(b.openDate)} />
          </div>
          <div className="form-group">
            <label htmlFor="parking">주차시설</label>
            <input id="parking" name="parking" type="text" defaultValue={fmt(b.parking)} />
          </div>
          <div className="form-group">
            <label htmlFor="restDate">쉬는날</label>
            <input id="restDate" name="restDate" type="text" defaultValue={fmt(b.restDate)} />
          </div>
          <div className="form-group">
            <label htmlFor="useSeason">이용시기</label>
            <input id="useSeason" name="useSeason" type="text" defaultValue={fmt(b.useSeason)} />
          </div>
          <div className="form-group">
            <label htmlFor="useTime">이용시간</label>
            <input id="useTime" name="useTime" type="text" defaultValue={fmt(b.useTime)} />
          </div>

          <div className="info_date">
            <b>최종 수정일</b> {dateLabel || "-"}
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleSave}>저장</button>
            <button type="button" onClick={handleReset}>초기화</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

