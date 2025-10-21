/**
 * 관리자단 > 사이트관리 > 푸시/팝업관리(PushPopup) 페이지 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.1
 */
import SplitPaneResponsive from "@admin/components/common/splitPaneResponsive"; // 반응형 스플리터

export default function PushPopup(props) {

/** ========================= 관리자단 > 사이트관리 > 푸시/팝업관리(PushPopup) .jsx영역 ================================== */
    return( 
    <>
        <h3> 푸시/팝업관리 </h3>
        <SplitPaneResponsive
            initLeftPct={50}         // 초기 좌측 폭(%)
            minLeftPx={240}          // 좌측 최소(px)
            minRightPx={320}         // 우측 최소(px)
            left={<PlaceList />}     // 좌측 콘텐츠
            right={<PlaceView />}    // 우측 콘텐츠
        />
    </>
  );
}//PushPopup.jsx end