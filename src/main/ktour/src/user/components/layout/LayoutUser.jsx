/**
 * K-Tour > 사용자단(비회원) > 메인 > 공통레이아웃 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.0
 */

import Header from "@user/components/layout/Header";              // 해더 
import AsideLnb from "@user/components/layout/AsideLnb";          // 좌측메뉴(Lnb) 
import PopupBanner from "@user/pages/map/PopupBanner";            // 좌측하단 팝업배너
import RightMapPlace from "@user/pages/map/RightMapPlace";        // 중앙 지도/우측 플레이스 목록 
import Footer from "@user/components/layout/Footer";              // 푸터 
import LeftModalPlace from "@user/pages/map/LeftModalPlace";      // 좌측 모달 레이어(지도 마커 클릭시, 플레이스 상세정보)
import RightModalPlace from "@user/pages/map/RightModalPlace";    // 우측 모달 레이어(우측 플레이스 목록 클릭시, 플레이스 상세정보)


export default function LayoutUser() {
  return (
    <>
      <Header />
      <AsideLnb />
      <PopupBanner />
      <RightMapPlace />
      <Footer />
      <LeftModalPlace />
      <RightModalPlace />
    </>
  );
}//LayoutUser.jsx end