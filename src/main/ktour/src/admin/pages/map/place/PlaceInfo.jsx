/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) 페이지 컴포넌트
 *
 * @author 
 * @since 2025.10.19
 * @version 0.1.3
 */
import SplitPaneResponsive from "@admin/components/common/SplitPaneResponsive"; // 반응형 스플리터
import ListSection from "@admin/pages/map/place/ListSection.jsx";               // 좌측: 목록
import DetailSection from "@admin/pages/map/place/DetailSection.jsx";           // 우측: 상세(CRUD)

export default function PlaceInfo() {

/** ========================= 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) .jsx영역 ================================== */
  return (
    <>
    <SplitPaneResponsive
      initLeftPct={50}              // 초기 좌측 폭(%)
      minLeftPx={240}               // 좌측 최소(px)
      minRightPx={320}              // 우측 최소(px)
      left={<ListSection />}        // 좌측 콘텐츠
      right={<DetailSection />}     // 우측 콘텐츠
    />
    </>
  );
}//PlaceInfo.jsx end