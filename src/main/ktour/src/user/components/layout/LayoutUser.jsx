/**
 * K-Tour > 사용자단(비회원) > 메인 > 공통레이아웃 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.1
 */

import Header from "@user/components/layout/Header";              // 해더 
import AsideLnb from "@user/components/layout/AsideLnb";          // 좌측메뉴(Lnb) 
import PopupBanner from "@user/pages/map/PopupBanner";            // 좌측하단 팝업배너

import Footer from "@user/components/layout/Footer";              // 푸터 
import { Outlet } from "react-router-dom";                        // 특정 라우트 그룹만 감싸는 중첩 레이아웃(Route nesting), 공통 레이아웃을 유지하면서 콘텐츠 영역만 자식 페이지로 변경
import { Suspense } from "react";                                 // 코드 스플리팅(필요한 시점 비동기 로딩_Lazy Loading)

export default function LayoutUser() {
    return (
        <>
            <Header />
            <AsideLnb />
            <PopupBanner />
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
            <Footer />
        </>
    );
}//LayoutUser.jsx end