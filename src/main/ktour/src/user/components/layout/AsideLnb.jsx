/**
 * 사용자단(비회원) > 공통레이아웃 > 좌측메뉴 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 * @version 0.1.1
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMasksTheater, faMusic, faDog, faPaw,faLocationDot, faMap } from "@fortawesome/free-solid-svg-icons";
import '@assets/user/css/asideLnb.css' // 좌측메뉴 asideLnb.css

export default function AsideLnb( props ){

/** ========================= 사용자단(비회원) > 공통레이아웃 > 좌측메뉴(asideLnb) .jsx영역 ================================== */
    return<>
    {/* <!-- asideLnb START --> */}
    
    <div class="lnb_wrap">
        
        <div class="membership">
            <ul>
                <li class="active"><a href="#"><FontAwesomeIcon icon={faLocationDot} />내 주변</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faMasksTheater} />지역축제</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faDog} />반려동물</a></li>
            </ul>
        </div>
        {/* <!-- 02-1. 좌측 고정 업종별 아이콘 메뉴 끝 --> */}
        <hr class="skip"/>
        {/* <!-- 02-2. 좌측 on/off 페이지 서브 메뉴 노출 시작 --> */}
        <div class="lnb">
            <h2><div class="standard_cond">우리동네 숨겨진 핫플레이스 <br/>주제별 다양한 장소를 확인하세요</div></h2>
            {/* <!-- 02-2-2.페이지 컨텐츠 서브 메뉴 노출 시작 --> */}
            <ul class="sub_menu_list area" id="lnbMap">
                
            </ul>
        </div>
        {/* <!-- 02-2 좌측 on/off 페이지 서브 메뉴 노출 끝 --> */}
    </div>
    {/* <!-- asideLnb END --> */}
    </>
}//AsideLnb.jsx end