/**
 * 사용자단(비회원) > 공통레이아웃 > 헤더 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 * @version 0.1.1
 */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faLandmark, faMountain, faHiking, faShoppingBag, faUtensils, faBed } from "@fortawesome/free-solid-svg-icons";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Header(props) {
    return (
        <>
            <div className="header_wrap">
                <header>
                    <h1 className="logo"><Link to="/"> 인천광역시</Link> <span>놀러가자<i>!</i></span></h1>
                </header>
                <div className="page_search">
                    <input type="text" placeholder="검색 키워드/상호명 입력" autofocus="" id="keywordInput" />
                     <SearchIcon sx={{ fontSize: 28, color: "primary.main" }} />
                </div>
                <dl className="search_keword">
                    <dt><a href="#" onclick="sendCategory('전체')">우리동네 <b>AI추천</b> 모임아이템</a></dt>
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