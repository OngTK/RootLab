/**
 * 메인 App 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.16
 */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./admin/components/layout/Header";
import AsideLnb from "./admin/components/layout/AsideLnb";
import PageTitle from "./admin/components/layout/PageTitle";
import Footer from "./admin/components/layout/Footer";
import Login from "./admin/pages/member/Login";

export default function App( props ){
    return<>
        <BrowserRouter>
            <h3> K-Tour </h3>
            <Header />
            <AsideLnb />
            <PageTitle />
            <Routes>
                <Route path="/admin/login" element={ <Login /> } />
                {/* [임시] 루트 경로('/') 처리 : / 경로로 접근하면 자동으로 로그인 페이지로 이동 */}
                <Route path="/" element={<Navigate to="/admin/login" replace />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </>
}