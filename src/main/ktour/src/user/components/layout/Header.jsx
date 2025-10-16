import { Link } from "react-router-dom";

export default function Header( props ){
    return<>
        <h3> 관리자 해더 </h3>
        <ul>
            <li> <Link to="/admin/member/login"></Link></li>
        </ul>
    </>
}