/**
 * 관리자??> 관광정보�?�?> ?�레?�스?�황(PlaceInfo) > [본문 ?�측]?�레?�스 ?�세?�보(CRUD) 컴포?�트
 *
 * @author 
 * @since 2025.10.20
 * @version 0.1.1
 */

import DetailCommon1 from "@admin/pages/map/place/DetailCommon1";  //* (본문 ?�측)?�레?�스 공통?�보(1.기본) 컴포?�트 */
import TourIntro2 from "@admin/pages/map/place/TourIntro2Save";    //* (본문 ?�측)?�레?�스 ?�세?�보(2.?�트�? 컴포?�트 */
import DetailRepeat3 from "@admin/pages/map/place/DetailRepeat3New";  //* (본문 ?�측)?�레?�스 반복?�보(3.info2) 컴포?�트 */
import RestaurantIntro2 from "./RestaurantIntro2";
import FestivalIntro2 from "./FestivalIntro2New";
import { useEffect, useState, useMemo } from "react";

export default function DetailSection({ detail, loading, error, ...rest }) {
    // ?�규?�록 초기?��? ?�한 "�??�세" ?�플�?
    const EMPTY_DETAIL = {
        placeInfo: {},
        MarkersGPSDto: null,
        PlaceImageDetail: [],
        PlaceInfoDtoList: [],
        TourIntro: null,
        RestaurantIntro: null,
        FestivalIntro: null,
    };

    // ?�버?�서 ?�려??detail??로컬??보�?(?�규?�록??부�??�태???�향 ?�이 초기??
    const [localDetail, setLocalDetail] = useState(detail ?? EMPTY_DETAIL);

    // ?��? detail??변경되�??�기??(목록???�릭 ??갱신)
    useEffect(() => {
        setLocalDetail(detail ?? EMPTY_DETAIL);
    }, [detail]);

    // ?�식 강제 ?�마?�트�??�한 ??
    const [resetSeq, setResetSeq] = useState(0);

    // ?�규?�록(?�체 초기??
    const handleNew = () => {
        setLocalDetail(EMPTY_DETAIL);   // ?�이??비�?
        setContentType("1");            // 기본: 관광�?
        setResetSeq((n) => n + 1);      // key 변�????�식 ?�마?�트
    };



    // ?�전???�폴??(?�규 ?�록/?�세 ?�음???�도 �?값으�??�작)
    const placeInfo = localDetail?.placeInfo ?? {};
    const markers = localDetail?.MarkersGPSDto ?? null;
    const images = localDetail?.PlaceImageDetail ?? [];
    const placeInfoDtoList = localDetail?.PlaceInfoDtoList ?? [];

    // - 조회??detail??바뀌면 placeInfo.ctNo�?반영
    const [contentType, setContentType] = useState(String(placeInfo?.ctNo ?? ""));
    useEffect(() => {
        setContentType(String(placeInfo?.ctNo ?? "")); // 조회/교체???�만 ?�기??
    }, [placeInfo?.ctNo]);

    // 최종 ?�용??콘텐�??�??문자?�로 ?�일)
    const effectiveCt = useMemo(() => {
        const fromUser = String(contentType || "");
        const fromData = String(placeInfo?.ctNo ?? "");
        return fromUser || fromData || "1"; // 기본 1=관광�?(Tour)
    }, [contentType, placeInfo?.ctNo]);

    /** ============================ [본문 ?�측]?�레?�스 ?�세?�보(CRUD) ============================== */
    return (
        <>
            {/* <!-- ?�세?�보(CRUD) ?�작 --> */}
            <section className="registWrap"  {...rest}>
                {/* <!-- ???�?��?/버튼 ?�작 --> */}
                <div className="titleBox">
                    <ul className="tabtitle">
                        <li className="active">기본�?/li>
                        <li>?�세?�보</li>
                        <li>반복?�보</li>
                    </ul>
                    <span className="btnBox">
                        <button type="button" className="btn full">����</button>
                        <button type="button" className="btn line">���</button>
                        <button type="button" className="btn line" onClick={handleNew}>�űԵ��</button>
                    </span>
                </div>
                {/* <!--???�?��?/버튼 ?�작  --> */}

                {/* <!-- ?�세?�보 1.2.3.??출력 ?�작 --> */}
                <div className="formWrap">
                    <DetailCommon1
                        key={`dc1-${resetSeq}`}
                        placeInfo={placeInfo}
                        markers={markers}
                        images={images}
                        contentType={contentType}
                        onChangeContentType={setContentType}
                    />
                    <hr />
                    {/* ?�?�별 ?�션 : effectiveCt�??�용 */}
                    {(!effectiveCt || effectiveCt === "1") && (
                        <TourIntro2 key={`tour-${resetSeq}`} data={localDetail?.TourIntro ?? null} pNo={placeInfo?.pNo ?? placeInfo?.pno ?? null} />
                    )}
                    {effectiveCt === "3" && (
                        <FestivalIntro2 key={`fest-${resetSeq}`} data={localDetail?.FestivalIntro ?? null} pNo={placeInfo?.pNo ?? placeInfo?.pno ?? null} />
                    )}
                    {effectiveCt === "8" && (
                        <RestaurantIntro2 key={`rest-${resetSeq}`} data={localDetail?.RestaurantIntro ?? null} />
                    )}
                    <hr />
                    <DetailRepeat3 key={`rep-${resetSeq}`} items={placeInfoDtoList} pNo={placeInfo?.pNo ?? placeInfo?.pno ?? null} />
                </div>
                {/* <!-- ?�세?�보 1.2.3.??출력 ??--> */}
            </section>
            {/* <!-- ?�세?�보(CRUD) ??--> */}
        </>
    );
}// DetailSection.jsx end
