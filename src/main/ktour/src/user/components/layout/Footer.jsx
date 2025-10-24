/**
 * 사용자단(비회원) > 공통레이아웃 > 푸터 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 * @version 0.1.0
 */
import { Link } from "react-router-dom";
export default function Footer(props) {
    return (
        <>
           <div className="footerWrap">
                <footer>
                    <p className="copyright" to="/admin/login">  © 2025 Root.Lab</p>
                </footer>
            </div>
        </>
    );
}//Footer.jsx end