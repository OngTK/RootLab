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
import KakaoMap from "@/kakaomap/KakaoMap"; // 우측 플레이스 목록 영역

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
            </div>
            {/* <!--  02. LNB END  --> */}

            {/* <!--  03. CONTENTS START  --> */}
            <section className="rightContentsWrap">
                <div className="leftContents">
                    {/* <!--  카카오맵 지도 연동 시작  --> */}

                    {/* <!-- 카카오맵 API 연동 --> */}
                    <KakaoMap/>
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
            {/* <!--  05. 관광업체 상세정보 조회 모달(레이어) 시작  --> */}
            <div className="modalMarkerInfoLayer" id="modalMarkerInfoLayer">
                {/* <!-- 모달 박스 시작 --> */}
                <div className="modal_box">
                    {/* <!-- 콘텐츠 내용 시작 --> */}
                    <button className="modalClose fa fa-close" ></button>
                    <div className="modal_img_box">
                        <img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="타이틀" />
                        <div className="modalContentOutline">
                            <h3>동촌유원지</h3>
                            <div className="category">자연관광  체험관광동궁</div>
                        </div>
                    </div>
                    <div className="modalContent">
                        <p className="description">
                            동촌유원지는 대구시 동쪽 금호강변에 있는 44만 평의 유원지로 오래전부터 대구 시민이 즐겨 찾는 곳이다. 각종 위락시설이 잘 갖춰져 있으며, 드라이브를 즐길 수 있는 도로가 건설되어 있다. 수량이 많은 금호강에는 조교가 가설되어 있고, 우아한 다리 이름을 가진 아양교가 걸쳐 있다. 금호강(琴湖江)을 끼고 있어 예로부터 봄에는 그네뛰기, 봉숭아꽃 구경, 여름에는 수영과 보트 놀이, 가을에는 밤 줍기 등 즐길 거리가 많은 곳이다. 또한, 해맞이다리, 유선장, 체육시설, 실내 롤러스케이트장 등 다양한 즐길 거리가 있어 여행의 재미를 더해준다.
                        </p>
                        <h4>상세정보</h4>
                        <ul>
                            <li><b>주소</b>연중무휴</li>
                            <li><b>홈페이지</b><a href="#" target="_blank">//tour.daegu.go.kr</a></li>
                            <li><b>Tel.</b><a href="tel:010-1234-5678">010-1234-5678</a></li>
                            <li><b>주차</b>"가능 / 요금 (최초 2시간 무료 / 이후 30분 당 400원씩 추가 요금 발생)</li>
                            <li><b>휴무일</b>연중무휴</li>
                            <li><b>휴무일</b>연중무휴</li>
                        </ul>
                        <h4>사진이미지</h4>
                        <ul className="additionImgWrap">
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                        </ul>
                        <h4>부가정보</h4>
                        <ul>
                            <li><b>홈페이지</b><a href="#" target="_blank">//tour.daegu.go.kr</a></li>
                            <li><b>Tel.</b><a href="tel:010-1234-5678">010-1234-5678</a></li>
                            <li><b>주차</b>"가능 / 요금 (최초 2시간 무료 / 이후 30분 당 400원씩 추가 요금 발생)</li>
                            <li><b>휴무일</b>연중무휴</li>
                            <li><b>휴무일</b>연중무휴</li>
                        </ul>
                    </div>
                    {/* <!-- 콘텐츠 내용 끝 --> */}
                </div>
                {/* <!-- 모달 박스 끝 --> */}
            </div>
            {/* <!--  05. 관광업체 상세정보 조회 모달(레이어) 끝  --> */}
        </>
    );
}//LayoutSample.jsx end