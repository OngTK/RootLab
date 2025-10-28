/**
 * 관리자단 > 회원관리 > 회원현황(member) > 검색리스트단(ListSection.jsx) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.27
 * @version 0.1.1
 */
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "@admin/components/admin/place/Pagination";
import ResizableTable from "@admin/components/common/ResizableTable";

export default function ListSection(props) {
    const [mType, setMType] = useState("");
    const [mName, setMName] = useState("");
    const [mId, setMId] = useState("");
    const [mPhone, setMPhone] = useState("");
    const [rows, setRows] = useState([]);                   // 검색 결과 테이블 데이터
    const [size, setSize] = useState(10);                   // 페이지네이션 / 기본 10
    const [page, setPage] = useState(1);                    // 페이지네이션 붙일 때 업데이트 / 기본 1 
    const [totalElements, setTotalElements] = useState(0);

    // 스프링 서버로부터 데이터 요청 > 검색 실행 핸들러
    const onSearch = async (e) => {
        try {
            e?.preventDefault?.(); // 이벤트 객체 e가 존재할 때만 preventDefault() 를 실행하는 안전 호출(safe call) 문법
            const params = {
                mType: mType || null,
                mName: mName || null,
                mId: mId || null,
                mPhone: mPhone || null,
                size,
                page,
            };
            Object.keys(params).forEach((k) => params[k] == null && delete params[k]);

            const { data } = await axios.get("http://localhost:8080/member/search", { params });

            // 회원정보 데이터 담기
            const list = Array.isArray(data) ? data : [];
            const total = list.length;
            setTotalElements( total );
            // offset 정의 (1페이지=1 기준)
            const offset = ( page - 1 ) * size;
            const pageSlice = list.slice(offset, offset + size);
            // 회원유형 int = 문자열 매칭
            const typeLabelMap = { 0: "관리자", 1: "일반회원", 2: "사업자", 3: "단체/모임" };

            const rowsMapped = pageSlice.map((r, idx) => ({
                no: offset + idx + 1,
                mType: typeLabelMap[Number(r.mtype)] ?? "미지정",
                mName: r.mname,
                mNick: r.mnick,
                mId: r.mid,
                mid: r.mid, // onRowClick(row.mid) 때문에 추가
                mGender: r.mgender,
                mPhone: r.mphone,
                createdAt: r.createdAt,
                updatedAt: r.updatedAt,
            }));
            // console.log("rowsMapped:", rowsMapped); 
            setRows(rowsMapped);
        } catch (error) {
            console.error("[onSearch] 실패!");
        }
    };

    // 테이블 해더 컬럼명
    const columns = [
        { id: "no", title: "No", width: 20 },
        { id: "mType", title: "회원유형", width: 100 },
        { id: "mName", title: "회원명", width: 100 },
        { id: "mNick", title: "닉네임", width: 100 },
        { id: "mId", title: "회원ID", width: 100 },
        { id: "mGender", title: "성별", width: 80 },
        { id: "mPhone", title: "휴대전화", width: 120 },
        { id: "createdAt", title: "가입일", width: 100 },
        { id: "updatedAt", title: "최종로그인", width: 100 },
    ];

    // 페이지 변경/개수 변경 시
    const handlePageChange = (p) => setPage(p);
    const handleSizeChange = (s) => {
        setSize(s);
        setPage(1); // 사이즈 바꾸면 1페이지로
    };

    // useEffect로 페이지 전환 시 자동 재조회
    useEffect(() => { onSearch(); }, [page, size]);

    const handleRowClick = (mid) => {
        axios.get(`http://localhost:8080/member/basic?mId=${mid}`)
            .then(res => {
                setDetail(res.data);     // PlaceInfo 상세 전체 데이터 저장
                setSelectedPno(mid);     // 선택한 플레이스 번호 저장
            })
            .catch(err => console.error(err));
    };

    /** =========================================== 회원현황(member) > 검색리스트단 ListSection.jsx ====================================== */
    return (
        <>
            {/* <!-- [좌측] 검색/리스트 시작 --> */}
            <section className="listWrap">
                {/* <!-- 회원현황 조건검색창 시작 --> */}
                <div className="detailSearch">
                    <form aria-label="회원현황 조건검색">
                        {/* 1.회원유형 */}
                        <span className="form-group">
                            <label htmlFor="member_mType">회원유형</label>
                            <select id="member_mType" name="mType">
                                <option value="">전체</option>
                                <option value="1">일반회원</option>
                                <option value="2">사업자</option>
                                <option value="3">단체/모임</option>
                            </select>
                        </span>
                        {/* 2.회원명 */}
                        <span className="form-group">
                            <label htmlFor="member_mName">회원명</label>
                            <input type="text" id="member_mName" name="mName" />
                        </span>
                        {/* 3.회원ID */}
                        <span className="form-group">
                            <label htmlFor="member_mId">회원ID</label>
                            <input type="text" id="member_mId" name="mId" />
                        </span>
                        {/* 4.휴대전화 */}
                        <span className="form-group">
                            <label htmlFor="member_mPhone">휴대전화</label>
                            <input type="text" id="member_mPhone" name="mPhone" />
                        </span>
                        {/* 5.검색 버튼*/}
                        <span className="form-actions">
                            <button type="button" className="searchBtn" onClick={onSearch} >검색</button>
                            <button type="button" className="btn line" >검색조건 초기화</button>
                        </span>
                    </form>
                </div>
                {/* <!-- 관리자현황 조건검색창 끝 --> */}

                {/* <!-- 목록(리스트) 테이블 시작 --> */}
                <ul className="titleBox">
                    <li className="result">검색결과 : {totalElements}개</li>
                    <li className="btnBox">
                        <select className="baseDateInput"
                            value={size}
                            onChange={(e) => { setSize(Number(e.target.value)); setPage(1); }}  // 페이지도 1로 리셋
                        >
                            <option value={10}>10개 보기</option>
                            <option value={30}>30개 보기</option>
                            <option value={50}>50개 보기</option>
                        </select>
                        {/* <button type="button" className="btn line">엑셀 다운로드</button>*/}
                        {/* <button className="btn full" >레이어1</button> */}
                    </li>
                </ul>
                {/* === ResizableTable(리사이징/드래그  테이블) 시작 === */}
                <div className="tableWrap">
                    <ResizableTable
                        columns={columns}
                        data={rows}
                        rememberKey="Member.columns"
                        minColWidth={20}
                        stickyFirst={false}
                        sortable={true}
                        //rows={rows}
                        onRowClick={(row) => handleRowClick(row.mid)}
                    />
                </div>
                {/* === ResizableTable(리사이징/드래그  테이블) 끝 ===== */}
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
}// ListSection.jsx end