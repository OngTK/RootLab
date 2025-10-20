/**
 * K-Tour > App 메인 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.1
 */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserRouter from "@user/UserRouter";     // 사용자단 라우터
import AdminRouter from "@admin/AdminRouter";  // 관리자단 라우터

export default function App( props ){
    return<>
        <BrowserRouter>
           <Routes>
                <Route path="/*" element={<UserRouter />} />        {/* 사용자단(비회원) */}
                <Route path="/admin/*" element={<AdminRouter />} /> {/* 관리자단(본사) */}
            </Routes>
        </BrowserRouter>
    </>
}//App end
