export default function RestaurantIntro2({ data }) {
    const r = data ?? {};
    const fmt = (s) => (s ?? "");
    const dateLabel = fmt(r.updatedAt) || fmt(r.createdAt);

    return (
        <div className="RestaurantIntroWrap">
            <form aria-label="음식점 상세 정보 입력">
                <fieldset>
                    <legend>음식점 상세 정보</legend>

                    {/* 결제/할인/대표메뉴 */}
                    <h4 className="section-title">메뉴 / 결제</h4>
                    <div className="form-group">
                        <label htmlFor="chkCreditCardFood">신용카드</label>
                        <input id="chkCreditCardFood" name="chkCreditCardFood" type="text" defaultValue={fmt(r.chkCreditCardFood)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discountInfoFood">할인정보</label>
                        <input id="discountInfoFood" name="discountInfoFood" type="text" defaultValue={fmt(r.discountInfoFood)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstMenu">대표메뉴</label>
                        <input id="firstMenu" name="firstMenu" type="text" defaultValue={fmt(r.firstMenu)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="treatMenu">취급메뉴</label>
                        <input id="treatMenu" name="treatMenu" type="text" defaultValue={fmt(r.treatMenu)} />
                    </div>

                    {/* 안내/어린이/흡연 */}
                    <h4 className="section-title">안내 / 편의</h4>
                    <div className="form-group">
                        <label htmlFor="infoCenterFood">문의 및 안내</label>
                        <input id="infoCenterFood" name="infoCenterFood" type="text" defaultValue={fmt(r.infoCenterFood)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="kidsFacility">어린이 놀이방 여부</label>
                        <input id="kidsFacility" name="kidsFacility" type="text" defaultValue={fmt(r.kidsFacility)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="smoking">금연/흡연여부</label>
                        <input id="smoking" name="smoking" type="text" defaultValue={fmt(r.smoking)} />
                    </div>

                    {/* 인허가/규모/좌석 */}
                    <h4 className="section-title">시설 정보</h4>
                    <div className="form-group">
                        <label htmlFor="lcnsNo">인허가 번호</label>
                        <input id="lcnsNo" name="lcnsNo" type="text" defaultValue={fmt(r.lcnsNo)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="scaleFood">규모</label>
                        <input id="scaleFood" name="scaleFood" type="text" defaultValue={fmt(r.scaleFood)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="seat">좌석수</label>
                        <input id="seat" name="seat" type="text" defaultValue={fmt(r.seat)} />
                    </div>

                    {/* 운영 */}
                    <h4 className="section-title">운영</h4>
                    <div className="form-group">
                        <label htmlFor="openDateFood">개업일</label>
                        <input id="openDateFood" name="openDateFood" type="text" defaultValue={fmt(r.openDateFood)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="openTimeFood">영업시간</label>
                        <input id="openTimeFood" name="openTimeFood" type="text" defaultValue={fmt(r.openTimeFood)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reservationFood">예약안내</label>
                        <input id="reservationFood" name="reservationFood" type="text" defaultValue={fmt(r.reservationFood)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="restDateFood">쉬는 날</label>
                        <input id="restDateFood" name="restDateFood" type="text" defaultValue={fmt(r.restDateFood)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="packing">포장가능</label>
                        <input id="packing" name="packing" type="text" defaultValue={fmt(r.packing)} />
                    </div>

                    {/* 주차 */}
                    <h4 className="section-title">주차</h4>
                    <div className="form-group">
                        <label htmlFor="parkingFood">주차시설</label>
                        <input id="parkingFood" name="parkingFood" type="text" defaultValue={fmt(r.parkingFood)} />
                    </div>

                    <div className="info_date">
                        <b>최종 수정일:</b> {dateLabel || "-"}
                    </div>
                    <div className="form-actions">
                        <button type="button">저장</button> <button type="button">삭제</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}