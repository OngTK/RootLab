/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측]플레이스 상세정보(CRUD) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.20
 * @version 0.1.1
 */

import DetailCommon1 from "@admin/pages/map/place/DetailCommon1";  //* (본문 우측)플레이스 공통정보(1.기본) 컴포넌트 */
import TourIntro2 from "@admin/pages/map/place/TourIntro2";    //* (본문 우측)플레이스 상세정보(2.인트로) 컴포넌트 */
import DetailRepeat3 from "@admin/pages/map/place/DetailRepeat3";  //* (본문 우측)플레이스 반복정보(3.info2) 컴포넌트 */
import RestaurantIntro2 from "./RestaurantIntro2";
import FestivalIntro2 from "./FestivalIntro2";
import { useEffect, useState, useMemo } from "react";

export default function DetailSection({ detail, loading, error, ...rest }) {

    // 안전한 디폴트 (신규 등록/상세 없음일 때도 빈 값으로 동작)
    const placeInfo = detail?.placeInfo ?? {};
    const markers = detail?.MarkersGPSDto ?? null;
    const images = detail?.PlaceImageDetail ?? [];
    const tourIntro = detail?.TourIntro ?? null;
    const restaurantIntro = detail?.RestaurantIntroDto ?? null;
    const festivalIntro = detail?.FestivalIntroDto ?? null;
    const placeInfoDtoList = detail?.PlaceInfoDtoList ?? [];

    // - 조회된 detail이 바뀌면 placeInfo.ctNo를 반영
    const [contentType, setContentType] = useState(String(placeInfo?.ctNo ?? ""));
    useEffect(() => {
        setContentType(String(placeInfo?.ctNo ?? "")); // 조회/교체될 때만 동기화
    }, [placeInfo?.ctNo]);

    // 4) 실제로 사용할 타입 (우선순위: 사용자가 선택한 값 → 조회값 → 기본 1=Tour)
    const effectiveCt = useMemo(() => {
        const fromUser = String(contentType || "");
        const fromData = String(placeInfo?.ctNo ?? "");
        return fromUser || fromData || "1"; // 기본 TourIntro
    }, [contentType, placeInfo?.ctNo]);

    // 5) 타입별로 단 하나만 렌더 (데이터도 타입에 맞는 것만 전달)
    const activeIntro = useMemo(() => {
        if (effectiveCt === "1") return <TourIntro2 intro={tourIntro} />;
        if (effectiveCt === "3") return <FestivalIntro2 intro={festivalIntro} />;
        if (effectiveCt === "8") return <RestaurantIntro2 intro={restaurantIntro} />;
        return <TourIntro2 intro={tourIntro} />; // 방어적 기본
    }, [effectiveCt, tourIntro, festivalIntro, restaurantIntro]);
    
    /** ============================ [본문 우측]플레이스 상세정보(CRUD) ============================== */
    return (
        <>
            {/* <!-- 상세정보(CRUD) 시작 --> */}
            <section className="registWrap"  {...rest}>
                {/* <!-- 탭/타이틀/버튼 시작 --> */}
                <div className="titleBox">
                    <ul className="tabtitle">
                        <li className="active">기본정보</li>
                        <li>상세정보</li>
                        <li>반복정보</li>
                    </ul>
                    <span className="btnBox">
                        <button type="button" className="btn full">저장</button>
                        <button type="button" className="btn line">삭제</button>
                        <button type="button" className="btn line">신규등록</button>
                    </span>
                </div>
                {/* <!--탭/타이틀/버튼 시작  --> */}

                {/* <!-- 상세정보 1.2.3.입/출력 시작 --> */}
                <div className="formWrap">
                    <DetailCommon1
                        placeInfo={placeInfo}
                        markers={markers}
                        images={images}
                        contentType={contentType}
                        onChangeContentType={setContentType}
                    />
                    <hr />
                    {activeIntro}
                    <hr />
                    <DetailRepeat3 items={placeInfoDtoList} />
                </div>
                {/* <!-- 상세정보 1.2.3.입/출력 끝 --> */}
            </section>
            {/* <!-- 상세정보(CRUD) 끝 --> */}
        </>
    );
}// DetailSection.jsx end