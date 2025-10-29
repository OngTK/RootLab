/**
 * 관리자 > 관광정보 > 플레이스 현황(PlaceInfo)
 * [본문 우측] 행사/공연/축제 상세 정보 저장
 */
import { useRef } from "react";
import axios from "axios";

export default function FestivalIntro2({ data, pNo }) {
  const t = data ?? {};
  const fmt = (s) => (s ?? "");
  const formRef = useRef(null);

  const collect = () => {
    const fd = new FormData(formRef.current);
    const get = (k) => (fd.get(k) ?? "").toString();
    return {
      eventStartDate: get("eventStartDate"),
      eventEndDate: get("eventEndDate"),
      progressType: get("progressType"),
      festivalType: get("festivalType"),
      ageLimit: get("ageLimit"),
      bookingPlace: get("bookingPlace"),
      discountInfoFestival: get("discountInfoFestival"),
      eventHomepage: get("eventHomepage"),
      eventPlace: get("eventPlace"),
      festivalGrade: get("festivalGrade"),
      placeInfo: get("placeInfo"),
      playTime: get("playTime"),
      program: get("program"),
      spendTimeFestival: get("spendTimeFestival"),
      sponsor1: get("sponsor1"),
      sponsor1Tel: get("sponsor1Tel"),
      sponsor2: get("sponsor2"),
      sponsor2Tel: get("sponsor2Tel"),
      subEvent: get("subEvent"),
      useTimeFestival: get("useTimeFestival"),
    };
  };

  const isChanged = (curr) => {
    const same = (a, b) => String(a ?? "") === String(b ?? "");
    const keys = [
      "eventStartDate","eventEndDate","progressType","festivalType","ageLimit",
      "bookingPlace","discountInfoFestival","eventHomepage","eventPlace","festivalGrade",
      "placeInfo","playTime","program","spendTimeFestival","sponsor1","sponsor1Tel",
      "sponsor2","sponsor2Tel","subEvent","useTimeFestival"
    ];
    return keys.some((k) => !same(curr[k], t[k]));
  };

  const handleSave = async () => {
    const curr = collect();
    const fiNo = t.fiNo ?? null;
    const resolvedPno = pNo ?? t.pNo ?? t.pno ?? null;
    if (!resolvedPno) { alert("플레이스가 선택되지 않았습니다."); return; }

    const dto = {
      fiNo: fiNo ?? 0,
      pno: Number(resolvedPno),
      ...curr,
      fiStatus: fiNo ? (isChanged(curr) ? 2 : 0) : 1,
    };

    try {
      await axios.post("http://localhost:8080/placeinfo/festivalintro", dto);
      alert("저장되었습니다.");
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

    const handleReset = () => {
    const form = formRef.current;
    if (!form) return;
    const skip = new Set(["fiNo","pNo","pno","createdAt","updatedAt"]);
    Array.from(form.elements).forEach((el)=>{
      if(!el||!el.name||skip.has(el.name)) return;
      const tag=(el.tagName||"").toLowerCase();
      const type=(el.type||"").toLowerCase();
      if(tag==='input'||tag==='textarea'){
        if(type==='checkbox'||type==='radio'){ el.checked=false; } else { el.value=''; }
      }
    });
  }; 


  return (
    <div className="FestivalIntroWrap">
      <form ref={formRef} aria-label="행사/공연/축제 상세 정보 입력">
        <fieldset>
          <legend>행사/공연/축제 상세 정보</legend>

          <h4 className="section-title">일정 / 진행</h4>
          <div className="form-group">
            <label htmlFor="eventStartDate">행사 시작일</label>
            <input id="eventStartDate" name="eventStartDate" type="text" defaultValue={fmt(t.eventStartDate)} />
          </div>
          <div className="form-group">
            <label htmlFor="eventEndDate">행사 종료일</label>
            <input id="eventEndDate" name="eventEndDate" type="text" defaultValue={fmt(t.eventEndDate)} />
          </div>
          <div className="form-group">
            <label htmlFor="progressType">진행 상태</label>
            <input id="progressType" name="progressType" type="text" defaultValue={fmt(t.progressType)} />
          </div>
          <div className="form-group">
            <label htmlFor="festivalType">축제 유형</label>
            <input id="festivalType" name="festivalType" type="text" defaultValue={fmt(t.festivalType)} />
          </div>
          <div className="form-group">
            <label htmlFor="festivalGrade">축제 등급</label>
            <input id="festivalGrade" name="festivalGrade" type="text" defaultValue={fmt(t.festivalGrade)} />
          </div>

          <h4 className="section-title">장소 / 위치 / 홈페이지</h4>
          <div className="form-group">
            <label htmlFor="eventPlace">행사 장소</label>
            <input id="eventPlace" name="eventPlace" type="text" defaultValue={fmt(t.eventPlace)} />
          </div>
          <div className="form-group">
            <label htmlFor="placeInfo">행사장 위치 안내</label>
            <input id="placeInfo" name="placeInfo" type="text" defaultValue={fmt(t.placeInfo)} />
          </div>
          <div className="form-group">
            <label htmlFor="eventHomepage">홈페이지</label>
            <input id="eventHomepage" name="eventHomepage" type="text" defaultValue={fmt(t.eventHomepage)} />
          </div>

          <h4 className="section-title">예매 / 요금</h4>
          <div className="form-group">
            <label htmlFor="bookingPlace">예매처</label>
            <input id="bookingPlace" name="bookingPlace" type="text" defaultValue={fmt(t.bookingPlace)} />
          </div>
          <div className="form-group">
            <label htmlFor="useTimeFestival">이용 요금</label>
            <input id="useTimeFestival" name="useTimeFestival" type="text" defaultValue={fmt(t.useTimeFestival)} />
          </div>
          <div className="form-group">
            <label htmlFor="discountInfoFestival">할인 정보</label>
            <input id="discountInfoFestival" name="discountInfoFestival" type="text" defaultValue={fmt(t.discountInfoFestival)} />
          </div>

          <h4 className="section-title">관람 / 프로그램</h4>
          <div className="form-group">
            <label htmlFor="ageLimit">관람 가능 연령</label>
            <input id="ageLimit" name="ageLimit" type="text" defaultValue={fmt(t.ageLimit)} />
          </div>
          <div className="form-group">
            <label htmlFor="spendTimeFestival">관람 소요 시간</label>
            <input id="spendTimeFestival" name="spendTimeFestival" type="text" defaultValue={fmt(t.spendTimeFestival)} />
          </div>
          <div className="form-group">
            <label htmlFor="playTime">공연 시간</label>
            <input id="playTime" name="playTime" type="text" defaultValue={fmt(t.playTime)} />
          </div>
          <div className="form-group">
            <label htmlFor="program">행사 프로그램</label>
            <input id="program" name="program" type="text" defaultValue={fmt(t.program)} />
          </div>

          <h4 className="section-title">주최 / 주관</h4>
          <div className="form-group">
            <label htmlFor="sponsor1">주최자</label>
            <input id="sponsor1" name="sponsor1" type="text" defaultValue={fmt(t.sponsor1)} />
          </div>
          <div className="form-group">
            <label htmlFor="sponsor1Tel">주최자 연락처</label>
            <input id="sponsor1Tel" name="sponsor1Tel" type="text" defaultValue={fmt(t.sponsor1Tel)} />
          </div>
          <div className="form-group">
            <label htmlFor="sponsor2">주관사</label>
            <input id="sponsor2" name="sponsor2" type="text" defaultValue={fmt(t.sponsor2)} />
          </div>
          <div className="form-group">
            <label htmlFor="sponsor2Tel">주관사 연락처</label>
            <input id="sponsor2Tel" name="sponsor2Tel" type="text" defaultValue={fmt(t.sponsor2Tel)} />
          </div>

          <h4 className="section-title">기타</h4>
          <div className="form-group">
            <label htmlFor="subEvent">부대 행사</label>
            <input id="subEvent" name="subEvent" type="text" defaultValue={fmt(t.subEvent)} />
          </div>

          <div className="info_date">
            <b>최종 수정일</b> {fmt(t.updatedAt) || fmt(t.createdAt) || "-"}
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

