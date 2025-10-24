/**
 * 사용자단(비회원) > 공통레이아웃 > 헤더 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 * @version 0.1.2
 */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "@assets/user/css/header.css"; // 헤더 header.css
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header(props) {
    // =================== useState 선언부 ===================
    const [lDongRegnCd, SetLDongRegnCd] = useState([]);
    const [lDongSignguCd, SetLDongSigngu] = useState([]);
    const [selectedRegnCd, SetSelectedRegnCd] = useState("");
    const [selectedLdNo, SetSelectedLdNo] = useState("");

    // =================== useEffect - [] : 마운트될 때 1번만 실행 ===================
    useEffect(() => {
        getLDongRegnCdByAxios();        // 시도코드를 얻어오는 함수 실행
    }, []); // useEffect end
    // =================== LDongRegnCd Axios GET ===================
    const getLDongRegnCdByAxios = async () => {
        try {
            const option = { withCredentials: true };
            const response = await axios.get("http://localhost:8080/ldongcode/getregn", option);
            SetLDongRegnCd(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('getLDongCodeByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end
    // =================== LDongSignguCd Axios GET ===================
    const getLDongSignguCdByAxios = async () => {
        if (selectedRegnCd == "") return;
        try {
            const option = { withCredentials: true };
            const response = await axios.get(`http://localhost:8080/ldongcode/getsigngu?lDongRegnCd=${selectedRegnCd}`, option);
            SetLDongSigngu(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('getLDongSignguCdByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end
    // =================== useEffect - [selectedRegnCd] : 시군구 정보 가져오기 ===================
    useEffect(() => {
        getLDongSignguCdByAxios();
    }, [selectedRegnCd]);
    // =================== Select Markup Change ===================
    const changeRegnCd = (e) => {
        SetSelectedRegnCd(e.target.value);
        console.log(e.target.value);
    } // func end
    const changeLdNo = (e) => {
        SetSelectedLdNo(e.target.value);
        console.log(e.target.value);
    } // func end

    /** ========================= 사용자단(비회원) > 공통레이아웃 > 헤더(header).jsx영역 ================================== */
    return (
        <>
            <div className="headerWrap">
                <header>
                    <h1 className="logo">
                        <Link to="/">
                            K-TOUR
                            <span>인천광역시</span>
                        </Link>
                    </h1>
                </header>
                <div className="placeSearch">
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    <input type="text" placeholder="관광지/상호명 검색" autoFocus="" />
                </div>
                <div className="promotionText">우리동네 <b>AI추천</b> 모임장소</div>
                <div className="ldongSelect">
                    <select onChange={changeRegnCd} value={selectedRegnCd}>
                        <option value="" disabled> 시구 선택</option>
                        {
                            lDongRegnCd.map((regn) => {
                                return <option key={regn.ldongregncd} value={regn.ldongregncd}>
                                    {regn.ldongregnnm}
                                </option>
                            })
                        }
                    </select>
                    <select onChange={changeLdNo} value={selectedLdNo}>
                        <option value="" disabled> 시군구 선택</option>
                        {
                            lDongSignguCd.map((signgu) => {
                                return <option key={signgu.ldNo} value={signgu.ldNo}>
                                    {signgu.ldongsigngunm}
                                </option>
                            })
                        }
                    </select>
                </div>
            </div>
        </>
    );
}//Header.jsx end