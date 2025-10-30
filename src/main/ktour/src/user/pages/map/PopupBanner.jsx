/**
 * 사용자단(비회원) > 메인 > 팝업배너 컴포넌트
 *
 * @author 
 * @since 2025.10.24
 * @version 0.1.1
 */
import "@assets/user/css/popupBanner.css";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";


export default function PopupBanner(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselId = useMemo(() => `popupCarousel-${Math.random().toString(36).slice(2, 9)}`, []);

  // 서버에 저장된 파일명(ppImg) → 이미지 URL 조립
  const imgUrl = (ppImg) =>
    ppImg
      ? `http://localhost:5173/uploads/1/ppImg/${encodeURIComponent(ppImg)}`
      : "/user/img/popup_sample3.jpg"; // 기본 샘플

  const typeLabel = (t) => (String(t) === "1" ? "공지" : String(t) === "2" ? "이벤트" : "알림");
  const fmtDate = (v) => (v ? String(v).replace("T", " ").slice(0, 16) : "-");
  

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/push/banner", {
          withCredentials: true,
        });
        const rows = Array.isArray(res.data) ? res.data : [];
        if (mounted) setItems(rows);
      } catch (e) {
        console.error("[PopupBanner] load error:", e?.response?.data ?? e.message);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // 데이터 없으면 아무것도 렌더하지 않음
  if (loading) return null;
  if (!items.length) {
  setItems([
    {
      ppNo: 0,
      ppTitle: "기본 배너",
      ppContent: "현재 등록된 배너가 없습니다.",
      ppImg: "/user/img/popup_sample3.jpg", // 기본 이미지 경로
      ppType: "3",
    },
  ]);
  return null; // 첫 렌더 한 번 끊어주기
}
    
console.log("팝업");
/** =========================== PopupBanner.jsx ===================================== */
    return <>
        {/* 배너 로테이션 1,2,3 시작 */}
        return (
  <>
    {/* 기존 래퍼 유지 */}
    <div className="popupBannerWrap">
      {/* 부트스트랩 캐러셀 래퍼 추가 */}
      <div
        id={carouselId}                       // ← useMemo로 만든 고유 id
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000"
        aria-roledescription="carousel"
      >
        {/* 인디케이터(선택사항) */}
        <div className="carousel-indicators">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0 ? "true" : undefined}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* 기존 dl 구조를 '슬라이드 아이템'으로 감싸기 */}
        <div className="carousel-inner">
          {items.map((it, i) => (
            <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={it.ppNo ?? i}>
              {/* 기존 dl 유지 */}
              <dl className="popupBanne position-relative m-0">
                <dt>
                  <img
                    src={imgUrl(it.ppImg)}
                    className="d-block w-100"
                    onError={(e) => (e.currentTarget.src = "/user/img/popup_sample3.jpg")}
                  />
                  {/* 타입 뱃지는 좌상단에 */}
                  <span className="position-absolute top-0 start-0 m-2 badge bg-primary">
                    {typeLabel(it.ppType)}
                  </span>
                </dt>

                {/* 캡션은 부트스트랩 오버레이 영역에 넣어 연출 */}
                <div className="carousel-caption d-none d-md-block">
                  <dd className="h5 mb-1"></dd>
                  <dd className="mb-0">
                  </dd>
                  {/* 장소 필드 필요하면 여기서 추가 */}
                  {/* <dd className="mb-0">장소: {it.placeName ?? "-"}</dd> */}
                </div>
              </dl>
            </div>
          ))}
        </div>

        {/* 이전/다음 버튼 — 아이템 2개 이상일 때만 */}
        {items.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  </>
);
        {/* 배너 로테이션 1,2,3 끝 */}

    </>
}//MainPlace.jsx end