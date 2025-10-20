/**
 * 관리자단 > 공통레이아웃 > 헤더 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.16
 * @version 0.1.1
 */
import { Link, NavLink, useLocation } from "react-router-dom";
import { adminMenus } from "@admin/data/adminMenus";
import "@assets/admin/css/header.css"; // 헤더 header.css

export default function Header() {
    const { pathname } = useLocation();

    // 경로 일치 또는 하위경로 포함 체크
    const isMatch = (base, path) => base === path || path.startsWith(base + "/");

    return (
        <header>
            {/* 1. 좌측 로고 */}
            <div className="logoHeader">
                <span className="menuIcon" aria-label="전체메뉴">
                    <svg viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" data-seed-icon="true">
                        <g>
                            <path d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4C22 4.55228 21.5523 5 21 5H3C2.44772 5 2 4.55228 2 4Z"></path>
                            <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"></path>
                            <path d="M3 19C2.44772 19 2 19.4477 2 20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20C22 19.4477 21.5523 19 21 19H3Z"></path>
                        </g>
                    </svg>
                </span>
                <Link to="/admin/map/place_info" className="logo">
                    <strong>K-Tour</strong> <span>테마형 관광지도 플랫폼</span>
                </Link>
            </div>

            {/* 2. 중앙 GNB */}
            <div className="gnb">
                {/* 2.1. 플레이스 통합검색창 */}
                <div className="headerSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                        <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" />
                        <path d="M20.9992 21L14.9492 14.95" />
                    </svg>
                    <input type="text" name="search" placeholder="플레이스 검색" aria-label="플레이스 검색"/>
                    <button type="button">검색 </button>
                </div>

                {/* 2.2. GNB 메뉴 */}
                <nav>
                    <ul className="menu1Depth">
                        {adminMenus.map((menu) => {
                            // 대메뉴 active: 자신 path 또는 하위 path 매칭
                            const isActive = isMatch(menu.path, pathname) || menu.children.some((child) =>
                                    isMatch(child.path, pathname)
                            );
                            return (
                                <li key={menu.title} className={isActive ? "active" : ""}>
                                    <NavLink to={menu.path}>{menu.title}</NavLink>
                                    <ul className="menu2Depth">
                                        {menu.children.map((submenu) => (
                                            <li key={submenu.path} > {/* NavLink 전용 콜백 문법 */}
                                                <NavLink to={submenu.path} className={({ isActive }) => isActive ? "active" : ""}>{submenu.label}</NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ); //return end
                        })} {/*//map end */}
                    </ul>
                </nav>

                {/* 3. 우측 관리자 정보 */}
                <ul className="memberMenu">
                    <li>
                        <Link to="/admin/member/manager"><b>김진숙</b> <span>(admin)</span></Link>
                    </li>
                    <li>
                        <Link to="/admin/login">로그아웃</Link>
                    </li>
                    <li>
                        <Link to="/" className="btn" target="_blank" rel="noopener noreferrer">홈페이지 </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}//Header.jsx end