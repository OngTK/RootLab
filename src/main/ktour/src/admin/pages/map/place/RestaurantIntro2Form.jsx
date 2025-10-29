/**
 * 관리자 > 관광정보 > 플레이스 현황(PlaceInfo)
 * [본문 우측] 음식점 상세 정보 저장 + 저장 후 재조회
 */
import { useRef } from "react";
import axios from "axios";

export default function RestaurantIntro2Form({ data, pNo }) {
  const base = data ?? {};
  const fmt = (s) => (s ?? "");
  const formRef = useRef(null);

  const collect = () => {
    const fd = new FormData(formRef.current);
    const get = (k) => (fd.get(k) ?? "").toString();
    const toInt = (k) => {
      const v = get(k).trim();
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    return {
      chkCreditCardFood: get("chkCreditCardFood"),
      discountInfoFood: get("discountInfoFood"),
      firstMenu: get("firstMenu"),
      infoCenterFood: get("infoCenterFood"),
      kidsFacility: toInt("kidsFacility"),
      lcnsNo: get("lcnsNo"),
      openDateFood: get("openDateFood"),
      openTimeFood: get("openTimeFood"),
      packing: get("packing"),
      parkingFood: get("parkingFood"),
      reservationFood: get("reservationFood"),
      restDateFood: get("restDateFood"),
      scaleFood: get("scaleFood"),
      seat: get("seat"),
      smoking: get("smoking"),
      treatMenu: get("treatMenu"),
    };
  };

  const isChanged = (curr) => {
    const same = (a, b) => String(a ?? "") === String(b ?? "");
    const keys = [
      "chkCreditCardFood","discountInfoFood","firstMenu","infoCenterFood","kidsFacility",
      "lcnsNo","openDateFood","openTimeFood","packing","parkingFood","reservationFood",
      "restDateFood","scaleFood","seat","smoking","treatMenu"
    ];
    return keys.some((k) => !same(curr[k], base[k]));
  };

  const handleSave = async () => {
    const curr = collect();
    const riNo = base?.riNo ?? null;
    const resolvedPno = pNo ?? base?.pNo ?? base?.pno ?? null;
    if (!resolvedPno) { alert("플레이스가 선택되지 않았습니다."); return; }

    const dto = {
      riNo: riNo ?? 0,
      pNo: Number(resolvedPno),
      ...curr,
      riStatus: riNo ? (isChanged(curr) ? 2 : 0) : 1,
    };

    try {
      const { data: saved } = await axios.post("http://localhost:8080/placeinfo/restaurant", dto);
      // 저장 후 재조회(응답이 없거나 일부 필드가 누락될 수 있어 보강)
      let next = saved;
      if (!next || typeof next !== "object") {
        const r2 = await axios.get("http://localhost:8080/placeinfo/restaurant", { params: { pNo: Number(resolvedPno) } });
        next = r2?.data;
      }
      if (next && formRef.current) {
        const f = formRef.current;
        const keys = Object.keys(curr);
        keys.forEach((k) => { if (f.elements[k]) f.elements[k].value = fmt(next[k]); });
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
    const skip = new Set(["riNo", "pNo", "pno", "createdAt", "updatedAt"]);
    Array.from(form.elements).forEach((el) => {
      if (!el || !el.name || skip.has(el.name)) return;
      const tag = (el.tagName || "").toLowerCase();
      const type = (el.type || "").toLowerCase();
      if (tag === "input" || tag === "textarea") {
        if (type === "checkbox" || type === "radio") {
          el.checked = false;
        } else {
          el.value = "";
        }
      }
    });
  };

  return (
    <div className="RestaurantIntroWrap">
      <form ref={formRef} aria-label="음식점 상세 정보 입력">
        <fieldset>
          <legend>음식점 상세 정보</legend>

          <h4 className="section-title">메뉴 / 결제</h4>
          <div className="form-group">
            <label htmlFor="chkCreditCardFood">신용카드</label>
            <input id="chkCreditCardFood" name="chkCreditCardFood" type="text" defaultValue={fmt(base.chkCreditCardFood)} />
          </div>
          <div className="form-group">
            <label htmlFor="discountInfoFood">할인정보</label>
            <input id="discountInfoFood" name="discountInfoFood" type="text" defaultValue={fmt(base.discountInfoFood)} />
          </div>
          <div className="form-group">
            <label htmlFor="firstMenu">대표메뉴</label>
            <input id="firstMenu" name="firstMenu" type="text" defaultValue={fmt(base.firstMenu)} />
          </div>
          <div className="form-group">
            <label htmlFor="treatMenu">취급메뉴</label>
            <input id="treatMenu" name="treatMenu" type="text" defaultValue={fmt(base.treatMenu)} />
          </div>

          <h4 className="section-title">안내 / 편의</h4>
          <div className="form-group">
            <label htmlFor="infoCenterFood">문의 및 안내</label>
            <input id="infoCenterFood" name="infoCenterFood" type="text" defaultValue={fmt(base.infoCenterFood)} />
          </div>
          <div className="form-group">
            <label htmlFor="kidsFacility">어린이 놀이방 여부(0/1)</label>
            <input id="kidsFacility" name="kidsFacility" type="number" defaultValue={fmt(base.kidsFacility)} />
          </div>
          <div className="form-group">
            <label htmlFor="smoking">금연/흡연 여부</label>
            <input id="smoking" name="smoking" type="text" defaultValue={fmt(base.smoking)} />
          </div>

          <h4 className="section-title">인허가/규모/좌석</h4>
          <div className="form-group">
            <label htmlFor="lcnsNo">인허가 번호</label>
            <input id="lcnsNo" name="lcnsNo" type="text" defaultValue={fmt(base.lcnsNo)} />
          </div>
          <div className="form-group">
            <label htmlFor="scaleFood">규모</label>
            <input id="scaleFood" name="scaleFood" type="text" defaultValue={fmt(base.scaleFood)} />
          </div>
          <div className="form-group">
            <label htmlFor="seat">좌석수</label>
            <input id="seat" name="seat" type="text" defaultValue={fmt(base.seat)} />
          </div>

          <h4 className="section-title">영업</h4>
          <div className="form-group">
            <label htmlFor="openDateFood">개업일</label>
            <input id="openDateFood" name="openDateFood" type="text" defaultValue={fmt(base.openDateFood)} />
          </div>
          <div className="form-group">
            <label htmlFor="openTimeFood">영업시간</label>
            <input id="openTimeFood" name="openTimeFood" type="text" defaultValue={fmt(base.openTimeFood)} />
          </div>
          <div className="form-group">
            <label htmlFor="reservationFood">예약안내</label>
            <input id="reservationFood" name="reservationFood" type="text" defaultValue={fmt(base.reservationFood)} />
          </div>
          <div className="form-group">
            <label htmlFor="restDateFood">쉬는 날</label>
            <input id="restDateFood" name="restDateFood" type="text" defaultValue={fmt(base.restDateFood)} />
          </div>
          <div className="form-group">
            <label htmlFor="packing">포장가능</label>
            <input id="packing" name="packing" type="text" defaultValue={fmt(base.packing)} />
          </div>

          <h4 className="section-title">주차</h4>
          <div className="form-group">
            <label htmlFor="parkingFood">주차시설</label>
            <input id="parkingFood" name="parkingFood" type="text" defaultValue={fmt(base.parkingFood)} />
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
