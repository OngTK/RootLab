/**
 * 관리자단 > 사이트 관리 > 푸시/팝업관리 > 상세 섹션 컴포넌트
 *
 * @author juju9595
 * @since 2025.10.21
 * @version 0.1.0
 */

import { useState , useMemo, useEffect} from "react";


export default function DetailSection(props) {
        const { selected = null } = props;

        //[1] 입력받은 데이터들을 관리하는 useState
        const [ppNo, setppNo] = useState(null); // 존재하면 수정/삭제 모드
        const [pNo, setpNo] = useState("");
        const [mgNo, setmgNo] = useState("");
        const [ppTitle, setppTitle] = useState("");
        const [ppContent, setppContent] = useState("");
        const [ppImg, setppImg] = useState("");
        const [ppUse, setppUse] = useState("");
        const [ppType, setppType] = useState("");

        // date input 은 yyyy-MM-dd 이므로 백엔드가 datetime이면 전송 전에 보정
        const [ppStartDate, setppStartDate] = useState(""); // yyyy-MM-dd
        const [ppEndDate, setppEndDate] = useState("");     // yyyy-MM-dd
        const [ppIteratedDate, setppIteratedDate] = useState(""); //HH:mm

        //!! (두 개의 느낌표)는 Boolean 강제 변환 연산자 true/false
        const isEdit = useMemo(() => !!ppNo, [ppNo])

        // [1-1] 폼 초기화 함수 (세터 이름 정확히!)
        const resetForm = () => {
            setppNo(null);
            setpNo("");
            setmgNo("");
            setppTitle("");
            setppContent("");
            setppImg("");
            setppUse("");
            setppType("");
            setppStartDate("");
            setppEndDate("");
            setppIteratedDate("");
        };

        // [2] selected 바인딩
        useEffect(() => {
            if (!selected) {
            resetForm();
            return;
            }

            // 서버에서 온 값 바인딩 (세터/이름 정확히!)
            setppNo(selected.ppNo ?? null);
            setpNo(selected.pNo ?? "");
            setmgNo(selected.mgNo ?? "");
            setppTitle(selected.ppTitle ?? "");
            setppContent(selected.ppContent ?? "");
            setppImg(selected.ppImg ?? "");
            setppUse(selected.ppUse ?? "");
            setppType(selected.ppType ?? "");

            // 날짜: "yyyy-MM-dd"라면 앞 10자리만
            const toDateInput = (v) => (v ? String(v).substring(0, 10) : "");
            setppStartDate(toDateInput(selected.ppStart));
            setppEndDate(toDateInput(selected.ppEnd));

            // 시간(HH:mm)
            setppIteratedDate(selected.ppIterated ?? "");
        }, [selected]);




        //[3] 유틸
        const toDateTimeStart = (yyyyMMdd) => (yyyyMMdd ? `${yyyyMMdd} 00:00:00` : null);
        const toDateTimeEnd = (yyyyMMdd) => (yyyyMMdd ? `${yyyyMMdd} 23:59:59` : null);

        const buildpayload =() =>{
            const payload = {
                ...(ppNo ? {ppNo} : {}),
                pNo: pNo === "" ? null : Number(pNo),
                mgNo : mgNo || null,
                ppTitle : ppTitle || null,
                ppContent : ppContent || null,
                ppImg : ppImg || null,
                ppUse : ppUse || null,
                ppType : ppType || null,
                ppStart : toDateTimeStart(ppStartDate),
                ppEnd : toDateTimeEnd(ppEndDate),
                ppIterated : ppIteratedDate || null
            };

            return payload;
        };


        // ---------- [4] CUD 핸들러 ----------
    const save = async () => {
        try {
        const obj = buildPayload();
        const option = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };

        if (isEdit) {
            // 수정
            const res = await axios.put("http://localhost:8080/push/update", obj, option);
            console.log("[수정 결과]", res.data);
            onSaved?.(); // 목록 새로고침 등
            alert("수정되었습니다.");
        } else {
            // 등록
            const res = await axios.post("http://localhost:8080/push/add", obj, option);
            console.log("[등록 결과]", res.data);
            onSaved?.();
            // 서버가 생성된 pk(ppNo) 를 응답으로 주므로 폼에 바로 바인딩하고 수정 모드로 전환해도 됨
            if (typeof res.data === "number" && res.data > 0) setPpNo(res.data);
            alert("등록되었습니다.");
        }
        } catch (e) {
        console.error("[저장 실패]", e);
        alert("저장 중 오류가 발생했습니다.");
        }
    };

    const remove = async () => {
        if (!isEdit) {
        alert("삭제할 대상이 없습니다.");
        return;
        }
        if (!confirm("정말 삭제하시겠습니까?")) return;

        try {
        const option = { withCredentials: true };
        const res = await axios.delete("http://localhost:8080/push/delete", {
            ...option,
            params: { ppNo },
        });
        console.log("[삭제 결과]", res.data);
        if (res.data === true) {
            alert("삭제되었습니다.");
            resetForm();
            onDeleted?.();
        } else {
            alert("삭제에 실패했습니다.");
        }
        } catch (e) {
        console.error("[삭제 실패]", e);
        alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const makeNew = () => {
        resetForm();
    };

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
                        <button onClick={save} type="button" className="btn full" onclick="">저장</button>
                        <button onClick={remove} type="button" className="btn line" onclick="">삭제</button>
                        <button onClick={makeNew} type="button" className="btn line" onclick="">신규등록</button>
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
                            {/* <label for="subsStatusInput"><b>노출상태</b>
                                <select className="subsStatusInput">
                                    <option value="" selected>전체</option>
                                    <option value="1">진행전</option>
                                    <option value="2">진행중</option>
                                    <option value="3">진행완료</option>
                                </select>
                            </label><br /> */}
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