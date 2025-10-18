/**
 * K-Tour > 관리자단 라우터 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.0
 */
import { Routes, Route } from "react-router-dom";
import Login from "./pages/member/Login";                     // 관리자로그인 페이지
import PlaceInfo from "./pages/map/PlaceInfo";                // 플레이스현황 페이지 
import Manager from "./pages/member/Manager";                 // 관리자현황 페이지
import SiteInfo from "./pages/site/SiteInfo";                 // 사이트정보 페이지
import PushPopup from "./pages/site/PushPopup";               // 푸시/팝업관리 페이지
import NotFound from "./pages/NotFound404";                   // 404 Not Found 페이지
import LayoutAdmin from "./components/layout/LayoutAdmin";    // 관리자단 공통레이아웃 컴포넌트
import MainPlace from "../user/pages/map/MainPlace";          // 사용자단 > 메인(플레이스현황) 페이지

export default function AdminRouter( props ) {
  return (
        <Routes>
          <Route path="login" element={<Login />} />     
          <Route path="/" element={<MainPlace />} />    
          {/* 관리자 레이아웃이 필요한 페이지 그룹 */}
          <Route element={<LayoutAdmin />}>  
            <Route path="map/place_info" element={<PlaceInfo />} /> 
            <Route path="member/manager" element={<Manager />} />    
            <Route path="site/site_info" element={<SiteInfo />} />  
            <Route path="push_popup" element={<PushPopup />} />      
          </Route>    
          <Route path="*" element={<NotFound />} />
        </Routes>
  );
}//AdminRouter.jsx end