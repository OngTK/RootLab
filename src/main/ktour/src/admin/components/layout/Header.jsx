/**
 * 관리자 > 공통레이아웃 > 헤더 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.16
 * @version 0.1.0
 */
import { Link } from "react-router-dom";

export default function Header( props ){
    return<>
        <h3> 해더 </h3>
        <ul>
            <li> <Link to="/admin/map/place_info">플레이스현황</Link></li>
            <li> <Link to="/admin/member/manager">관리자현황</Link></li>
            <li> <Link to="/admin/site/site_info">사이트정보</Link></li>
            <li> <Link to="/admin/push_popup">푸시/팝업관리</Link></li>
            <li> <Link to="/admin/login">로그아웃</Link></li>
            <li> <Link to="/">홈페이지</Link></li>
        </ul>
    </>
}//Header.jsx end