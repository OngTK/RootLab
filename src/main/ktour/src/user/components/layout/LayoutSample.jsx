/**
 * 사용자단(비회원) > 메인(html) 샘플 페이지
 *
 * @author kimJS
 * @since 2025.10.23
 * @version 0.1.0
 */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faAngleRight, faMagnifyingGlass, faMapMarkedAlt, faThumbsUp, faLandmark, faMountainSun, faHiking, faShoppingBag, faUtensils, faBed, faMasksTheater, faMapLocationDot, faStreetView, faCircleChevronRight, faMusic, faDog, faPaw, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "@assets/user/css/LayoutSample.css";
import "@assets/user/css/modal.css"; // 헤더 header.css
import "@assets/user/css/layoutSample.css";


import PlaceGroups from "@user/pages/map/RightPlaceList"; // 우측 플레이스 목록 영역

import KakaoMap from "@/kakaomap/KakaoMapJS"; // 카카오맵 API 연동(안정훈 작업 //추후 해당 폴더 옮기기로 함)

export default function LayoutSample(props) {


    /** ========================= 사용자단(비회원) > 메인(html) 샘플페이지.jsx영역 ================================== */
    return (
        <>
         

            {/* <!--  03. CONTENTS START  --> */}
            <section className="rightContentsWrap">
                <div className="leftContents">
                    {/* <!--  카카오맵 지도 연동 시작  --> */}

                    {/* <!-- 카카오맵 API 연동 --> */}
                    <KakaoMap />
                    {/* <!--  카카오맵 지도 연동 끝  --> */}
                </div>
                {/* <!-- 03-1.우측 본문 영역 시작 --> */}
                <div className="rightContents">
                    <div className="pageTitle">
                        <h2><FontAwesomeIcon icon={faLocationDot} />인천광역시 부평구 부평1동</h2>
                        <ul className="cotentType">
                            <li className="active"><FontAwesomeIcon icon={faList} /><span>전체</span></li>
                            <li><FontAwesomeIcon icon={faMapMarkedAlt} /><span>관광</span></li>
                            <li><FontAwesomeIcon icon={faLandmark} /><span>전시</span></li>
                            <li><FontAwesomeIcon icon={faMountainSun} /><span>자연</span></li>
                            <li><FontAwesomeIcon icon={faHiking} /><span>레저</span></li>
                            <li><FontAwesomeIcon icon={faShoppingBag} /><span>쇼핑</span></li>
                            <li><FontAwesomeIcon icon={faUtensils} /><span>음식</span></li>
                            <li><FontAwesomeIcon icon={faMasksTheater} /><span>축제</span></li>
                            <li><FontAwesomeIcon icon={faBed} /><span>숙박</span></li>
                        </ul>
                    </div>
                    <div className="cardListWrap" id="mapInfoBox">

                        {/* <!-- 추천(조합) 모임카드 시작 --> */}
                        <PlaceGroups />
                        {/* <!-- 추천(조합) 모임카드 끝 --> */}

                    </div>
                </div>
                <a href="#" className="toTop"> 맨위로 </a>
                {/* <!-- 03-1.우측 본문 영역 끝 --> */}
            </section>

            

        </>
    );
}//LayoutSample.jsx end