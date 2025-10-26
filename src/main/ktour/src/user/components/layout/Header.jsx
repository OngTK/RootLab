/**
 * 사용자단(비회원) > 공통레이아웃 > 헤더 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 * @version 0.1.2
 */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMagnifyingGlass  } from "@fortawesome/free-solid-svg-icons";
import "@assets/user/css/header.css"; // 헤더 header.css

export default function Header(props) {

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
                <div className="promotionText">우리동네 <b>AI추천</b> 플레이스</div>
                <div className="ldongSelect">
                    <select>
                        <option value="28">인천광역시</option>
                        <option value="11">서울특별시</option>
                        <option value="">1차지역</option>
                    </select>
                    <select>
                        <option value="56">부평구</option>
                        <option value="53">연수구</option>
                        <option value="">2차지역</option>
                    </select>
                </div>
            </div>
        </>
    );
}//Header.jsx end