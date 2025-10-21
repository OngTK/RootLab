/**
 * 관리자 > 공통레이아웃 > 페이지 타이틀/경로 컴포넌트
 * ----------------------------------------------------
 * - 현재 URL 기준으로 활성 메뉴/서브메뉴를 찾아 타이틀과 경로 표시
 * - 페이지 타이틀: 활성 서브(label) > 그룹(title) > 기본값(K-Tour)
 * - 경로(path): 그룹 > 서브 구조로 표시
 * @author kimJS
 * @since 2025.10.16
 * @version 0.1.2
 */

import { Link, useLocation } from "react-router-dom";
import { adminMenus } from "@admin/data/adminMenus";
import "@assets/admin/css/pageTitle.css";

export default function PageTitle() {

    const { pathname } = useLocation(); // 1. 현재 브라우저 주소 가져오기
    const group = adminMenus.find(      // 2. 현재 URL과 일치하는 그룹 찾기
        (g) =>
            g.path === pathname ||
            g.children?.some((c) => c.path === pathname)
    );
    const child = group?.children?.find((c) => c.path === pathname);   // 3. 그룹 내에서 현재 활성화된 서브메뉴 찾기
    const pageTitle = child?.label || group?.title || "K-Tour";         // 4. 페이지 타이틀 결정: 서브 > 그룹 > 기본

/** ====================== 관리자 > 공통레이아웃 > 페이지 타이틀/경로 .jsx영역 =========================== */
    return (
        <div className="pageTitle">
            <h1>{pageTitle}</h1> {/* 페이지 타이틀 표시 */}
            <div className="path"> {/* 경로(Breadcrumb) 표시 */}
                {/* 상위 그룹 경로 */}
                <Link to={group?.path || "/admin"}>{group?.title || "K-Tour"}</Link>
                {/* 서브 메뉴가 존재할 경우만 표시 */}
                {child && (
                    <>
                        <Link to={child.path} className="active">
                            {child.label}
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}// PageTitle.jsx end