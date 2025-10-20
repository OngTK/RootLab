/**
 * 관리자 > 공통레이아웃 > 페이지 타이틀/경로 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.16
 * @version 0.1.1
 */
import { Link, NavLink, useLocation } from "react-router-dom";
export default function PageTitle(props) {

    // const { pathname } = useLocation();

    // // 현재 URL에 해당하는 1차 메뉴 그룹 찾기
    // const activeGroup = adminMenus.find(
    //     (group) =>
    //         group.path === pathname ||
    //         group.children.some((child) => child.path === pathname)
    // );

/** ========================= 관리자단 > 공통레이아웃 > 페이지 타이틀/경로 .jsx영역 ================================== */

    return <>
        {/* <h2>페이지 타이틀</h2> */}
        {/* <!-- 페이지 타이틀 시작 --> */}
        {/* <div className="pageTitle">
            <h1><span>{activeGroup ? activeGroup.title : "K-Tour"}</span></h1>
            <span className="path">
                <Link to="activeGroup.path">{activeGroup ? activeGroup.title : "K-Tour"}</Link>
                
            </span>
        </div> */}
        {/* <!-- 페이지 타이틀 끝 --> */}
    </>
}//PageTitle.jsx end