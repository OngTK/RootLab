export default function RestaurantIntro2(props) {



    return (
        <>
            <div className="RestaurantIntroWrap">
                <form aria-label="음식점 상세 정보 입력">
                    <fieldset>
                        <legend>음식점 상세 정보</legend>

                        {/* ───────────────── 음식 관련 ───────────────── */}
                        <h4 className="section-title">음식 관련</h4>

                        {/* 대표메뉴 */}
                        <div className="form-group">
                            <label htmlFor="firstMenu">대표메뉴</label>
                            <input type="text" id="firstMenu" name="firstMenu" placeholder="예) 김치찌개, 제육볶음" />
                        </div>

                        {/* 취급메뉴 */}
                        <div className="form-group">
                            <label htmlFor="treatMenu">취급메뉴</label>
                            <textarea id="treatMenu" name="treatMenu" rows={3} placeholder="예) 한식, 분식, 칼국수 등"></textarea>
                        </div>

                        {/* 할인정보 */}
                        <div className="form-group">
                            <label htmlFor="discountInfoFood">할인정보</label>
                            <input type="text" id="discountInfoFood" name="discountInfoFood" placeholder="예) 평일 런치 10% 할인" />
                        </div>

                        {/* ───────────────── 편의시설 관련 ───────────────── */}
                        <h4 className="section-title">편의시설 관련</h4>

                        {/* 신용카드 가능정보 */}
                        <div className="form-group">
                            <label htmlFor="chkCreditCardFood">신용카드 가능</label>
                            <input id="chkCreditCardFood" name="chkCreditCardFood" defaultValue="" />
                        </div>

                        {/* 어린이 놀이방 여부 */}
                        <div className="form-group">
                            <label htmlFor="kidsFacility">어린이 놀이방</label>
                            <select id="kidsFacility" name="kidsFacility" defaultValue="">
                                <option value="">선택</option>
                                <option value="1">있음</option>
                                <option value="0">없음</option>
                            </select>
                        </div>

                        {/* 금연/흡연여부 */}
                        <div className="form-group">
                            <label htmlFor="smoking">흡연 여부</label>
                            <input id="smoking" name="smoking" defaultValue="" />
                        </div>

                        {/* 포장 가능 */}
                        <div className="form-group">
                            <label htmlFor="packing">포장 가능</label>
                            <input id="packing" name="packing" defaultValue="" />
                        </div>

                        {/* 주차시설 */}
                        <div className="form-group">
                            <label htmlFor="parkingFood">주차시설</label>
                            <input type="text" id="parkingFood" name="parkingFood" placeholder="예) 전용 주차장 10대, 공영주차장 100m" />
                        </div>

                        {/* ───────────────── 운영 관련 ───────────────── */}
                        <h4 className="section-title">운영 관련</h4>

                        {/* 개업일 */}
                        <div className="form-group">
                            <label htmlFor="openDateFood">개업일</label>
                            <input type="date" id="openDateFood" name="openDateFood" />
                        </div>

                        {/* 영업시간 */}
                        <div className="form-group">
                            <label htmlFor="openTimeFood">영업시간</label>
                            <input type="text" id="openTimeFood" name="openTimeFood" placeholder="예) 10:00 ~ 21:00(브레이크 15:00~17:00)" />
                        </div>

                        {/* 예약안내 */}
                        <div className="form-group">
                            <label htmlFor="reservationFood">예약 안내</label>
                            <input type="text" id="reservationFood" name="reservationFood" placeholder="예) 전화 예약 가능, 온라인 예약 불가" />
                        </div>

                        {/* 좌석수 */}
                        <div className="form-group">
                            <label htmlFor="seat">좌석수</label>
                            <input type="text" id="seat" name="seat" min="0" placeholder="예) 48" />
                        </div>

                        {/* 규모 */}
                        <div className="form-group">
                            <label htmlFor="scaleFood">규모</label>
                            <input type="text" id="scaleFood" name="scaleFood" placeholder="예) 50평, 룸 2개" />
                        </div>

                        {/* ───────────────── 기타 ───────────────── */}
                        <h4 className="section-title">기타</h4>

                        {/* 인허가 번호 */}
                        <div className="form-group">
                            <label htmlFor="lcnsNo">인허가 번호</label>
                            <input type="text" id="lcnsNo" name="lcnsNo" placeholder="예) 2025-서울-00001" />
                        </div>

                        {/* 쉬는 날 */}
                        <div className="form-group">
                            <label htmlFor="restDateFood">쉬는 날</label>
                            <input type="text" id="restDateFood" name="restDateFood" placeholder="예) 매주 월요일 / 명절 당일" />
                        </div>

                        {/* 문의 및 안내 */}
                        <div className="form-group">
                            <label htmlFor="infoCenterFood">문의 및 안내</label>
                            <input type="text" id="infoCenterFood" name="infoCenterFood" placeholder="예) 02-1234-5678" />
                        </div>

                        {/* 등록/수정일 & 액션 */}
                        <div className="info_date">
                            <b>등록일:</b>2025-00-00 (00:00:00) <b>수정일:</b>2025-00-00 (00:00:00)
                        </div>
                        <div className="form-actions">
                            <button type="button">저장</button> <button type="button">삭제</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}