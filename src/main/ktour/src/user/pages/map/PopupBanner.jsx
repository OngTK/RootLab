/**
 * 사용자단(비회원) > 메인 > 팝업배너 컴포넌트
 *
 * @author 
 * @since 2025.10.24
 * @version 0.1.1
 */
import "@assets/user/css/popupBanner.css";
export default function PopupBanner(props) {
console.log("팝업");
/** =========================== PopupBanner.jsx ===================================== */
    return <>
        {/* 배너 로테이션 1,2,3 시작 */}
        <div className="popupBannerWrap">
            <dl className="popupBanne">
                <dt>
                    <img src="/user/img/popup_sample3.jpg" />
                    <span>공지</span>
                </dt>
                <dd>고성군 모바일 스탬프 투어</dd>
                <dd>일시: ~2025-11-20(월) 16:00</dd>
                <dd>장소: 강원도 고성군 해돋이 해수욕장</dd>
            </dl>
        </div>
        {/* 배너 로테이션 1,2,3 끝 */}

    </>
}//MainPlace.jsx end