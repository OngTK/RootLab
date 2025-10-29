/**
 * 관리자 > 관광정보 > 플레이스 현황(PlaceInfo)
 * [본문 우측] 상세 영역 (기본/상세/반복)
 */
import DetailCommon1 from "@admin/pages/map/place/DetailCommon1";
import TourIntro2 from "@admin/pages/map/place/TourIntro2";
import FestivalIntro2 from "@admin/pages/map/place/FestivalIntro2";
import DetailRepeat3 from "@admin/pages/map/place/DetailRepeat3";
import RestaurantIntro2 from "./RestaurantIntro2";
import { useEffect, useMemo, useState } from "react";

export default function DetailSection({ detail, ...rest }) {
  const EMPTY_DETAIL = {
    placeInfo: {},
    MarkersGPSDto: null,
    PlaceImageDetail: [],
    PlaceInfoDtoList: [],
    TourIntro: null,
    RestaurantIntro: null,
    FestivalIntro: null,
  };

  const [localDetail, setLocalDetail] = useState(detail ?? EMPTY_DETAIL);
  useEffect(() => { setLocalDetail(detail ?? EMPTY_DETAIL); }, [detail]);

  const placeInfo = localDetail?.placeInfo ?? {};
  const markers = localDetail?.MarkersGPSDto ?? null;
  const images = localDetail?.PlaceImageDetail ?? [];
  const placeInfoDtoList = localDetail?.PlaceInfoDtoList ?? [];

  const [contentType, setContentType] = useState(String(placeInfo?.ctNo ?? ""));
  useEffect(() => { setContentType(String(placeInfo?.ctNo ?? "")); }, [placeInfo?.ctNo]);

  const effectiveCt = useMemo(() => {
    const fromUser = String(contentType || "");
    const fromData = String(placeInfo?.ctNo ?? "");
    return fromUser || fromData || "1"; // 기본 1=관광지
  }, [contentType, placeInfo?.ctNo]);

  const handleNew = () => {
    setLocalDetail(EMPTY_DETAIL);
    setContentType("1");
  };

  const pNo = placeInfo?.pNo ?? placeInfo?.pno ?? null;

  return (
    <section className="registWrap" {...rest}>
      <div className="titleBox">
        <ul className="tabtitle">
          <li className="active">기본정보</li>
          <li>상세정보</li>
          <li>반복정보</li>
        </ul>
        <span className="btnBox">
          <button type="button" className="btn line" onClick={handleNew}>신규등록</button>
          <button type="button" className="btn line">삭제</button>
          <button type="button" className="btn full">저장</button>
        </span>
      </div>

      <div className="formWrap place">
        <DetailCommon1
          key={`dc1-${pNo ?? 'new'}`}
          placeInfo={placeInfo}
          markers={markers}
          images={images}
          contentType={contentType}
          onChangeContentType={setContentType}
        />

        <hr />

        {Number(effectiveCt) === 1 && (
          <TourIntro2 key={`tour-${pNo ?? 'new'}`} data={localDetail?.TourIntro ?? null} pNo={pNo} />
        )}
        {Number(effectiveCt) === 3 && (
          <FestivalIntro2 key={`fest-${pNo ?? 'new'}`} data={localDetail?.FestivalIntro ?? null} pNo={pNo} />
        )}
        {Number(effectiveCt) === 8 && (
          <RestaurantIntro2 key={`rest-${pNo ?? 'new'}`} data={localDetail?.RestaurantIntro ?? null} />
        )}

        <hr />
        <DetailRepeat3 key={`rep-${pNo ?? 'new'}`} items={placeInfoDtoList} pNo={pNo} />
      </div>
    </section>
  );
}

