/**
 * 관리자 > 공통레이아웃 > 헤더 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.16
 */
import { Link } from "react-router-dom";

export default function Header( props ){
    return<>
        <h3> 해더 </h3>
        <ul>
            <li> <Link to="/admin/login">관리자페이지 바로가기</Link></li>
        </ul>
    </>
}