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
  if (!items.length) return null;

    
console.log("팝업");
/** =========================== PopupBanner.jsx ===================================== */
    return <>
        {/* 배너 로테이션 1,2,3 시작 */}
        <div className="popupBannerWrap" aria-roledescription="carousel">
        {items.map((it, i) => (
          <dl className="popupBanne" key={it.ppNo ?? i}>
            <dt>
              <img
                src={imgUrl(it.ppImg)}
                alt={it.ppTitle ?? "배너"}
                onError={(e) => (e.currentTarget.src = "/user/img/popup_sample3.jpg")}
              />
              <span>{typeLabel(it.ppType)}</span>
            </dt>
            <dd>{it.ppTitle ?? "-"}</dd>
            <dd>일시: {fmtDate(it.ppStart)} ~ {fmtDate(it.ppEnd)}</dd>
            {/* 장소 정보가 API에 없으면 이 줄은 생략하거나 다른 필드로 대체 */}
            {/* <dd>장소: {it.placeName ?? "-"}</dd> */}
          </dl>
        ))}
      </div>
        {/* 배너 로테이션 1,2,3 끝 */}

    </>
}//MainPlace.jsx end