/**
 * 관리자 > 공통레이아웃 > 페이지 타이틀/경로(pageTitle) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.16
 * @version 0.1.2
 */
import { Link, NavLink, useLocation } from "react-router-dom";
import { adminMenus } from "@admin/data/adminMenus";
import "@assets/admin/css/pageTitle.css"; // 페이지 타이틀 pageTitle.css
export default function PageTitle(props) {

    const { pathname } = useLocation();

    // 현재 URL에 해당하는 1차 메뉴 그룹 찾기
    const activeGroup = adminMenus.find(
        (group) =>
            group.path === pathname ||
            group.children.some((child) => child.path === pathname)
    );

    /** ========================= 관리자단 > 공통레이아웃 > 페이지 타이틀/경로(pageTitle) .jsx영역 ================================== */
    return <>
        {/* <!-- 페이지 타이틀 시작 --> */}
        <div className="pageTitle">
            <h1><span>{activeGroup ? activeGroup.title : "K-Tour"}</span></h1>
            <span className="path">
                <Link to="activeGroup.path">{activeGroup ? activeGroup.title : "K-Tour"}</Link>
                {
                    activeGroup.children.map((child) => {
                        return <NavLink to={child.path} className={({ isActive }) => (isActive ? "active" : "")} >
                            {child.label}
                        </NavLink>
                    })
                }
            </span>
        </div>
        {/* <!-- 페이지 타이틀 끝 --> */}
    </>
}//PageTitle.jsx end