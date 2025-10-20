/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) 페이지 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.3
 */

export default function PlaceInfo(props) {

    /** ========================= 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) .jsx영역 ================================== */
    return <>
        {/* <!-- 본문 좌/우 분할 섹션 시작 --> */}
        <div className="bothWrap">
            {/* <!-- (1.좌측)검색/리스트 시작 --> */}
            <section className="listWrap">
                {/* <!-- 조건검색창 시작 --> */}
                <div className="detailSearch">
                    <form aria-label="플레이스 조건 검색">
                        <fieldset>
                            <legend>새해 맞이 불꽃쇼 & 소원 풍선 날리기 축제  {/* 기본정보 */}</legend>
                            <span>
                                {/* 1. 콘텐츠 타입 (단일 Select) */}
                                <span className="form-group">
                                    {/* for-id 명시적 연결 */}
                                    <label htmlFor="content-type">콘텐츠 타입</label>
                                    <select id="content-type" name="contentType">
                                        <option value="">전체</option>
                                        <option value="1">관광지</option>
                                        {/* ... 나머지 option 목록 */}
                                    </select>
                                </span>

                                {/* 2. 노출 여부 (단일 Select) */}
                                <span className="form-group">
                                    <label htmlFor="exposure-status">노출 여부</label>
                                    <select id="exposure-status" name="exposureStatus">
                                        <option value="">전체</option>
                                        <option value="1">노출</option>
                                        <option value="2">비노출</option>
                                    </select>
                                </span>
                            </span>
                            {/* 3. 카테고리 (다중 Select) */}
                            <div className="form-group category-group">
                                <label htmlFor="category-large">카테고리</label>
                                {/* 대분류 */}
                                <select id="category-large" name="categoryLarge">
                                    <option value="">대분류</option>
                                </select>
                                {/* 중분류*/}
                                <select aria-label="카테고리 중분류" name="categoryMedium">
                                    <option value="">중분류</option>
                                </select>
                                {/* 소분류 */}
                                <select aria-label="카테고리 소분류" name="categorySmall">
                                    <option value="">소분류</option>
                                </select>
                            </div>
                            <span>
                                {/* 4. 1차 지역 */}
                                <span className="form-group">
                                    <label htmlFor="region-primary">1차 지역</label>
                                    <select id="region-primary" name="regionPrimary">
                                        <option value="">전체</option>
                                        <option value="seoul">서울</option>
                                        <option value="gyeonggi">경기도</option>
                                    </select>
                                </span>
                                {/* 5. 2차 지역 */}
                                <span className="form-group">
                                    <label htmlFor="region-secondary">2차 지역</label>
                                    <select id="region-secondary" name="regionSecondary">
                                        <option value="">전체</option>
                                        <option value="gangnam">강남구</option>
                                        <option value="dongjak">동작구</option>
                                    </select>
                                </span>
                            </span>
                            {/* 6. 주소명 */}
                            <span className="form-group">
                                <label htmlFor="address-keyword">주소명</label>
                                <input type="text" id="address-keyword" name="addressKeyword" />
                            </span>

                            {/* 7. 대표전화 */}
                            <span className="form-group">
                                <label htmlFor="main-phone">대표전화</label>
                                <input type="text" id="main-phone" name="mainPhone" />
                            </span>
                            <br />
                            {/* 8. 플레이스명 */}
                            <span className="form-group">
                                <label htmlFor="place-name">플레이스명</label>
                                <input type="text" id="place-name" name="placeName" />
                            </span>

                            {/* 9. 플레이스번호 */}
                            <span className="form-group">
                                <label htmlFor="place-number">플레이스 번호</label>
                                <input type="text" id="place-number" name="placeNumber" />
                            </span>

                            {/* 10. 검색 버튼*/}
                            <div className="form-actions">
                                <button type="button" className="searchBtn">검색</button>
                                <button type="button" className="btn line">초기화</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                {/* <!-- 조건검색창 끝 --> */}

                {/* <!-- 목록(리스트) 테이블 시작 --> */}
                <ul className="titleBox">
                    <li className="result">검색결과 : @@개</li>
                    <li className="btnBox">
                        <select className="baseDateInput">
                            <option value="10">10개 보기</option>
                            <option value="30">30개 보기</option>
                            <option value="50">50개 보기</option>
                        </select>
                        <button type="button" className="btn line">엑셀 다운로드</button>
                    </li>
                </ul>
                <div className="tableWrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">플레이스번호</th>
                                <th scope="col">플레이스명</th>
                                <th scope="col">콘텐츠타입</th>
                                <th scope="col">카테고리(소분류)</th>
                                <th scope="col">주소</th>
                                <th scope="col">대표전화</th>
                                <th scope="col">노출여부</th>
                                <th scope="col">등록일</th>
                                <th scope="col">수정일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="active">
                                <td>2</td>
                                <td>2932765</td>
                                <td><strong>새해 맞이 불꽃쇼 & 소원 풍선 날리기 축제</strong></td>
                                <td>행사/공연/축제</td>
                                <td>문화관광축제</td>
                                <td>강원특별자치도 고성군 삼포해변길 9 오션투유콘도</td>
                                <td>1666-1243</td>
                                <td>비노출</td>
                                <td>2025-00-00</td>
                                <td>2025-00-00</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>421977</td>
                                <td><strong>고성명태축제</strong></td>
                                <td>행사/공연/축제</td>
                                <td>문화관광축제</td>
                                <td>강원특별자치도 고성군 거진읍 대대리</td>
                                <td>033-681-0121,0122</td>
                                <td>노출</td>
                                <td>2025-00-00</td>
                                <td>2025-00-00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <!-- 목록(리스트) 테이블 끝 --> */}
            </section>
            {/* <!-- [1.좌측] 검색/리스트 끝 --> */}
            {/* <!-- [2.우측] 상세정보_CRUD 시작 --> */}
            <section className="registWrap">
                {/* <!-- (2.우측)CRUD.타이틀/버튼 시작 --> */}
                <div className="titleBox">
                    <ul className="tabtitle">
                        <li className="active">기본정보</li>
                        <li>상세정보</li>
                        <li>반복정보</li>
                    </ul>
                    <span className="btnBox">
                        <button type="button" className="btn full">저장</button>
                        <button type="button" className="btn line">삭제</button>
                        <button type="button" className="btn line">신규등록</button>
                    </span>
                </div>
                {/* <!--(2.우측) CRUD.타이틀/버튼 끝 --> */}
                {/* <!-- CUD.입/출력단 시작 --> */}
                <div className="formWrap">
                    <div>
                        <form aria-label="기본정보 입력">
                            <fieldset>
                                <legend>새해 맞이 불꽃쇼 & 소원 풍선 날리기 축제  {/* 기본정보 */}</legend>
                                {/* 1. 지도 미리보기 영역 */}
                                <div className="previewMap" aria-hidden="true">지도 영역</div>
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
                    <hr />
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
                    <hr />
                    <form aria-label="반복정보 입력">
                        <fieldset>
                            <legend>반복정보</legend>
                            {/* 1. 제목 입력 필드 */}
                            <div className="form-group">
                                {/* <label>의 for와 <input>의 id를 일치시켜 명시적 연결 */}
                                <label htmlFor="post-title">제목</label>
                                <input type="text" id="post-title" name="title" />
                            </div>

                            {/* 2. 내용 입력 필드 - 내용이 길다면 <textarea>를 사용하는 것이 더 적절합니다. */}
                            <div className="form-group">
                                <label htmlFor="post-content">내용</label>
                                <input type="text" id="post-content" name="content" />
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
                {/* <!-- (2.우측)CUD.입/출력단 시작 --> */}
            </section>
            {/* <!-- [2.우측] 상세정보_CRUD 끝 --> */}
        </div>
        {/* <!-- 본문 좌/우 분할 섹션 끝 --> */}
    </>
}// PlaceInfo.jsx end