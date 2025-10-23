/**
 * K-Tour > App > 메인 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.2
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";    // 라우터(URL 경로) 
import { lazy, Suspense } from "react";                             // 코드 스플리팅(필요한 시점 비동기 로딩_Lazy Loading)
import "@assets/admin/css/reset.css";                               // 전역 리셋 CSS적용

const UserRouter = lazy(() => import("@user/UserRouter"));          // 사용자단 라우터
const AdminRouter = lazy(() => import("@admin/AdminRouter"));       // 관리자단 라우터
const KakaoMap = lazy(() => import("./kakaomap/KakaoMap"));         // 카카오맵 API 테스트용 페이지

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={null}>
                <Routes>
                    <Route path="/*" element={<UserRouter />} />        {/* 사용자단(비회원) */}
                    <Route path="/admin/*" element={<AdminRouter />} /> {/* 관리자단(본사) */}
                    <Route path="/kakaomap/*" element={<KakaoMap />} /> {/* 사용자단(카카오맵 API 테스트용) */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}//App.jsx end