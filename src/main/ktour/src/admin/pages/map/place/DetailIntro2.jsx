/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측]플레이스 Intro상세정보(2.인트로) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.20
 * @version 0.1.1
 */

export default function DetailIntro2(props) {

/** ========================= [본문 우측] 플레이스 Intro상세정보(2.인트로) 컴포넌트============================== */
    return (
        <>
            <div className="placeIntroWrap">
                <form aria-label="관광지 상세 정보 입력">
                    <fieldset>
                        <legend>관광지 상세 정보</legend>
                        {/* 1. 수용인원 */}
                        <div className="form-group">
                            {/* for-id를 사용하여 명시적으로 연결 */}
                            <label htmlFor="capacity">수용인원</label>
                            <input type="text" id="capacity" name="capacity" />
                        </div>

                        {/* 2. 유모차 대여정보 */}
                        <div className="form-group">
                            <label htmlFor="stroller-rental">유모차 대여정보</label>
                            <input type="text" id="stroller-rental" name="strollerRental" />
                        </div>

                        {/* 3. 신용카드 가능정보 */}
                        <div className="form-group">
                            <label htmlFor="credit-card">신용카드 가능정보</label>
                            <input type="text" id="credit-card" name="creditCard" />
                        </div>

                        {/* 4. 애완동물 동반 가능정보 */}
                        <div className="form-group">
                            <label htmlFor="pet-allowed">애완동물 동반 가능정보</label>
                            <input type="text" id="pet-allowed" name="petAllowed" />
                        </div>

                        {/* 5. 체험 가능 연령 */}
                        <div className="form-group">
                            <label htmlFor="age-limit">체험 가능 연령</label>
                            <input type="text" id="age-limit" name="ageLimit" />
                        </div>

                        {/* 6. 체험 안내 (textarea) */}
                        <div className="form-group">
                            <label htmlFor="experience-info">체험 안내</label>
                            <textarea id="experience-info" name="experienceInfo" rows="4"></textarea>
                        </div>

                        {/* 7. 세계문화유산 유무: 하나의 레이블에 여러 input이 있으므로, 각 input에 aria-label 부여 */}
                        <div className="form-group">
                            {/* 메인 레이블 */}
                            <label>세계문화유산 유무</label>
                            <input type="text" aria-label="문화유산 정보 1" name="heritage1" placeholder="문화유산 정보 1" />
                            <input type="text" aria-label="문화유산 정보 2" name="heritage2" placeholder="문화유산 정보 2" />
                            <input type="text" aria-label="문화유산 정보 3" name="heritage3" placeholder="문화유산 정보 3" />
                        </div>

                        {/* 8. 문의 및 안내 */}
                        <div className="form-group">
                            <label htmlFor="inquiry-info">문의 및 안내</label>
                            <input type="text" id="inquiry-info" name="inquiryInfo" />
                        </div>

                        {/* 9. 개장일 */}
                        <div className="form-group">
                            <label htmlFor="opening-date">개장일</label>
                            <input type="text" id="opening-date" name="openingDate" />
                        </div>

                        {/* 10. 주차시설 */}
                        <div className="form-group">
                            <label htmlFor="parking">주차시설</label>
                            <input type="text" id="parking" name="parking" />
                        </div>

                        {/* 11. 쉬는 날 */}
                        <div className="form-group">
                            <label htmlFor="closing-day">쉬는 날</label>
                            <input type="text" id="closing-day" name="closingDay" />
                        </div>

                        {/* 12. 이용 시기 */}
                        <div className="form-group">
                            <label htmlFor="usage-period">이용 시기</label>
                            <input type="text" id="usage-period" name="usagePeriod" />
                        </div>

                        {/* 13. 이용 시간 */}
                        <div className="form-group">
                            <label htmlFor="usage-time">이용 시간</label>
                            <input type="text" id="usage-time" name="usageTime" />
                        </div>
                        <div className="info_date">
                            <b>등록일:</b>2025-00-00 (00:00:00)<b>수정일:</b>2025-00-00 (00:00:00)
                        </div>
                        <div className="form-actions">
                            <button type="button">저장</button> <button>삭제</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}// DetailIntro2.jsx end