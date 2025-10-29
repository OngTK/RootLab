/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 좌측]플레이스 목록(PlaceList) 컴포넌트
 *
 * @author
 * @since 2025.10.20
 * @version 0.1.2
 */
import ResizableTable from "../../../components/admin/place/ResizableTableAtplace";
import "@assets/admin/css/resizableTable.css"; // resizableTable.css
import CategorySelect from "../../../components/admin/place/CategorySelect";
import RegionSelect from "../../../components/admin/place/RegionSelect";
import Pagination from "../../../components/admin/place/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListSection(props) {

    const [category, setCategory] = useState({ ccNo: null, l1Cd: null, l2Cd: null, l3Cd: null, l1Nm: null, l2Nm: null, l3Nm: null });
    const [region, setRegion] = useState({ ldNo: null, regnCd: null, signguCd: null, regnNm: null, signguNm: null });
    const [ctNo, setCtNo] = useState("");      // 콘텐츠 타입 value
    const [showVal, setShowVal] = useState("1");      // 기본값: 노출(1)
    const [title, setTitle] = useState("");      // 플레이스명
    const [phone, setPhone] = useState("");      // 대표전화(선택)
    const [pNo, setPNo] = useState("");      // 플레이스 번호
    const [addressInput, setAddressInput] = useState(""); // 주소명(직접 입력란)
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    const onRegionChange = (v) => {
        setRegion(v);
    };

    const ccName = category.l3Nm || category.l2Nm || category.l1Nm || null;
    const address = addressInput?.trim() || null;
    const ldName = region.regnNm && region.signguNm
        ? `${region.regnNm} ${region.signguNm}` // 1차+2차
        : region.regnNm || null;                // 1차만 선택 시

    // 검색 실행 핸들러
    const onSearch = async (e) => {
        const params = {
            // 아래 네이밍은 기존 state와 서버 파라미터 규칙에 맞춰 넣으세요.
            title: title?.trim() || null,
            address: (region.regnNm && region.signguNm)
                ? `${region.regnNm} ${region.signguNm}`
                : (addressInput?.trim() || null),
            ccName: category.l3Nm || category.l2Nm || category.l1Nm || null,
            ctNo: ctNo || null,
            showflag: showVal === "" ? null : Number(showVal),
            pNo: pNo || null,
            page, size,
        };
        Object.keys(params).forEach(k => (params[k] === null || params[k] === '') && delete params[k]);

        try {
            // 서버 응답: { content: [...], totalElements: 62591, size: 10, currentPage: 1, ... }
            const { data } = await axios.get("http://localhost:8080/placeinfo/search", { params });
            // No 컬럼을 위해 각 행에 순번을 부여합니다.
            const __size = Number(data?.size ?? size);
            const __page = Number(data?.currentPage ?? page);
            const __offset = (__page - 1) * __size;
            const __content = Array.isArray(data?.content) ? data.content : [];
            const __mapped = __content.map((r, i) => ({ ...r, no: __offset + i + 1 }));
            setRows(__mapped);
            setTotalElements(data?.totalElements ?? 0);
            // 서버가 현재 page/size를 되돌려 주면 동기화
            if (data?.size) setSize(data.size);
            if (data?.currentPage) setPage(data.currentPage);
        } catch (e) {
            console.error(e);
        }
    };

    // 페이지/사이즈 상태가 있다면 함께 포함하세요(예: page, size)
    useEffect(() => {
        const params = {
            title: title?.trim() || null,
            address: ldName || (addressInput?.trim() || null),
            ccName,
            ctNo: ctNo || null,
            showflag: showVal === "" ? null : Number(showVal),
            pNo: pNo || null,

        };
        // 불필요한 빈 값은 빼주면 깔끔합니다
        Object.keys(params).forEach(k => (params[k] === null || params[k] === '') && delete params[k]);

        // 조건 배열은 실제로 사용하는 상태만 추가
    }, [title, addressInput, ldName, ccName, ctNo, showVal, pNo]);

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

    const handleRowClick = (row) => {
        props?.onPick?.(row);
    };

    // 엔터키 반응 함수
    const activeEnter = (e) => {
        if (e.key === "Enter") onSearch();
    } // func end

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
                            <CategorySelect value={category} onChange={setCategory} />
                        </div>
                        <span>

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
                            <input type="text" id="address-keyword" name="addressKeyword" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} onKeyDown={(e) => activeEnter(e)} />
                        </span>
                        <br />
                        {/* 8. 플레이스명 */}
                        <span className="form-group">
                            <label htmlFor="place-name">플레이스명</label>
                            <input type="text" id="place-name" name="placeName" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => activeEnter(e)} />
                        </span>
                        {/* 9. 플레이스번호 */}
                        <span className="form-group">
                            <label htmlFor="place-number">플레이스 번호</label>
                            <input type="number" id="place-number" name="placeNumber" value={pNo} onChange={(e) => setPNo(e.target.value)} onKeyDown={(e) => activeEnter(e)} />
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
                        onRowClick={(row) => props?.onPick?.(row)} // 부모(PlaceInfo)로 row 전달
                    />
                </div>
                {/* <!-- 목록(리스트) 테이블 끝 --> */}
                <Pagination
                    currentPage={page}
                    size={size}
                    totalElements={totalElements}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                />
            </section>
            {/* <!-- [좌측] 검색/리스트 끝 --> */}
        </>
    );
}// PlaceList.jsx end
