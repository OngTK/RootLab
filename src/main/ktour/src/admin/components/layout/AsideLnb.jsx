/**
 * 관리자단 > 공통레이아웃 > 좌측메뉴(asideLnb) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.16
 * @version 0.1.2
 */
import { NavLink, useLocation } from "react-router-dom";
import { adminMenus } from "@admin/data/adminMenus";
import '@assets/admin/css/asideLnb.css' // 좌측메뉴 asideLnb.css
export default function AsideLnb(props) {
  const { pathname } = useLocation();

  // 현재 URL에 해당하는 1차 메뉴 그룹 찾기
  const activeGroup = adminMenus.find(
    (group) =>
      group.path === pathname ||
      group.children.some((child) => child.path === pathname)
  );

  /** ========================= 관리자단 > 공통레이아웃 > 좌측메뉴(asideLnb) .jsx영역 ================================== */
  return (
    <>
      <aside className="lnb">
        {/* 1차 메뉴명 (Header active 메뉴명 복사) */}
        <h2>{activeGroup ? activeGroup.title : "메뉴 선택"}</h2>

        {/* 서브메뉴(2depth) - 현재 활성화된 1depth의 children만 출력 */}
        {activeGroup && activeGroup.children && (
          <ul>
            {
              activeGroup.children.map((child) => {
                return <li key={child.path}>
                  <NavLink to={child.path} className={({ isActive }) => (isActive ? "active" : "")} >
                    {child.label}
                  </NavLink>
                </li>
              })
            }
          </ul>
        )}
      </aside>
    </>
  );
}
//AsideLnb.jsx end