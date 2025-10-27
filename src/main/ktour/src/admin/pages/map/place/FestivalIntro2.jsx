export default function FestivalIntro2(props) {



    return (
        <>
            <div className="FestivalIntroWrap">
                <form aria-label="행사/공연/축제 상세 정보 입력">
                    <fieldset>
                        <legend>행사/공연/축제 상세 정보</legend>

                        {/* ───────── 일정/진행 정보 ───────── */}
                        <h4 className="section-title">일정 / 진행</h4>

                        {/* 행사 시작일 */}
                        <div className="form-group">
                            <label htmlFor="eventStartDate">행사 시작일</label>
                            <input type="text" id="eventStartDate" name="eventStartDate" placeholder="예) 2025-07-01" />
                        </div>

                        {/* 행사 종료일 */}
                        <div className="form-group">
                            <label htmlFor="eventEndDate">행사 종료일</label>
                            <input type="text" id="eventEndDate" name="eventEndDate" placeholder="예) 2025-07-07" />
                        </div>

                        {/* 진행 상태 */}
                        <div className="form-group">
                            <label htmlFor="progressType">진행 상태</label>
                            <input type="text" id="progressType" name="progressType" placeholder="예) 예정 / 진행중 / 종료" />
                        </div>

                        {/* 축제 유형 */}
                        <div className="form-group">
                            <label htmlFor="festivalType">축제 유형</label>
                            <input type="text" id="festivalType" name="festivalType" placeholder="예) 음악, 전통, 불꽃놀이" />
                        </div>

                        {/* 축제 등급 */}
                        <div className="form-group">
                            <label htmlFor="festivalGrade">축제 등급</label>
                            <input type="text" id="festivalGrade" name="festivalGrade" placeholder="예) 지역축제, 광역축제" />
                        </div>

                        {/* ───────── 장소/위치/홈페이지 ───────── */}
                        <h4 className="section-title">장소 / 위치 / 홈페이지</h4>

                        {/* 행사 장소 */}
                        <div className="form-group">
                            <label htmlFor="eventPlace">행사 장소</label>
                            <input type="text" id="eventPlace" name="eventPlace" placeholder="예) OO공원 메인무대" />
                        </div>

                        {/* 행사장 위치 안내 */}
                        <div className="form-group">
                            <label htmlFor="placeInfo">행사장 위치 안내</label>
                            <input type="text" id="placeInfo" name="placeInfo" placeholder="예) 1번 출입구에서 직진 300m" />
                        </div>

                        {/* 홈페이지 정보 */}
                        <div className="form-group">
                            <label htmlFor="eventHomepage">홈페이지</label>
                            <input type="text" id="eventHomepage" name="eventHomepage" placeholder="예) https://example.com" />
                        </div>

                        {/* ───────── 예매/요금/할인 ───────── */}
                        <h4 className="section-title">예매 / 요금</h4>

                        {/* 예매처 */}
                        <div className="form-group">
                            <label htmlFor="bookingPlace">예매처</label>
                            <input type="text" id="bookingPlace" name="bookingPlace" placeholder="예) 인터파크, 현장 예매" />
                        </div>

                        {/* 이용요금 */}
                        <div className="form-group">
                            <label htmlFor="useTimeFestival">이용 요금</label>
                            <input type="text" id="useTimeFestival" name="useTimeFestival" placeholder="예) 성인 10,000원 / 청소년 5,000원" />
                        </div>

                        {/* 할인정보 */}
                        <div className="form-group">
                            <label htmlFor="discountInfoFestival">할인 정보</label>
                            <input type="text" id="discountInfoFestival" name="discountInfoFestival" placeholder="예) 지역주민 20% 할인" />
                        </div>

                        {/* ───────── 관람/프로그램 ───────── */}
                        <h4 className="section-title">관람 / 프로그램</h4>

                        {/* 관람 가능 연령 */}
                        <div className="form-group">
                            <label htmlFor="ageLimit">관람 가능 연령</label>
                            <input type="text" id="ageLimit" name="ageLimit" placeholder="예) 전체관람가 / 12세 이상" />
                        </div>

                        {/* 관람 소요시간 */}
                        <div className="form-group">
                            <label htmlFor="spendTimeFestival">관람 소요시간</label>
                            <input type="text" id="spendTimeFestival" name="spendTimeFestival" placeholder="예) 약 90분" />
                        </div>

                        {/* 공연 시간 */}
                        <div className="form-group">
                            <label htmlFor="playTime">공연 시간</label>
                            <input type="text" id="playTime" name="playTime" placeholder="예) 14:00 ~ 16:00" />
                        </div>

                        {/* 행사 프로그램 */}
                        <div className="form-group">
                            <label htmlFor="program">행사 프로그램</label>
                            <input type="text" id="program" name="program" placeholder="예) 개막식, 메인콘서트, 불꽃쇼" />
                        </div>

                        {/* ───────── 주최/주관 ───────── */}
                        <h4 className="section-title">주최 / 주관</h4>

                        {/* 주최자 정보/연락처 */}
                        <div className="form-group">
                            <label htmlFor="sponsor1">주최자</label>
                            <input type="text" id="sponsor1" name="sponsor1" placeholder="예) OO시청" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sponsor1Tel">주최자 연락처</label>
                            <input type="text" id="sponsor1Tel" name="sponsor1Tel" placeholder="예) 02-1234-5678" />
                        </div>

                        {/* 주관사 정보/연락처 */}
                        <div className="form-group">
                            <label htmlFor="sponsor2">주관사</label>
                            <input type="text" id="sponsor2" name="sponsor2" placeholder="예) OO문화재단" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sponsor2Tel">주관사 연락처</label>
                            <input type="text" id="sponsor2Tel" name="sponsor2Tel" placeholder="예) 02-9876-5432" />
                        </div>

                        {/* ───────── 기타 ───────── */}
                        <h4 className="section-title">기타</h4>

                        {/* 부대행사 */}
                        <div className="form-group">
                            <label htmlFor="subEvent">부대행사</label>
                            <input type="text" id="subEvent" name="subEvent" placeholder="예) 체험부스, 푸드트럭" />
                        </div>

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