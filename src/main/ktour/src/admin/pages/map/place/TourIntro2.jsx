/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측]플레이스 Intro상세정보(2.인트로) 컴포넌트
 *
 * @author 
 * @since 2025.10.20
 * @version 0.1.1
 */

export default function TourIntro2({ data }) {
    const t = data ?? {}; // 안전 가드

    const fmt = (s) => (s ?? ""); // null/undefined 방지
    const dateLabel = fmt(t.updatedAt) || fmt(t.createdAt);

    return (
        <div className="TourIntroWrap">
            <form aria-label="관광지 상세 정보 입력">
                <fieldset>
                    <legend>관광지 상세 정보</legend>

                    {/* 수용인원 */}
                    <div className="form-group">
                        <label htmlFor="accomcount">수용인원</label>
                        <input id="accomcount" name="accomcount" type="text" defaultValue={fmt(t.accomcount)} />
                    </div>

                    {/* 유모차/신용카드/반려동물 */}
                    <div className="form-group">
                        <label htmlFor="chkBabyCarriage">유모차 대여정보</label>
                        <input id="chkBabyCarriage" name="chkBabyCarriage" type="text" defaultValue={fmt(t.chkBabyCarriage)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chkCreditCard">신용카드 가능정보</label>
                        <input id="chkCreditCard" name="chkCreditCard" type="text" defaultValue={fmt(t.chkCreditCard)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chkPet">애완동물 동반 가능정보</label>
                        <input id="chkPet" name="chkPet" type="text" defaultValue={fmt(t.chkPet)} />
                    </div>

                    {/* 체험/유산 */}
                    <div className="form-group">
                        <label htmlFor="expAgeRange">체험 가능 연령</label>
                        <input id="expAgeRange" name="expAgeRange" type="text" defaultValue={fmt(t.expAgeRange)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expGuide">체험 안내</label>
                        <textarea id="expGuide" name="expGuide" rows={4} defaultValue={fmt(t.expGuide)} />
                    </div>
                    <div className="form-group">
                        <label>세계문화유산 유무</label>
                        <input aria-label="문화유산1" name="heritage1" type="text" defaultValue={fmt(t.heritage1)} />
                        <input aria-label="문화유산2" name="heritage2" type="text" defaultValue={fmt(t.heritage2)} />
                        <input aria-label="문화유산3" name="heritage3" type="text" defaultValue={fmt(t.heritage3)} />
                    </div>

                    {/* 안내/일정/주차/휴무/이용 */}
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
                        <label htmlFor="restDate">쉬는 날</label>
                        <input id="restDate" name="restDate" type="text" defaultValue={fmt(t.restDate)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="useSeason">이용 시기</label>
                        <input id="useSeason" name="useSeason" type="text" defaultValue={fmt(t.useSeason)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="useTime">이용 시간</label>
                        <input id="useTime" name="useTime" type="text" defaultValue={fmt(t.useTime)} />
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
} // Res.jsx end