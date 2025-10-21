/**
 * 관리자단 > 사이트 관리 > 푸시/팝업 관리 > 목록 섹션
 *
 * @author kimJS    
 * @since 2025.10.21
 * @version 0.1.0
 */
import ResizableTable from "@admin/components/common/ResizableTable";   // 리사이저블 테이블    
import "@assets/admin/css/resizableTable.css"; // resizableTable.css

export default function ListSection(props) {

    /** ========================= 관리자단 > 사이트관리 > 푸시/팝업관리(PushPopup) .jsx영역 ================================== */
    return (
        <>
            {/* <!-- R.검색/목록 시작 --> */}
            <section className="listWrap">
                {/* <!-- 상세 검색창 시작 --> */}
                <div className="detailSearch">
                    <form  method="get">
                        <label for="memberTypeInput"><b>사용구분</b>
                            <select className="memberTypeInput">
                                <option value="" selected>전체</option>
                                <option value="0">푸시알림+팝업</option>
                                <option value="1">푸시알림</option>
                                <option value="2">팝업</option>
                            </select>
                        </label>
                        <label for="memberTypeInput"><b>카테고리</b>
                            <select className="memberTypeInput">
                                <option value="" selected>전체</option>
                                <option value="1">공지</option>
                                <option value="2">이벤트</option>
                            </select>
                        </label>
                        <label for="subsStatusInput"><b>노출상태</b>
                            <select className="subsStatusInput">
                                <option value="" selected>전체</option>
                                <option value="1">진행전</option>
                                <option value="2">진행중</option>
                                <option value="3">진행완료</option>
                            </select>
                        </label>
                        <label for="nameInput"><b>제목</b><input className="nameInput" type="text"
                            placeholder="제목" /></label>
                        <button type="button" className="searchBtn">검색</button>
                    </form>
                </div>
                {/* <!-- 상세 검색창 끝 --> */}
                {/* <!-- 목록 테이블 시작 --> */}
                <ul className="titleBox">
                    <li className="result">검색결과 : 127명</li>
                    <li className="btnBox">
                        <select className="baseDateInput">
                            <option value="1" selected>10개 보기</option>
                            <option value="2">30개 보기</option>
                            <option value="">50개 보기</option>
                        </select>
                        <button type="button" className="btn line">엑셀 다운로드</button>
                    </li>
                </ul>
                <div className="tableWrap">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>사용구분</th>
                                <th>카테고리</th>
                                <th>제목</th>
                                <th>노출시작일</th>
                                <th>노출종료일</th>
                                <th>푸시알림시간</th>
                                <th>작성자</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="active">
                                <td>1</td>
                                <td>푸시알림+팝업</td>
                                <td>이벤트</td>
                                <td><b>송지호 해수욕장 페스티벌</b></td>
                                <td>2025-08-25</td>
                                <td>2025-09-05</td>
                                <td>12:00</td>
                                <td>작성자</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>팝업</td>
                                <td>이벤트</td>
                                <td><b>공방 스테이 박보검 사인회</b></td>
                                <td>2025-09-08</td>
                                <td>2025-09-21</td>
                                <td>16:00</td>
                                <td>작성자</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>푸시알림</td>
                                <td>공지</td>
                                <td><b>화암사 주자창 공사</b></td>
                                <td>2025-09-25</td>
                                <td>2025-10-13</td>
                                <td>12:00</td>
                                <td>작성자</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <!-- 목록 테이블 끝 --> */}
            </section>
            {/* <!-- R.검색/목록 끝 --> */}
        </>
    );
}//PushPopup.jsx end</>