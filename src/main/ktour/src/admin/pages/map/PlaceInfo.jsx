/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) 페이지 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.3
 */

import PlaceList from "@admin/pages/map/PlaceList.jsx";   // 좌측: 목록
import PlaceView from "@admin/pages/map/PlaceView.jsx";   // 우측: 상세/CRUD(Create Read Update Delete)
import SplitPaneResponsive from "@admin/components/common/SplitPaneResponsive"; // 반응형 스플리터
// import "@assets/admin/css/SplitPaneResponsive.css";

export default function PlaceInfo() {
  return (
    <SplitPaneResponsive
      initLeftPct={50}    // 초기 좌측 폭(%)
      minLeftPx={240}     // 좌측 최소(px = pixel)
      minRightPx={320}    // 우측 최소(px)
      left={<PlaceList />}     // 좌측 콘텐츠(JSX: JavaScript XML)
      right={<PlaceView />}    // 우측 콘텐츠
    />
  );
}
