/**
 * K-Tour > 관리자단 > 라우터 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.1
 */
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// 로그인/사용자 메인
import Login from "@admin/pages/member/Login";          // 관리자 로그인
import MainPlace from "@user/pages/map/MainPlace";      // 사용자단 메인

// 관리자단 로그인 이 영역: 코드 스플리팅 (지연 로딩, 필요 시점에만 로드)
const LayoutAdmin = lazy(() => import("@admin/components/layout/LayoutAdmin"));
const PlaceInfo   = lazy(() => import("@admin/pages/map/PlaceInfo"));
const Manager     = lazy(() => import("@admin/pages/member/Manager"));
const SiteInfo    = lazy(() => import("@admin/pages/site/SiteInfo"));
const PushPopup   = lazy(() => import("@admin/pages/site/PushPopup"));
const NotFound    = lazy(() => import("@admin/pages/NotFound404"));

import "@assets/admin/css/reset.css"; 

export default function AdminRouter() {
  return (
    <Suspense fallback={<div>관리자 페이지 로딩 중...</div>}>
      <Routes>
        {/* 비관리자 라우트 */}
        <Route path="/" element={<MainPlace />} />
        <Route path="login" element={<Login />} />

        {/* 관리자 레이아웃이 필요한 라우트 그룹 */}
        <Route element={<LayoutAdmin />}>
          <Route path="map/place_info" element={<PlaceInfo />} />
          <Route path="member/manager" element={<Manager />} />
          <Route path="site/site_info" element={<SiteInfo />} />
          <Route path="site/push_popup" element={<PushPopup />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
// AdminRouter.jsx end