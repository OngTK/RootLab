/**
 * K-Tour > 사용자단 > 공통레이아웃 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.0
 */
import Header from "./Header";              // 헤더 컴포넌트
import AsideLnb from "./AsideLnb";          // 사이드 네비게이션 컴포넌트
import PageTitle from "./PageTitle";        // 페이지 타이틀 컴포넌트
import Footer from "./Footer";              // 푸터 컴포넌트
import { Outlet } from "react-router-dom";  // 중첩된 라우트 컴포넌트를 보여주기 위한 컴포넌트, 공통 레이아웃을 유지하면서 콘텐츠 영역만 자식 페이지로 변경
export default function LayoutUser() {
  return (
    <>
      <Header />
      <AsideLnb />
      <PageTitle />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}//LayoutUser end