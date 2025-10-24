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

import PopupBanner from "@user/pages/map/PopupBanner"; // 조하측 팝업배너
import PlaceGroups from "@user/pages/map/RightPlaceList"; // 우측 플레이스 목록 영역
import LeftModalPlace from "@user/pages/map/LeftModalPlace"; // 우측 플레이스 목록 영역
import KakaoMap from "@/kakaomap/KakaoMapJS"; // 카카오맵 API 연동(안정훈 작업 //추후 해당 폴더 옮기기로 함)

export default function LayoutSample(props) {


    /** ========================= 사용자단(비회원) > 메인(html) 샘플페이지.jsx영역 ================================== */
    return (
        <>
            {/* <!-- 01. HEADER START --> */}
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
            {/* <!-- 01. HEADER END --> */}

            {/* <!-- 02. LNB START  --> */}
            <div className="gnbWrap">
                <div className="gnb">
                    <ul>
                        <li className="active"><FontAwesomeIcon icon={faStreetView} />내 주변</li>
                        <li><FontAwesomeIcon icon={faThumbsUp} />추천지역장소</li>
                        <li><FontAwesomeIcon icon={faMasksTheater} />축제/행사/공연</li>
                        <li><FontAwesomeIcon icon={faDog} />반려동물</li>
                    </ul>
                </div>
                {/* <!-- 02-1. 좌측 고정 업종별 아이콘 메뉴 끝 --> */}

                {/* <!-- 02-2. 좌측 on/off 페이지 서브 메뉴 노출 시작 --> */}
                <div className="lnb">
                    <h2>
                        <FontAwesomeIcon icon={faStreetView} />내 주변
                        <div className="comment">주제별 다양한 장소를 확인하세요</div>
                    </h2>
                    {/* <!-- 02-2-2.페이지 컨텐츠 서브 메뉴 노출 시작 --> */}
                    <ul className="subMenuList" id="lnbMap">
                        <li data-code="53">
                            <Link to="#"><span>미추홀구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                        </li>
                        <li data-code="54">
                            <Link to="#"><span>연수구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                        </li>
                        <li data-code="55">
                            <Link to="#"><span>남동구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                        </li>
                        <li data-code="56">
                            <Link to="#" className="active"><span>부평구</span><FontAwesomeIcon icon={faCircleChevronRight} /></Link>
                        </li>
                        <li data-code="57">
                            <Link to="#"><span>계양구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                        </li>
                        <li data-code="58">
                            <Link to="#"><span>서구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                        </li>
                        <li data-code="59">
                            <Link to="#"><span>강화군</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                        </li>
                        <li data-code="60">
                            <Link to="#"><span>옹진군</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                        </li>
                    </ul>
                </div>
                {/* <!-- 02-2 좌측 on/off 페이지 서브 메뉴 노출 끝 --> */}
                {/* 좌측 하단 배너(팝업) 시작 */}
                <PopupBanner />
                {/* 좌측 하단 배너(팝업) 끝*/}
            </div>
            {/* <!--  02. LNB END  --> */}

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

            {/* <!--  03. CONTENTS END  --> */}
            <div className="footerWrap">
                <footer>
                    <p className="copyright">  © 2025 Root.Lab</p>
                </footer>
            </div>
            {/* <!--  04. FOOTER END  --> */}

            {/* 05. 지도 마커 클릭시, 플레이스 상세정보 조회 모달(레이어) 시작 */}
            <LeftModalPlace />
            {/* 05. 지도 마커 클릭시, 플레이스 상세정보 조회 모달(레이어) 끝 */}
        </>
    );
}//LayoutSample.jsx end