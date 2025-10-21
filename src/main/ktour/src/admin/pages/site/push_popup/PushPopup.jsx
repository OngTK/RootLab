/**
 * 관리자단 > 사이트관리 > 푸시/팝업관리(PushPopup) 페이지 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.1
 */
import SplitPaneResponsive from "@admin/components/common/SplitPaneResponsive";   // 반응형 스플리터
import ListSection from "@admin/pages/site/push_popup/ListSection.jsx";           // 좌측: 목록
import DetailSection from "@admin/pages/site/push_popup/DetailSection.jsx";       // 우측: 상세(CRUD)

export default function PushPopup(props) {

/** ========================= 관리자단 > 사이트관리 > 푸시/팝업관리(PushPopup) .jsx영역 ================================== */
    return (
        <>
            <SplitPaneResponsive
                initLeftPct={50}            // 초기 좌측 폭(%)
                minLeftPx={240}             // 좌측 최소(px)
                minRightPx={320}            // 우측 최소(px)
                left={<ListSection />}      // 좌측 콘텐츠
                right={<DetailSection />}   // 우측 콘텐츠
            />
        </>
    );
}//PushPopup.jsx end