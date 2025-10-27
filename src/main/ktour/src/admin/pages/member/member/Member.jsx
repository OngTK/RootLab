/**
 * 관리자단 > 회원관리 > 회원현황(member)  페이지 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.2
 */
import SplitPaneResponsive from "@admin/components/common/SplitPaneResponsive"; // 반응형 스플리터
import ListSection from "@admin/pages/member/member/ListSection";              // 좌측: 목록
import DetailSection from "@admin/pages/member/member/DetailSection";          // 우측: 상세(CRUD)

export default function Member(props) {

    /** =========================== 회원현황 Member.jsx ============================= */
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
}//Member.jsx end