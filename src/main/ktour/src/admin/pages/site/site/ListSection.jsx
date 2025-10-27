/**
 * 관리자단 > 사이트관리 > 사이트정보(site) > 검색리스트단(ListSection.jsx) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.27
 * @version 0.1.0
 */

import ResizableTable from "@admin/components/common/ResizableTable";

export default function ListSection(props) {

    const columns = [
        { id: "no", title: "No", width: 70 },
        { id: "siName", title: "사이트명", width: 150 },
        { id: "siDomain", title: "도메인(URL)", width: 220 },
        { id: "siTel", title: "대표전화", width: 120 },
        { id: "siEmail", title: "대표이메일", width: 140 },
        { id: "siIsPublic", title: "사이트공개여부", width: 100 },
        { id: "createdAt", title: "등록일", width: 120 },
        { id: "updatedAt", title: "수정일", width: 120 },
    ];

  const data = [
    { no: 1, siName: "K-Tour", siDomain: "rootlab.kr", siTel: "02-1234-5678", siEmail: "contact@rootlab.kr", siIsPublic: "공개", createdAt: "2025-10-27", updatedAt: "2025-10-27" }
];


    /** =========================================== 사이트정보(site) > 검색리스트단 ListSection.jsx ====================================== */
    return (
        <>
            {/* <!-- [좌측] 검색/리스트 시작 --> */}
            <section className="listWrap">
                {/* <!-- 사이트정보 조건검색창 시작 --> */}
                <div className="detailSearch">
                    <form aria-label="사이트정보 조건검색">
                        {/* 1.사이트 공개여부(0: 비공개/ 1: 공개 ) */}
                        <span className="form-group">
                            <label htmlFor="siIsPublic ">공개여부</label>
                            <select id="siIsPublic " name="siIsPublic ">
                                <option value="">전체</option>
                                <option value="1">시스템관리자</option>
                                <option value="2">업체관리자</option>
                            </select>
                        </span>
                        {/* 2.도메인(URL) */}
                        <span className="form-group">
                            <label htmlFor="siDomain">도메인(URL)</label>
                            <input type="text" id="siDomain" name="siDomain" />
                        </span>
                        {/* 3.사이트명 */}
                        <span className="form-group">
                            <label htmlFor="siName ">관리자ID</label>
                            <input type="text" id="siName " name="siName " />
                        </span>
                        {/* 4.검색 버튼*/}
                        <span className="form-actions">
                            <button type="button" className="searchBtn">검색</button>
                            <button type="button" className="btn line">검색조건 초기화</button>
                        </span>
                    </form>
                </div>
                {/* <!-- 사이트정보 조건검색창 끝 --> */}

                {/* <!-- 목록(리스트) 테이블 시작 --> */}
                <ul className="titleBox">
                    <li className="result">검색결과 : @@개</li>
                    <li className="btnBox">
                        <select className="baseDateInput">
                            <option value="10">10개 보기</option>
                            <option value="30">30개 보기</option>
                            <option value="50">50개 보기</option>
                        </select>
                        {/* <button type="button" className="btn line">엑셀 다운로드</button>*/}
                        {/* <button className="btn full" >레이어1</button> */}
                    </li>
                </ul>
                {/* === ResizableTable(리사이징/드래그  테이블) 시작 === */}
                <div className="tableWrap">
                    <ResizableTable
                        columns={columns}
                        data={data}
                        rememberKey="SiteInfo.columns"
                        minColWidth={80}
                        stickyFirst={false}
                        sortable={true}
                    />
                </div>
                {/* === ResizableTable(리사이징/드래그  테이블) 끝 ===== */}
            </section>
            {/* <!-- [좌측] 검색/리스트 끝 --> */}
            
           
        </>
    );
}// ListSection.jsx end