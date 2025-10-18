/**
 * 사용자단(비회원) > 공통레이아웃 > 헤더 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 * @version 0.1.0
 */
import { Link } from "react-router-dom";

export default function Header( props ){
    return<>
        <h3> 해더 </h3>
        <ul>
            <li> <Link to="/">HOME</Link></li>
        </ul>
    </>
}//Header.jsx end