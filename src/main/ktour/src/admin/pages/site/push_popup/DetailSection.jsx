/**
 * 관리자단 > 사이트 관리 > 푸시/팝업관리 > 상세 섹션 컴포넌트
 *
 * @author  
 * @since 2025.10.21
 * @version 0.1.0
 */

import { useState } from "react";


export default function DetailSection(props) {

        // [1] 입력받은 데이터들을 관리하는 useState
        const [pNo, setpNo] = useState("");
        const [mgNo, setmgNo] = useState("");
        const [ppTitle, setppTitle] = useState("");
        const [ppContent, setppContent] = useState("");
        const [ppImg, setppImg] = useState("");
        const [ppUse, setppUse] = useState("");
        const [ppType, setppType] = useState("");
        const [ppStart, setppStart] = useState("");
        const [ppEnd, setppEnd] = useState("");
        const [ppIterated, setppIterated] = useState("");
    
        //[2]등록
    const pushadd = async() =>{
        try{
            const obj = {pNo, mgNo, ppTitle, ppContent, ppImg, ppUse, ppType, ppStart, ppEnd, ppIterated}
            console.log(obj)
            const option = {withCredentials : true}
            const response = await axios.post("http://localhost:8080/push/add", obj, option)
            const data = response.data
            console.log(data)
        }catch(e){console.log("[등록 실패]", e)}
    }

    /** =================== 관리자단 > 사이트관리 > 푸시/팝업관리(PushPopup) 상세 섹션 컴포넌트.jsx영역 ======================= */
    return (
        <>
            {/* <!-- CUD.등록/수정 시작 --> */}
            <section className="registWrap">
                {/* <!-- CUD.타이틀/버튼 시작 --> */}
                <div className="titleBox">
                    <ul className="tabtitle">
                        <li className="active">기본정보</li>
                    </ul>
                    <span className="btnBox">
                        <button onClick={pushadd} type="button" className="btn full" onclick="">저장</button>
                        <button type="button" className="btn line" onclick="">삭제</button>
                        <button type="button" className="btn line" onclick="">신규등록</button>
                    </span>
                </div>
                {/* <!-- CUD.타이틀/버튼 끝 --> */}
                {/* <!-- CUD.입/출력단 시작 --> */}
                <div className="formWrap">
                    <h2>송지호 해수욕장 페스티벌</h2>
                    <form action="#" method="post" id="userForm">
                        <fieldset>
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
                            </label><br />
                            <label for="subsStatusInput"><b>노출상태</b>
                                <select className="subsStatusInput">
                                    <option value="" selected>전체</option>
                                    <option value="1">진행전</option>
                                    <option value="2">진행중</option>
                                    <option value="3">진행완료</option>
                                </select>
                            </label><br />
                            <label for="emailInput"><b>노출시작일</b><input type="date" className="emailInput"
                                name="emailInput" required placeholder="이메일" /></label>
                            <label for="birthInput"><b>노출종료일</b><input type="date" className="birthInput"
                                name="birthInput" placeholder="생년월일 8자리" /></label>
                            <span><br />
                                <label for="genderMaleInput"><b>푸시알림시간</b>
                                    <input className="genderInput" type="time"/>
                                </label>
                            </span>
                            <br />
                            <label for="nameInput"><b>플레이스번호</b><button>검색</button><input className="nameInput" type="text"
                                placeholder="플레이스No" disabled />
                            </label>
                            <label for="nameInput"><b>플레이스명</b><input className="nameInput" type="text"
                                placeholder="불러온 플레이스 명을 노출" disabled /></label><button>정보보기</button>
                            <br />
                            <label for="nameInput"><b>제목</b><input className="nameInput" type="text"
                                placeholder="제목" /></label>
                            <br />
                            <label for="loginIdInput"><b>내용</b>
                                <textarea></textarea>
                            </label><br />
                            <label for="nameInput"><b>링크연결(url)</b><input className="nameInput" type="text"
                                placeholder="링크연결주소(url)" /></label><br />
                            <label for=""><b>팝업이미지</b><input className=""
                                type="file" /></label>
                            <div className="info_date">*이미지 사이즈: 800px(가로) * 600px(세로) 권장, 이미지 파일확장자 : jpg/png/gif </div>
                            <img src="원래 이미지 주소.jpg"
                                onerror="this.src='https://placehold.co/800x600/EEE/31343C';" stlye="width:100%" /><br />


                        </fieldset>
                    </form>
                    <label for="nameInput"><b>작성자</b><input className="nameInput" type="text" placeholder="로그인한 작성자 " disabled /></label>
                    <br />
                    <div className="info_date"><b>등록일:</b>2025-00-00 (00:00:00)<b>수정일:</b>2025-00-00 (00:00:00)</div>
                </div>
                {/* <!-- CUD.입/출력단 시작 --> */}
            </section>
            {/* <!-- CUD.등록/수정 끝 --> */}
        </>
    );
}//PushPopup.jsx end