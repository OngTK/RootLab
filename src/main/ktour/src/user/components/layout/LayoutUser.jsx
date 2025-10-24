/**
 * K-Tour > 사용자단 > 공통레이아웃 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.1
 */
import LayoutSample from "@user/components/layout/LayoutSample";        // 헤더

import PageTitle from "@user/components/layout/PageTitle";  // 페이지 타이틀 
import Footer from "@user/components/layout/Footer";        // 푸터 
import { Outlet } from "react-router-dom";                  // 중첩된 라우트 컴포넌트를 보여주기 위한 컴포넌트, 공통 레이아웃을 유지하면서 콘텐츠 영역만 자식 페이지로 변경
import { Suspense } from "react";                           // 코드 스플리팅(필요한 시점 비동기 로딩_Lazy Loading)
function Loading() { return <div style={{ padding: 12 }}>로딩 중…</div>; }   // 로딩중

export default function LayoutUser() {
  return (
    <>
      <LayoutSample/>
      <PageTitle />
      <main id="content" tabIndex={-1} role="main" aria-live="polite" class="">  
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}//LayoutUser.jsx end