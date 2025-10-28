export default function FestivalIntro2({ data }) {
    console.log(data)
    const f = data ?? {};
    const fmt = (s) => (s ?? "");
    const dateLabel = fmt(f.updatedAt) || fmt(f.createdAt);

    return (
        <div className="FestivalIntroWrap">
            <form aria-label="행사/공연/축제 상세 정보 입력">
                <fieldset>
                    <legend>행사/공연/축제 상세 정보</legend>

                    <h4 className="section-title">일정 / 진행</h4>
                    <div className="form-group">
                        <label htmlFor="eventStartDate">행사 시작일</label>
                        <input id="eventStartDate" name="eventStartDate" type="text" defaultValue={fmt(f.eventStartDate)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventEndDate">행사 종료일</label>
                        <input id="eventEndDate" name="eventEndDate" type="text" defaultValue={fmt(f.eventEndDate)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="progressType">진행 상태</label>
                        <input id="progressType" name="progressType" type="text" defaultValue={fmt(f.progressType)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="festivalType">축제 유형</label>
                        <input id="festivalType" name="festivalType" type="text" defaultValue={fmt(f.festivalType)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="festivalGrade">축제 등급</label>
                        <input id="festivalGrade" name="festivalGrade" type="text" defaultValue={fmt(f.festivalGrade)} />
                    </div>

                    <h4 className="section-title">장소 / 위치 / 홈페이지</h4>
                    <div className="form-group">
                        <label htmlFor="eventPlace">행사 장소</label>
                        <input id="eventPlace" name="eventPlace" type="text" defaultValue={fmt(f.eventPlace)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="placeInfo">행사장 위치 안내</label>
                        <input id="placeInfo" name="placeInfo" type="text" defaultValue={fmt(f.placeInfo)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventHomepage">홈페이지</label>
                        <input id="eventHomepage" name="eventHomepage" type="text" defaultValue={fmt(f.eventHomepage)} />
                    </div>

                    <h4 className="section-title">예매 / 요금</h4>
                    <div className="form-group">
                        <label htmlFor="bookingPlace">예매처</label>
                        <input id="bookingPlace" name="bookingPlace" type="text" defaultValue={fmt(f.bookingPlace)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="useTimeFestival">이용 요금</label>
                        <input id="useTimeFestival" name="useTimeFestival" type="text" defaultValue={fmt(f.useTimeFestival)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discountInfoFestival">할인 정보</label>
                        <input id="discountInfoFestival" name="discountInfoFestival" type="text" defaultValue={fmt(f.discountInfoFestival)} />
                    </div>

                    <h4 className="section-title">관람 / 프로그램</h4>
                    <div className="form-group">
                        <label htmlFor="ageLimit">관람 가능 연령</label>
                        <input id="ageLimit" name="ageLimit" type="text" defaultValue={fmt(f.ageLimit)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="spendTimeFestival">관람 소요시간</label>
                        <input id="spendTimeFestival" name="spendTimeFestival" type="text" defaultValue={fmt(f.spendTimeFestival)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="playTime">공연 시간</label>
                        <input id="playTime" name="playTime" type="text" defaultValue={fmt(f.playTime)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="program">행사 프로그램</label>
                        <input id="program" name="program" type="text" defaultValue={fmt(f.program)} />
                    </div>

                    <h4 className="section-title">주최 / 주관</h4>
                    <div className="form-group">
                        <label htmlFor="sponsor1">주최자</label>
                        <input id="sponsor1" name="sponsor1" type="text" defaultValue={fmt(f.sponsor1)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sponsor1Tel">주최자 연락처</label>
                        <input id="sponsor1Tel" name="sponsor1Tel" type="text" defaultValue={fmt(f.sponsor1Tel)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sponsor2">주관사</label>
                        <input id="sponsor2" name="sponsor2" type="text" defaultValue={fmt(f.sponsor2)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sponsor2Tel">주관사 연락처</label>
                        <input id="sponsor2Tel" name="sponsor2Tel" type="text" defaultValue={fmt(f.sponsor2Tel)} />
                    </div>

                    <h4 className="section-title">기타</h4>
                    <div className="form-group">
                        <label htmlFor="subEvent">부대행사</label>
                        <input id="subEvent" name="subEvent" type="text" defaultValue={fmt(f.subEvent)} />
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