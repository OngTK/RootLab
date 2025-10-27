/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 좌측]플레이스 목록(PlaceList) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.20
 * @version 0.1.2
 */
import ResizableTable from "@admin/components/common/ResizableTable";
import "@assets/admin/css/resizableTable.css"; // resizableTable.css
import CategorySelect from "../../../components/admin/place/CategorySelect";
import RegionSelect from "../../../components/admin/place/RegionSelect";
import Pagination from "../../../components/admin/place/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { createCookieSessionStorage } from "react-router-dom";

export default function ListSection(props) {

    const [category, setCategory] = useState({ ccNo: null, l1Cd: null, l2Cd: null, l3Cd: null, l1Nm: null, l2Nm: null, l3Nm: null });
    const [region, setRegion] = useState({ ldNo: null, regnCd: null, signguCd: null, regnNm: null, signguNm: null });
    const [ctNo, setCtNo] = useState("");      // 콘텐츠 타입 value
    const [showVal, setShowVal] = useState("");      // "전체|1|0" → 1:true, 0:false
    const [title, setTitle] = useState("");      // 플레이스명
    const [phone, setPhone] = useState("");      // 대표전화(선택)
    const [pNo, setPNo] = useState("");      // 플레이스 번호
    const [addressInput, setAddressInput] = useState(""); // 주소명(직접 입력란)
    const [rows, setRows] = useState([]);      // 검색 결과 테이블 데이터
    const [size, setSize] = useState(10); // 기본 10
    const [page, setPage] = useState(1);  // 기본 1 (페이지네이션 붙일 때 업데이트)
    const [totalElements, setTotalElements] = useState(0);

    const onRegionChange = (v) => {
        setRegion(v);
    };

    const ccName = category.l3Cd || category.l2Cd || category.l1Cd || null;
    const address = addressInput?.trim() || null;
    const ldName = region.regnNm && region.signguNm
        ? `${region.regnNm} ${region.signguNm}` // 1차+2차
        : region.regnNm || null;                // 1차만 선택 시

    // 검색 실행 핸들러
    const onSearch = async (e) => {
        e?.preventDefault?.();
        const params = {
            title: title || null,
            address: address || null,     // 1차+" "+2차 텍스트 or 직접입력 텍스트
            ccName: ccName || null,       // "대/중/소" 중 선택된 부분만 join
            ldName: ldName || null,
            ctNo: ctNo ? Number(ctNo) : null,
            showflage: showVal === "1" ? true : (showVal === "0" ? false : null),
            pNo: pNo ? Number(pNo) : null,
            tel: phone || null,           // 필요하면 백에서 사용
            size,
            page
        };
        console.log(params)
        // null은 보내지 않도록 정리
        Object.keys(params).forEach(k => params[k] == null && delete params[k]);
        const { data } = await axios.get("http://localhost:8080/placeinfo/search", { params });
        // Page<T> 형태 반영
        const content = data.content ?? [];
        setPage(data?.currentPage ?? page);
        setSize(data?.size ?? size);
        setTotalElements(data?.totalElements ?? 0);

        console.log(content)

        // columns(id) = ["no","pno","title","contentTypeName","lclsSystm3Nm","addr1","tel"]
        // 백엔드 필드 ↔ 화면 컬럼 매핑
        const offset = ((data?.currentPage ?? page) - 1) * (data?.size ?? size);
        const rowsMapped = content.map((r, idx) => ({
            no: offset + idx + 1,
            pno: r.pno ,
            title: r.title ,
            contentTypeName: r.contentTypeName ,
            lclsSystm3Nm: r.lclsSystm3Nm ,
            addr1: r.addr1,
            tel: r.tel,
        }));
        setRows(rowsMapped);
    };

    // 초기화 핸들러
    const onReset = () => {
        setCategory({ ccNo: null, l1Cd: null, l2Cd: null, l3Cd: null, l1Nm: null, l2Nm: null, l3Nm: null });
        setRegion({ ldNo: null, regnCd: null, signguCd: null, regnNm: null, signguNm: null });
        setCtNo("");
        setShowVal("");
        setTitle("");
        setPhone("");
        setPNo("");
        setAddressInput("");
        setRows([]);
        setPage(1);
    };

    // 테이블 컬럼 정의
    const columns = [
        { id: "no", title: "No", width: 70 },
        { id: "pno", title: "플레이스번호", width: 110 },
        { id: "title", title: "플레이스명", width: 220 },
        { id: "contentTypeName", title: "콘텐츠타입", width: 120 },
        { id: "lclsSystm3Nm", title: "카테고리", width: 140 },
        { id: "addr1", title: "주소", width: 260 },
        { id: "tel", title: "전화번호", width: 120 },
    ];

    // 페이지 변경/개수 변경 시
    const handlePageChange = (p) => setPage(p);
    const handleSizeChange = (s) => {
        setSize(s);
        setPage(1); // 사이즈 바꾸면 1페이지로
    };

    // useEffect로 페이지 전환 시 자동 재조회
    useEffect(() => {
        onSearch();
    }, [page, size]);

    /** ============================ [본문 좌측] 플레이스 목록(PlaceList) ================================= */
    return (
        <>
            {/* <!-- [좌측] 검색/리스트 시작 --> */}
            <section className="listWrap">
                {/* <!-- 조건검색창 시작 --> */}
                <div className="detailSearch">
                    <form aria-label="플레이스 조건 검색" onSubmit={(e) => { e.preventDefault(); /* category를 포함해 검색 */ }}>
                        <span>
                            {/* 1. 콘텐츠 타입 (단일 Select) */}
                            <span className="form-group">
                                {/* for-id 명시적 연결 */}
                                <label htmlFor="content-type">콘텐츠 타입</label>
                                <select id="content-type" name="contentType" value={ctNo} onChange={(e) => setCtNo(e.target.value)}>
                                    <option value="">전체</option>
                                    <option value="1">관광지</option>
                                    <option value="2">문화시설</option>
                                    <option value="3">행사/공연/축제</option>
                                    <option value="4">여행코스</option>
                                    <option value="5">레포츠</option>
                                    <option value="6">숙박</option>
                                    <option value="7">쇼핑</option>
                                    <option value="8">음식점</option>
                                </select>
                            </span>
                            {/* 2. 노출 여부 (단일 Select) */}
                            <span className="form-group">
                                <label htmlFor="exposure-status">노출 여부</label>
                                <select id="exposure-status" name="exposureStatus" value={showVal} onChange={(e) => setShowVal(e.target.value)}>
                                    <option value="">전체</option>
                                    <option value="1">노출</option>
                                    <option value="0">비노출</option>
                                </select>
                            </span>
                        </span>
                        {/* 3. 카테고리 (다중 Select) */}
                        <div className="form-group category-group">
                            {/* <label htmlFor="category-large">카테고리</label> */}
                            {/* 대분류 */}
                            {/* <select id="category-large" name="categoryLarge">
                                <option value="">대분류</option>
                            </select> */}
                            {/* 중분류*/}
                            {/* <select aria-label="카테고리 중분류" name="categoryMedium">
                                <option value="">중분류</option>
                            </select> */}
                            {/* 소분류 */}
                            {/* <select aria-label="카테고리 소분류" name="categorySmall">
                                <option value="">소분류</option>
                            </select> */}
                            <CategorySelect value={category} onChange={setCategory} />
                        </div>
                        <span>
                            {/* 4. 1차 지역 */}
                            {/* <span className="form-group">
                                <label htmlFor="region-primary">1차 지역</label>
                                <select id="region-primary" name="regionPrimary">
                                    <option value="">전체</option>
                                    <option value="seoul">서울</option>
                                    <option value="gyeonggi">경기도</option>
                                </select>
                            </span> */}
                            {/* 5. 2차 지역 */}
                            {/* `<span className="form-group">
                                <label htmlFor="region-secondary">2차 지역</label>
                                <select id="region-secondary" name="regionSecondary">
                                    <option value="">전체</option>
                                    <option value="gangnam">강남구</option>
                                    <option value="dongjak">동작구</option>
                                </select>
                            </span>` */}
                            <RegionSelect value={region} onChange={onRegionChange} />
                        </span>
                        {/* 6. 대표전화 */}
                        {/* <span className="form-group">
                            <label htmlFor="main-phone">대표전화</label>
                            <input type="text" id="main-phone" name="mainPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </span> */}
                        {/* 7. 주소명 */}
                        <span className="form-group">
                            <label htmlFor="address-keyword">주소명</label>
                            <input type="text" id="address-keyword" name="addressKeyword" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                        </span>
                        <br />
                        {/* 8. 플레이스명 */}
                        <span className="form-group">
                            <label htmlFor="place-name">플레이스명</label>
                            <input type="text" id="place-name" name="placeName" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </span>
                        {/* 9. 플레이스번호 */}
                        <span className="form-group">
                            <label htmlFor="place-number">플레이스 번호</label>
                            <input type="number" id="place-number" name="placeNumber" value={pNo} onChange={(e) => setPNo(e.target.value)} />
                        </span>
                        {/* 10. 검색 버튼*/}
                        <span className="form-actions">
                            <button type="button" className="searchBtn" onClick={onSearch}>검색</button>
                            <button type="button" className="btn line" onClick={onReset}>초기화</button>
                        </span>
                    </form>
                </div>
                {/* <!-- 조건검색창 끝 --> */}

                {/* <!-- 목록(리스트) 테이블 시작 --> */}
                <ul className="titleBox">
                    <li className="result">검색결과 : {totalElements}개</li>
                    <li className="btnBox">
                        <select
                            className="baseDateInput"
                            value={size}
                            onChange={(e) => { setSize(Number(e.target.value)); setPage(1); }}  // 페이지도 1로 리셋
                        >
                            <option value={10}>10개 보기</option>
                            <option value={30}>30개 보기</option>
                            <option value={50}>50개 보기</option>
                        </select>
                        <button type="button" className="btn line">엑셀 다운로드</button>
                    </li>
                </ul>
                <div className="tableWrap">
                    <ResizableTable 
                    columns={columns}
                    data={rows}
                    rememberKey="PlaceInfo.columns"
                    minColWidth={80}
                    stickyFirst={false}
                    sortable={true}
                    />
                    {/* <table>
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
                    */}
                </div>
                {/* <!-- 목록(리스트) 테이블 끝 --> */}
            </section>
            {/* <!-- [좌측] 검색/리스트 끝 --> */}
        </>
    );
}// PlaceList.jsx end