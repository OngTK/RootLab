/**
 * 관리자 > 관광정보 > 플레이스 현황(PlaceInfo) > [본문 우측] 관광지 Intro 상세정보 저장
 */
import { useRef } from "react";
import axios from "axios";

export default function TourIntro2New({ data, pNo }) {
  const t = data ?? {};
  const fmt = (s) => (s ?? "");
  const dateLabel = fmt(t.updatedAt) || fmt(t.createdAt);

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
    return !(
      same(curr.accomcount, t.accomcount) &&
      same(curr.chkBabyCarriage, t.chkBabyCarriage) &&
      same(curr.chkCreditCard, t.chkCreditCard) &&
      same(curr.chkPet, t.chkPet) &&
      same(curr.expAgeRange, t.expAgeRange) &&
      same(curr.expGuide, t.expGuide) &&
      same(curr.heritage1, t.heritage1) &&
      same(curr.heritage2, t.heritage2) &&
      same(curr.heritage3, t.heritage3) &&
      same(curr.infoCenter, t.infoCenter) &&
      same(curr.openDate, t.openDate) &&
      same(curr.parking, t.parking) &&
      same(curr.restDate, t.restDate) &&
      same(curr.useSeason, t.useSeason) &&
      same(curr.useTime, t.useTime)
    );
  };

  const handleSave = async () => {
    const curr = collect();
    const tiNo = t.tiNo ?? null;
    const hasPno = pNo ?? t.pNo ?? t.pno ?? null;
    if (!hasPno) { alert("플레이스가 선택되지 않았습니다."); return; }

    const dto = {
      tiNo: tiNo ?? 0,
      pNo: Number(hasPno),
      ...curr,
      tiStatus: tiNo ? (isChanged(curr) ? 2 : 0) : 1,
    };

    try {
      await axios.post("http://localhost:8080/placeinfo/tourIntro", dto);
      alert("저장되었습니다.");
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="TourIntroWrap">
      <form ref={formRef} aria-label="관광지 상세 정보 입력">
        <fieldset>
          <legend>관광지 상세 정보</legend>

          <div className="form-group">
            <label htmlFor="accomcount">수용인원</label>
            <input id="accomcount" name="accomcount" type="text" defaultValue={fmt(t.accomcount)} />
          </div>

          <div className="form-group">
            <label htmlFor="chkBabyCarriage">유모차 대여 정보</label>
            <input id="chkBabyCarriage" name="chkBabyCarriage" type="text" defaultValue={fmt(t.chkBabyCarriage)} />
          </div>
          <div className="form-group">
            <label htmlFor="chkCreditCard">신용카드 가능정보</label>
            <input id="chkCreditCard" name="chkCreditCard" type="text" defaultValue={fmt(t.chkCreditCard)} />
          </div>
          <div className="form-group">
            <label htmlFor="chkPet">애완동물 동반 가능 정보</label>
            <input id="chkPet" name="chkPet" type="text" defaultValue={fmt(t.chkPet)} />
          </div>

          <div className="form-group">
            <label htmlFor="expAgeRange">체험가능연령</label>
            <input id="expAgeRange" name="expAgeRange" type="text" defaultValue={fmt(t.expAgeRange)} />
          </div>
          <div className="form-group">
            <label htmlFor="expGuide">체험안내</label>
            <textarea id="expGuide" name="expGuide" rows={4} defaultValue={fmt(t.expGuide)} />
          </div>
          <div className="form-group">
            <label>세계문화유산 유무</label>
            <input aria-label="문화유산1" name="heritage1" type="text" defaultValue={fmt(t.heritage1)} />
            <input aria-label="문화유산2" name="heritage2" type="text" defaultValue={fmt(t.heritage2)} />
            <input aria-label="문화유산3" name="heritage3" type="text" defaultValue={fmt(t.heritage3)} />
          </div>

          <div className="form-group">
            <label htmlFor="infoCenter">문의 및 안내</label>
            <input id="infoCenter" name="infoCenter" type="text" defaultValue={fmt(t.infoCenter)} />
          </div>
          <div className="form-group">
            <label htmlFor="openDate">개장일</label>
            <input id="openDate" name="openDate" type="text" defaultValue={fmt(t.openDate)} />
          </div>
          <div className="form-group">
            <label htmlFor="parking">주차시설</label>
            <input id="parking" name="parking" type="text" defaultValue={fmt(t.parking)} />
          </div>
          <div className="form-group">
            <label htmlFor="restDate">쉬는날</label>
            <input id="restDate" name="restDate" type="text" defaultValue={fmt(t.restDate)} />
          </div>
          <div className="form-group">
            <label htmlFor="useSeason">이용시기</label>
            <input id="useSeason" name="useSeason" type="text" defaultValue={fmt(t.useSeason)} />
          </div>
          <div className="form-group">
            <label htmlFor="useTime">이용시간</label>
            <input id="useTime" name="useTime" type="text" defaultValue={fmt(t.useTime)} />
          </div>

          <div className="info_date">
            <b>최종 수정일</b> {dateLabel || "-"}
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleSave}>저장</button> <button type="button">취소</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

