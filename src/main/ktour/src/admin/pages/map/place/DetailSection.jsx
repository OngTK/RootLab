/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측]플레이스 상세정보(CRUD) 컴포넌트
 *
 * @author 
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
    const ctNo = detail?.placeInfo?.ctNo ?? null;

    // 신규등록 초기화를 위한 "빈 상세" 템플릿
    const EMPTY_DETAIL = {
        placeInfo: {},
        MarkersGPSDto: null,
        PlaceImageDetail: [],
        PlaceInfoDtoList: [],
        TourIntro: null,
        RestaurantIntro: null,
        FestivalIntro: null,
    };

    // 서버에서 내려온 detail을 로컬에 보관(신규등록시 부모 상태에 영향 없이 초기화)
    const [localDetail, setLocalDetail] = useState(detail ?? EMPTY_DETAIL);

    // 외부 detail이 변경되면 동기화 (목록행 클릭 시 갱신)
    useEffect(() => {
        setLocalDetail(detail ?? EMPTY_DETAIL);
    }, [detail]);

    // 자식 강제 재마운트를 위한 키
    const [resetSeq, setResetSeq] = useState(0);

    // 신규등록(전체 초기화)
    const handleNew = () => {
        setLocalDetail(EMPTY_DETAIL);   // 데이터 비움
        setContentType("1");            // 기본: 관광지
        setResetSeq((n) => n + 1);      // key 변경 → 자식 재마운트
    };



    // 안전한 디폴트 (신규 등록/상세 없음일 때도 빈 값으로 동작)
    const placeInfo = localDetail?.placeInfo ?? {};
    const markers = localDetail?.MarkersGPSDto ?? null;
    const images = localDetail?.PlaceImageDetail ?? [];
    const placeInfoDtoList = localDetail?.PlaceInfoDtoList ?? [];

    // - 조회된 detail이 바뀌면 placeInfo.ctNo를 반영
    const [contentType, setContentType] = useState(String(placeInfo?.ctNo ?? ""));
    useEffect(() => {
        setContentType(String(placeInfo?.ctNo ?? "")); // 조회/교체될 때만 동기화
    }, [placeInfo?.ctNo]);

    // 최종 사용할 콘텐츠 타입(문자열로 통일)
    const effectiveCt = useMemo(() => {
        const fromUser = String(contentType || "");
        const fromData = String(placeInfo?.ctNo ?? "");
        return fromUser || fromData || "1"; // 기본 1=관광지(Tour)
    }, [contentType, placeInfo?.ctNo]);

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
                        <button type="button" className="btn line" onClick={handleNew} >신규등록</button>
                    </span>
                </div>
                {/* <!--탭/타이틀/버튼 시작  --> */}

                {/* <!-- 상세정보 1.2.3.입/출력 시작 --> */}
                <div className="formWrap">
                    <DetailCommon1 key={"common-" + (detail?.placeInfo?.pno ?? "new")} data={detail} />

                    <hr />
                    {(!ctNo || ctNo === 1) && (
                        <TourIntro2
                            key={"tour-" + (detail?.placeInfo?.pno ?? "new")}
                            data={detail?.TourIntro}
                        />
                    )}
                    {ctNo === 3 && (
                        <FestivalIntro2
                            key={"fest-" + (detail?.placeInfo?.pno ?? "new")}
                            data={detail?.FestivalIntro}
                        />
                    )}
                    {ctNo === 8 && (
                        <RestaurantIntro2
                            key={"rest-" + (detail?.placeInfo?.pno ?? "new")}
                            data={detail?.RestaurantIntro}
                        />
                    )}
                    <hr />
                    <DetailRepeat3
                        key={"repeat-" + (detail?.placeInfo?.pno ?? "new")}
                        data={detail?.PlaceInfoDtoList || []}
                    />
                </div>
                {/* <!-- 상세정보 1.2.3.입/출력 끝 --> */}
            </section>
            {/* <!-- 상세정보(CRUD) 끝 --> */}
        </>
    );
}// DetailSection.jsx end