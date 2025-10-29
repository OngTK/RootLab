/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) 페이지 컴포넌트
 *
 * @author 
 * @since 2025.10.19
 * @version 0.1.3
 */
import SplitPaneResponsive from "@admin/components/common/SplitPaneResponsive"; // 반응형 스플리터
import ListSection from "@admin/pages/map/place/ListSection.jsx";               // 좌측: 목록
import DetailSection from "@admin/pages/map/place/DetailSectionUTF8.jsx";           // 우측: 상세(CRUD)
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function PlaceInfo() {

  const [picked, setPicked] = useState(null);   // 목록에서 클릭한 행
  const [detail, setDetail] = useState(null);   // 서버 상세 응답
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailKey, setDetailKey] = useState(0);   // 우측 패널 리셋용 키

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

  const handlePick = async (row) => {
    // 1) 우측 전체 초기화(리마운트) : 이전 값이 남지 않도록 먼저 비움
    setDetail(null);
    setDetailKey((k) => k + 1);

    try {
      // 2) 상세 조회
      const { data } = await axios.get(
        "http://localhost:8080/placeinfo/basic",
        { params: { pno: row.pno } }
      );
      // 3) 상세 반영
      setDetail(data);
      // 필요하다면 key를 한 번 더 증가시켜도 되지만 일반적으로는 불필요
    } catch (e) {
      console.error(e);
    }
  };

  /** ========================= 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) .jsx영역 ================================== */
  return (
    <>
      <SplitPaneResponsive
        initLeftPct={50}              // 초기 좌측 폭(%)
        minLeftPx={240}               // 좌측 최소(px)
        minRightPx={320}              // 우측 최소(px) 
        left={<ListSection onPick={handlePick} />}// 좌측 콘텐츠
        right={
          <DetailSection
            key={detailKey}        // ← 우측 통째로 리마운트(초기화)
            detail={detail}        // ← 상세 데이터 전달(없으면 비어있는 폼)
            onNew={() => {         // “신규등록” 버튼용 초기화
              setDetail(null);
              setDetailKey((k) => k + 1);
            }}
          />
        }
      />
    </>
  );
}