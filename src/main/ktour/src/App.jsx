/**
 * 메인 App 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.17
 */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./admin/pages/member/Login";
import Header from "./user/components/layout/Header";
import AsideLnb from "./user/components/layout/AsideLnb";
import PageTitle from "./user/components/layout/PageTitle";
import Footer from "./user/components/layout/Footer";
import MainPlace from "./user/pages/map/MainPlace";

export default function App( props ){
    return<>
        <BrowserRouter>
            <h3> K-Tour </h3>
            <Header />
            <AsideLnb />
            <PageTitle />
            <Routes>
                <Route path="/" element={ <MainPlace /> } />
                <Route path="/admin/login" element={ <Login /> } />
                {/* <Route path="/" element={<Navigate to="/admin/login" replace />} />  [임시] 루트 경로('/') 처리 : / 경로로 접근하면 자동으로 로그인 페이지로 이동 */}
            </Routes>
            <Footer />
        </BrowserRouter>
    </>
}