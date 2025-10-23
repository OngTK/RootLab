/**
 * 사용자단(비회원) > 공통레이아웃 > 헤더 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 * @version 0.1.2
 */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faLandmark, faMountain, faHiking, faShoppingBag, faUtensils, faBed } from "@fortawesome/free-solid-svg-icons";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import  SearchIcon  from "@mui/icons-material/Search";
import SelectLdong from "@user/components/common/SelectLdong";
import "@assets/user/css/header.css"; // 헤더 header.css

export default function Header(props) {

/** ========================= 사용자단(비회원) > 공통레이아웃 > 헤더(header).jsx영역 ================================== */
    return (
        <>
            <div className="headerWrap">
                <header>
                    <h1 className="logo"><Link to="/"> 인천광역시</Link> <span>놀러가자<i>!</i></span></h1>
                </header>
                <div className="pageSearch">
                    <SearchIcon sx={{ fontSize: 28, color: "primary.main" }} />
                    <input type="text" placeholder="검색 키워드/상호명 입력" autoFocus="" id="keywordInput" />
                </div>
                <SelectLdong/><SelectLdong/>
                <dl className="searchKeword">
                    <dt><a href="#" >우리동네 <b>AI추천</b> 모임아이템</a></dt>
                    <dd>
                        <a href="#"><FontAwesomeIcon icon={faMapMarkedAlt} /> <span>관광</span></a>
                        <a href="#"><FontAwesomeIcon icon={faLandmark} /> <span>전시</span></a>
                        <a href="#"><FontAwesomeIcon icon={faMountain} /><span>자연</span></a>
                        <a href="#"><FontAwesomeIcon icon={faHiking} /> <span>레저</span></a>
                        <a href="#"><FontAwesomeIcon icon={faShoppingBag} /> <span>쇼핑</span></a>
                        <a href="#"><FontAwesomeIcon icon={faUtensils} /> <span>음식</span></a>
                        <a href="#"><FontAwesomeIcon icon={faBed} /><span>숙박</span></a>
                    </dd>
                </dl>
            </div>
        </>
    );
}//Header.jsx end