/**
 * 사용자단(비회원) > 공통레이아웃 > 좌측메뉴 컴포넌트
 *
 * @author 
 * @since 2025.10.17
 * @version 0.1.1
 */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faThumbsUp, faMusic, faMasksTheater,faStreetView, faCircleChevronRight, faDog  } from "@fortawesome/free-solid-svg-icons";

import '@assets/user/css/asideLnb.css' // 좌측메뉴 asideLnb.css

export default function AsideLnb(props) {

    /** ========================= 사용자단(비회원) > 공통레이아웃 > 좌측메뉴(asideLnb) .jsx영역 ================================== */
    return <>
        <div className="gnbWrap">
            <div className="gnb">
                <ul>
                    <li className="active"><FontAwesomeIcon icon={faStreetView} />내 주변</li>
                    <li><FontAwesomeIcon icon={faThumbsUp} />추천지역장소</li>
                    <li><FontAwesomeIcon icon={faMusic} />축제/행사/공연</li>
                    <li><FontAwesomeIcon icon={faDog} />반려동물동반</li>
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
    </>
}//AsideLnb.jsx end