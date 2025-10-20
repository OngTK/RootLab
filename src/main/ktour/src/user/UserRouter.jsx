/**
 * K-Tour > 사용자단 라우터 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.0
 */
import { Routes, Route } from "react-router-dom"; 
import MainPlace from "./pages/map/MainPlace";            // 메인(플레이스현황) 페이지
import NotFound from "./pages/NotFound404";               // 404 Not Found 페이지
import LayoutUser from "./components/layout/LayoutUser";  // 사용자단 공통레이아웃 컴포넌트

export default function UserRouter ( props ) {
  return (
    <LayoutUser>
      <Routes>
        <Route path="/" element={<MainPlace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayoutUser>   
  );
}//UserRouter end