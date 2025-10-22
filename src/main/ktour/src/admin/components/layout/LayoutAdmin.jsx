/**
 * K-Tour > 관리자단 > 공통레이아웃(LayoutAdmin) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.3
 */
import Header from "@admin/components/layout/Header";        // 헤더 컴포넌트
import AsideLnb from "@admin/components/layout/AsideLnb";    // 사이드 네비게이션 컴포넌트
import PageTitle from "@admin/components/layout/PageTitle";  // 페이지 타이틀 컴포넌트
import Footer from "@admin/components/layout/Footer";        // 푸터 컴포넌트
import { Outlet } from "react-router-dom";                   // 특정 라우트 그룹만 감싸는 중첩 레이아웃(Route nesting), 공통 레이아웃을 유지하면서 콘텐츠 영역만 자식 페이지로 변경
import { Suspense } from "react";                            // 코드 스플리팅(필요한 시점 비동기 로딩_Lazy Loading)
import "@assets/admin/css/common.css";                       // 관리자 > 공통 common.CSS
import "@assets/admin/css/contents.css";                     // 관리자 > 본문 콘텐츠 contents.CSS

function Loading() { return <div style={{ padding: 12 }}>로딩 중…</div>; }    // 로딩중

export default function LayoutAdmin({ }) {

  /** ========================= 관리자단 > 공통레이아웃(LayoutAdmin) .jsx영역 ================================== */
  return (
    <>
      <div className="admin-scope"> {/* SPA는 한 번 로드된 전역 CSS가 계속 유지돼 로그인 등 다른 화면에도 적용되므로, 스타일 오염을 막기 위해 관리자 전용 CSS 스코프 처리*/}
        <Header />
        <AsideLnb />
        <main className="contentsWrap">
          <PageTitle />
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}//LayoutAdmin end