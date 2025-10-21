/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측] 플레이스 공통정보(1.기본) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.20
 * @version 0.1.1
 */

export default function DetailCommon1(props) {

/** ====================== [본문 우측] 플레이스 공통정보(1.기본) 컴포넌트 =========================== */
    return (
        <>
            <div className="placeCommonWrap">
                <form aria-label="기본정보 입력">
                    <fieldset>
                        <legend>새해 맞이 불꽃쇼 & 소원 풍선 날리기 축제  {/* 기본정보 */}</legend>
                        {/* 1. 지도 미리보기 영역 */}
                        <div className="previewMap" aria-hidden="true">K-TOUR</div>
                        {/* 1. 콘텐츠 타입 (선택 필드) */}
                        <div className="form-group">
                            <label htmlFor="content-type">콘텐츠 타입</label>
                            <select id="content-type" name="contentType" disabled>
                                <option value="">전체</option>
                                <option value="1">관광지</option>
                                <option value="3">행사/공연/축제</option>
                            </select>
                            {/* 2. 노출 여부 (라디오 버튼 그룹) - fieldset과 legend로 그룹화 필수 */}
                            <span className="form-group">
                                <span>노출 여부</span>
                                <span className="radio-group">
                                    <input type="radio" id="exposure-on" name="exposure" value="Y" defaultChecked />
                                    <label htmlFor="exposure-on">노출</label>
                                    <input type="radio" id="exposure-off" name="exposure" value="N" />
                                    <label htmlFor="exposure-off">비노출</label>
                                </span>
                            </span>
                        </div>
                        {/* 3. 카테고리 (다중 Select 필드) */}
                        <div className="form-group category-group">
                            <label htmlFor="category-large">카테고리</label>
                            {/* 대분류 */}
                            <select id="category-large" name="categoryLarge" required aria-required="true">
                                <option value="">대분류</option>
                            </select>
                            {/* 중분류 */}
                            <select aria-label="카테고리 중분류" name="categoryMedium" required aria-required="true">
                                <option value="">중분류</option>
                            </select>
                            {/* 소분류 */}
                            <select aria-label="카테고리 소분류" name="categorySmall" required aria-required="true">
                                <option value="">소분류</option>
                            </select>
                        </div>

                        {/* 4. 플레이스명 */}
                        <div className="form-group">
                            <label htmlFor="place-name">플레이스명</label>
                            <input type="text" id="place-name" name="placeName" required aria-required="true" />
                            {/* 5. 플레이스 번호 */}
                            <span className="form-group">
                                <label htmlFor="place-number">플레이스 번호</label>
                                <input type="text" id="place-number" name="placeNumber" disabled />
                            </span>
                        </div>
                        {/* 6. 기본 주소 */}
                        <div className="form-group">
                            <label htmlFor="zip-code">기본 주소</label>
                            <button type="button" aria-label="우편번호 검색" required aria-required="true">우편번호</button>
                            <input type="text" id="zip-code" name="zipCodeInput" placeholder="우편번호" disabled aria-label="우편번호" />
                            <input type="text" id="base-addr" name="addrInput" placeholder="주소" disabledaria-label="기본 주소" />
                        </div>

                        {/* 7. 상세 주소 */}
                        <div className="form-group">
                            <label htmlFor="detail-addr">상세 주소</label>
                            <input type="text" id="detail-addr" name="addrDetailInput" placeholder="상세주소 입력" className="input100" />
                        </div>

                        {/* 8. 대표 전화 및 설명 */}
                        <div className="form-group phone-group">
                            <label htmlFor="main-phone">대표전화</label>
                            <input type="text" id="main-phone" name="mainPhone" />
                            <label htmlFor="phone-desc" className="sr-only">대표전화 설명</label> {/* 시각적으로는 숨기고 스크린 리더에게만 제공 */}
                            <input type="text" id="phone-desc" name="phoneDesc" placeholder="전화 설명 (예: 9시~18시)" />
                        </div>

                        {/* 9. 홈페이지 */}
                        <div className="form-group">
                            <label htmlFor="homepage">홈페이지</label>
                            <input type="text" id="homepage" name="homepage" />
                        </div>

                        {/* 10. 개요 설명 */}
                        <div className="form-group">
                            <label htmlFor="summary-desc">개요 설명</label>
                            <textarea id="summary-desc" name="summaryDesc" className="memoInput" placeholder="상세소개를 입력하세요." rows="5"></textarea>
                        </div>
                        {/* 11. 마커 이미지 */}
                        <div className="form-group">
                            <label htmlFor="marker-img">마커 이미지</label>
                            <input type="file" id="marker-img" name="markerImage" />
                        </div>

                        {/* 12. 대표 이미지 */}
                        <div className="form-group">
                            <label htmlFor="main-img">대표 이미지</label>
                            <input type="file" id="main-img" name="mainImage" />
                            <span className="info-text" id="main-img-hint">*이미지 사이즈: 800px(가로) * 600px(세로) 권장</span>
                        </div>

                        {/* 13. 상세 이미지 1 */}
                        <div className="form-group">
                            <label htmlFor="detail-img-1">상세 이미지 1</label>
                            <input type="file" id="detail-img-1" name="detailImage1" multiple />
                            <span className="info-text" id="detail-img-hint">*멀티업로드(~최대 10개/ 이미지별 용량제한 ~2MB)</span>
                        </div>

                        {/* 14. 이미지 설명 1 */}
                        <div className="form-group">
                            <label htmlFor="img-desc-1">이미지 설명 1</label>
                            <input type="text" id="img-desc-1" name="imageDesc1" />
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
}// DetailCommon1.jsx end