/**
 * 관리자단 > 사이트 관리 > 푸시/팝업 관리 > 목록 섹션
 *
 * @author 
 * @since 2025.10.21
 * @version 0.1.1
 */
import ResizableTable from "@admin/components/common/ResizableTable";   // 리사이저블 테이블    
import "@assets/admin/css/resizableTable.css"; // resizableTable.css
import { useState } from "react";
import axios from "axios";

export default function ListSection(props) {

    // [1] 검색 조건
    const [pNo, setPno] = useState("");
    const [ppUse, setppUse] = useState("");
    const [ppType, setppType] = useState("");
    const [ppTitle, setppTitle] = useState("");
    const [status, setstatus] = useState("");
    const [pushList, setpushList] = useState([]); // 결과값 저장


    //[1]검색
    const pushsearch = async() => {
        try{
            const obj = {pNo, ppUse, ppType, ppTitle, status}
            console.log(obj)
            const option = {withCredentials : true}
            const response = await axios.get(`http://localhost:8080/push/search?pNo=20543&ppUse=1&ppType=1&ppTitle=송지호&status=%EC%A7%84%ED%96%89%EC%99%84%EB%A3%8C`, option);
            console.log("[검색 결과]", response.data)
            setpushList(response.data);// 결과 테이블에 바인딩 가능
        }catch(e){console.log("[검색 오류]", e)}
    }

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
                                <option value={ppUse} selected>전체</option>
                                <option value="0">푸시알림+팝업</option>
                                <option value="1">푸시알림</option>
                                <option value="2">팝업</option>
                            </select>
                        </label>
                        <label for="memberTypeInput"><b>카테고리</b>
                            <select className="memberTypeInput">
                                <option value={ppType} selected>전체</option>
                                <option value="1">공지</option>
                                <option value="2">이벤트</option>
                            </select>
                        </label>
                        <label for="subsStatusInput"><b>노출상태</b>
                            <select className="subsStatusInput">
                                <option value={status} selected>전체</option>
                                <option value="1">진행전</option>
                                <option value="2">진행중</option>
                                <option value="3">진행완료</option>
                            </select>
                        </label>
                        <label for="nameInput"><b>제목</b><input value={ppTitle} onChange={(e) =>{setppTitle(e.target.value);}} className="nameInput" type="text" 
                            placeholder="제목" /></label>
                        <button onClick={pushsearch} type="button" className="searchBtn">검색</button>
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
                            {pushList.map((p)=>{
                            return <tr key={p.ppNo} className="active">
                                <td>{p.ppNo}</td>
                                <td>{p.ppUse}</td>
                                <td>{p.ppType}</td>
                                <td><b>{p.ppTitle}</b></td>
                                <td>{p.ppStart}</td>
                                <td>{p.ppEnd}</td>
                                <td>{p.ppIterated}</td>
                                <td>{p.mgNo}</td>
                            </tr>})}
                        </tbody>
                    </table>
                </div>
                {/* <!-- 목록 테이블 끝 --> */}
            </section>
            {/* <!-- R.검색/목록 끝 --> */}
        </>
    );
}//PushPopup.jsx end</>