/**
 * 사용자단(비회원) > 공통레이아웃 > 푸터 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 */
import { Link } from "react-router-dom";
export default function Footer( props ){
    return<>
        <h3> 푸터 </h3>
        <ul>
            <li> <Link to="/admin/login">관리자로그인</Link></li>
        </ul>
    </>
}