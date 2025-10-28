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
import { useState, useEffect } from "react";
import axios from "axios";

export default function PlaceInfo() {

  const [picked, setPicked] = useState(null);   // 목록에서 클릭한 행
  const [detail, setDetail] = useState(null);   // 서버 상세 응답
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pno = picked?.pNo ?? picked?.pno ?? picked?.PNO;
    if (!pno) { setDetail(null); return; }

    setLoading(true);
    setError(null);
    axios.get(`http://localhost:8080/placeinfo/basic`, { params: { pno } })
      .then(({ data }) => {
        setDetail(data)
      })
      .catch((e) => setError(e?.message || '상세 조회 실패'))
      .finally(() => setLoading(false));
  }, [picked]);


  /** ========================= 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) .jsx영역 ================================== */
  return (
    <>
      <SplitPaneResponsive
        initLeftPct={50}              // 초기 좌측 폭(%)
        minLeftPx={240}               // 좌측 최소(px)
        minRightPx={320}              // 우측 최소(px) 
        left={<ListSection onPick={(row) => setPicked(row)} />}// 좌측 콘텐츠
        right={<DetailSection
          detail={detail}
          loading={loading}
          error={error} />}// 우측 콘텐츠

      />
    </>
  );
}//PlaceInfo.jsx end