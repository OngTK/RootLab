/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측] 플레이스 공통정보(1.기본) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.20
 * @version 0.1.1
 */

import { useEffect, useRef, useState } from "react";
import CategorySelect from "../../../components/admin/place/CategorySelect";
import axios from "axios";

export default function DetailCommon1(props) {

    const { placeInfo } = props; // PlaceInfo 출력 방법에서 내려주는 detail.placeInfo

    // Detail 전용 로컬 상태 (검색 폼과 분리) ============================================================
    const [contentType, setContentType] = useState("");
    const [category, setCategory] = useState({
        ccNo: null, l1Cd: null, l2Cd: null, l3Cd: null,
        l1Nm: null, l2Nm: null, l3Nm: null,
    });
    const [region, setRegion] = useState({
        ldNo: null, regnCd: null, signguCd: null, regnNm: null, signguNm: null,
    });

    // 파일 & 설명 입력 ref====================================================
    const markerImgRef = useRef(null);
    const mainImgRef = useRef(null);
    const detailImgsRef = useRef(null);  // multiple
    const imageDescRef = useRef(null);
    const detailAddrRef = useRef(null);
    const [showFlag, setShowFlag] = useState(true);        // 노출 여부
    const [title, setTitle] = useState("");                 // 플레이스명
    const [phone, setPhone] = useState("");                 // 대표전화
    const [phoneDesc, setPhoneDesc] = useState("");         // 대표전화 설명
    const [homepage, setHomepage] = useState("");           // 홈페이지
    const [overview, setOverview] = useState("");           // 개요
    const [placeNo, setPlaceNo] = useState("");             // 플레이스 번호(표시용)

    // 상세 조회로 들어온 값을 초기값으로 반영(있을 때만) =========================================
    useEffect(() => {
        if (!placeInfo) return;
        setContentType(placeInfo.ctNo ?? "");
        // 상세 진입 시 기존 주소값을 미리 채우고 싶다면:
        setZipCode(placeInfo.zipcode ?? "");
        setRoadAddr(placeInfo.addr1 ?? "");

        setShowFlag(placeInfo.showflag === 1);
        setTitle(placeInfo.title ?? "");
        setPhone(placeInfo.tel ?? "");
        setPhoneDesc(placeInfo.telname ?? "");
        setHomepage(placeInfo.homepage ?? "");
        setOverview(placeInfo.overview ?? "");
        setPlaceNo(placeInfo.pNo ?? placeInfo.pno ?? "");
    }, [placeInfo]);

    // 우편번호/주소 상태 ===================================================================
    const [zipCode, setZipCode] = useState("");     // 우편번호 (라인 94)
    const [roadAddr, setRoadAddr] = useState("");   // 도로명 주소 (라인 95)
    const [detailAddr, setDetailAddr] = useState(""); // 상세주소(라인 7단계에서 이미 존재)

    // daum 우편번호 스크립트 로드 (최초 1회) ==============================
    useEffect(() => {
        if (window.daum?.Postcode) return; // 이미 로드됨
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            // 제거는 보통 불필요. 페이지 단위 앱이면 생략 가능
        };
    }, []);

    // 우편번호 팝업 열기 ==============================
    const openPostcode = () => {
        if (!window.daum?.Postcode) {
            alert("우편번호 스크립트가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
            return;
        }
        new window.daum.Postcode({
            oncomplete: (data) => {
                // data.userSelectedType: 'R' = 도로명, 'J' = 지번
                const zonecode = data.zonecode || "";
                const addr = data.userSelectedType === "R" ? (data.roadAddress || "") : (data.jibunAddress || "");
                setZipCode(zonecode);
                setRoadAddr(addr);       // 요구사항: 라인 95는 도로명 주소
                // 상세주소 포커스 UX
                setTimeout(() => {
                    detailAddrRef.current?.focus();
                }, 0);
            }
        }).open();
    };

    // 지도 DOM 참조 ==============================
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const geocoderRef = useRef(null);
    // 지도/좌표 상태 (저장용) ==============================
    const [mapObj, setMapObj] = useState(null);
    const [coord, setCoord] = useState({ x: null, y: null }); // x=경도(lng), y=위도(lat)

    // Kakao 지도 로드 ==============================
    useEffect(() => {
        const initMap = () => {
            const container = mapRef.current;
            if (!container || !window.kakao?.maps) return;
            const center = new window.kakao.maps.LatLng(37.5665, 126.9780); // TODO: placeInfo의 mapy/mapx로 치환
            const map = new window.kakao.maps.Map(container, { center, level: 3 });

            // 초기 마커 객체 보관(처음 한 번만 생성)
            markerRef.current = new window.kakao.maps.Marker({ position: center });
            markerRef.current.setMap(map);
            // 지오코더 준비
            geocoderRef.current = new window.kakao.maps.services.Geocoder();
            setMapObj(map);
        };

        // 이미 로드된 경우 ==============================
        if (window.kakao?.maps) {
            window.kakao.maps.load(initMap);
            return;
        }
        // 동적 로드 (autoload=false 필수) ==============================
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=29ac2fc1e2229c89c0cdf197740abcb5&autoload=false&libraries=services";
        script.async = true;
        script.onload = () => window.kakao.maps.load(initMap); // SDK 로드 후 수동 초기화
        document.head.appendChild(script);
    }, []);

    // 도로명주소가 변경되면 좌표 검색 ==============================
    useEffect(() => {
        const addr = (roadAddr || "").trim();
        if (!addr) return;
        if (!mapObj || !geocoderRef.current) return;

        geocoderRef.current.addressSearch(addr, (result, status) => {
            if (status !== window.kakao.maps.services.Status.OK || !result?.length) return;
            const { x, y } = result[0]; // x: 경도, y: 위도
            const latlng = new window.kakao.maps.LatLng(Number(y), Number(x));
            // 마커 이동/표시
            if (!markerRef.current) {
                markerRef.current = new window.kakao.maps.Marker({ position: latlng });
            } else {
                markerRef.current.setPosition(latlng);
            }
            markerRef.current.setMap(mapObj);
            // 지도 중심 이동
            mapObj.setCenter(latlng);
            // 저장용 좌표 상태 업데이트
            setCoord({ x, y });
            console.log(x)
            console.log(y)
        });
    }, [roadAddr, mapObj]);

    // 저장 (멀티파트: JSON 파트 + 파일 파트) ==============================
    const handleSave = async () => {
        try {
            if (!contentType) { alert("콘텐츠 타입을 선택해 주세요."); return; }
            if (!category?.ccNo) { alert("카테고리는 소분류까지 선택해 주세요."); return; }

            // 1) 화면 값 수집
            const pNoFromDetail = placeInfo?.pno ?? placeInfo?.pNo ?? null;
            const ctNoVal = Number(contentType);
            const ccNoVal = category.ccNo;
            const showflag = showFlag ? 1 : 0;
            const titleVal = title.trim();
            const homepageVal = homepage.trim() || null;
            const telVal = phone.trim() || null;
            const telNameVal = phoneDesc.trim() || null;
            const overviewVal = overview.trim() || null;


            // 2) DTO 구성 (서버 필드와 동일하게)
            const placeInfoDto = {
                pNo: pNoFromDetail ?? 0,
                ctNo: ctNoVal,
                ldNo: region?.ldNo ?? null,    // (없으면 백에서 주소 기반 처리)
                ccNo: ccNoVal,
                editable: true,
                contentid: null,
                title: titleVal,
                showflag,
                firtimage: null,               // 파일로 전송 → 백에서 경로 세팅
                firstimage2: null,             // 파일로 전송 → 백에서 경로 세팅
                addr1: roadAddr || null,       // 도로명 주소
                addr2: detailAddr || null,     // 상세 주소
                zipcode: zipCode || null,
                homepage: homepageVal,
                tel: telVal,
                telname: telNameVal,
                overview: overviewVal,
            };

            const markerDto = {
                mkNo: 0,
                pNo: pNoFromDetail ?? 0,
                mkURL: null,                   // 파일 처리 후 백에서 경로 입력
                mapx: coord.x ? Number(coord.x) : null, // 경도
                mapy: coord.y ? Number(coord.y) : null, // 위도
            };

            // 상세 이미지 메타(이미지 설명 1개만 받는 스펙)
            const imagesMeta = [];
            const imgDesc1 = imageDescRef.current?.value?.trim();
            if (imgDesc1) imagesMeta.push({ imgname: imgDesc1 });

            // 3) FormData 조립 (@RequestPart 명과 일치)
            const fd = new FormData();
            fd.append("placeInfo", new Blob([JSON.stringify(placeInfoDto)], { type: "application/json" }));
            fd.append("marker", new Blob([JSON.stringify(markerDto)], { type: "application/json" }));
            if (imagesMeta.length) {
                fd.append("imagesMeta", new Blob([JSON.stringify(imagesMeta)], { type: "application/json" }));
            }
            // 파일 파트
            if (markerImgRef.current?.files?.[0]) {
                fd.append("markerImage", markerImgRef.current.files[0]);
            }
            if (mainImgRef.current?.files?.[0]) {
                fd.append("mainImage", mainImgRef.current.files[0]);
            }
            if (detailImgsRef.current?.files?.length) {
                [...detailImgsRef.current.files].forEach((f) => fd.append("detailImages", f));
            }

            // 4) 전송
            await axios.post("http://localhost:8080/placeinfo/basic", fd, { headers: { "Content-Type": "multipart/form-data" } });
            alert("저장되었습니다.");
        } catch (err) {
            console.error(err);
            alert("저장 중 오류가 발생했습니다.");
        }
    };


    /** ====================== [본문 우측] 플레이스 공통정보(1.기본) 컴포넌트 =========================== */
    return (
        <>
            <div className="placeCommonWrap">
                <form aria-label="기본정보 입력">
                    <fieldset>
                        <legend>새해 맞이 불꽃쇼 & 소원 풍선 날리기 축제{/* 기본정보 */}</legend>

                        {/* 1. 지도 미리보기 영역 */}
                        <div ref={mapRef}
                            className="previewMap"
                            id="previewMap"
                            aria-hidden="true"></div>

                        {/* 1. 콘텐츠 타입 (선택 필드) */}
                        <div className="form-group">
                            <label htmlFor="content-type">콘텐츠 타입</label>
                            <select id="content-type" name="contentType" value={contentType} onChange={(e) => setContentType(e.target.value)}>
                                <option value="">전체</option>
                                <option value="1">관광지</option>
                                <option value="3">행사/공연/축제</option>
                                <option value="8">음식점</option>
                            </select>
                            {/* 2. 노출 여부 (라디오 버튼 그룹) - fieldset과 legend로 그룹화 필수 */}
                            <span className="form-group">
                                <span>노출 여부</span>
                                <span className="radio-group">
                                    <input type="radio" id="exposure-on" name="exposure" value="Y"
                                        checked={showFlag} onChange={() => setShowFlag(true)} />
                                    <label htmlFor="exposure-on">노출</label>
                                    <input type="radio" id="exposure-off" name="exposure" value="N"
                                        checked={!showFlag} onChange={() => setShowFlag(false)} />
                                    <label htmlFor="exposure-off">비노출</label>
                                </span>
                            </span>
                        </div>
                        {/* 3. 카테고리 (다중 Select 필드) */}
                        <div className="form-group category-group">
                            <CategorySelect
                                idSuffix="detail"           // 좌측 검색과 ID 충돌 방지
                                namePrefix="detail"         // 좌측 검색과 name 충돌 방지
                                value={category}
                                onChange={setCategory}
                            />
                        </div>

                        {/* 4. 플레이스명 */}
                        <div className="form-group">
                            <label htmlFor="place-name">플레이스명</label>
                            <input type="text" id="place-name" name="placeName" required aria-required="true"
                                value={title} onChange={(e) => setTitle(e.target.value)} />
                            {/* 5. 플레이스 번호 */}
                            <span className="form-group">
                                <label htmlFor="place-number">플레이스 번호</label>
                                <input type="text" id="place-number" name="placeNumber" value={placeNo} readOnly />
                            </span>
                        </div>
                        {/* 6. 기본 주소 */}
                        <div className="form-group">
                            <label htmlFor="zip-code">기본 주소</label>
                            <button
                                type="button"
                                aria-label="우편번호 검색"
                                onClick={openPostcode}
                            >
                                우편번호
                            </button>
                            {/* ✅ 전송을 고려하여 disabled 대신 readOnly 사용 권장 */}
                            <input
                                type="text"
                                id="zip-code"
                                name="zipCodeInput"
                                placeholder="우편번호"
                                aria-label="우편번호"
                                value={zipCode}
                                readOnly
                            />
                            <input
                                type="text"
                                id="base-addr"
                                name="addrInput"
                                placeholder="도로명 주소"
                                aria-label="기본 주소"
                                value={roadAddr}
                                readOnly
                            />
                        </div>

                        {/* 7. 상세 주소 */}
                        <div className="form-group">
                            <label htmlFor="detail-addr">상세 주소</label>
                            <input
                                type="text"
                                id="detail-addr"
                                ref={detailAddrRef}
                                value={detailAddr}
                                onChange={(e) => setDetailAddr(e.target.value)}
                            />
                        </div>
                        <input type="hidden" name="mapx" value={coord.x ?? ""} />
                        <input type="hidden" name="mapy" value={coord.y ?? ""} />

                        {/* 8. 대표 전화 및 설명 */}
                        <div className="form-group phone-group">
                            <label htmlFor="main-phone">대표전화</label>
                            <input type="text" id="main-phone" name="mainPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <label htmlFor="phone-desc" className="sr-only">대표전화 설명</label> {/* 시각적으로는 숨기고 스크린 리더에게만 제공 */}
                            <input type="text" id="phone-desc" name="phoneDesc" placeholder="전화 설명 (예: 9시~18시)"
                                value={phoneDesc} onChange={(e) => setPhoneDesc(e.target.value)} />
                        </div>

                        {/* 9. 홈페이지 */}
                        <div className="form-group">
                            <label htmlFor="homepage">홈페이지</label>
                            <input type="text" id="homepage" name="homepage" value={homepage} onChange={(e) => setHomepage(e.target.value)} />
                        </div>

                        {/* 10. 개요 설명 */}
                        <div className="form-group">
                            <label htmlFor="summary-desc">개요 설명</label>
                            <textarea id="summary-desc" name="summaryDesc" className="memoInput"
                                placeholder="상세소개를 입력하세요." rows="5"
                                value={overview} onChange={(e) => setOverview(e.target.value)} ></textarea>
                        </div>
                        {/* 11. 마커 이미지 */}
                        <div className="form-group">
                            <label htmlFor="marker-img">마커 이미지</label>
                            <input type="file" id="marker-img" name="markerImage" ref={markerImgRef} />
                        </div>

                        {/* 12. 대표 이미지 */}
                        <div className="form-group">
                            <label htmlFor="main-img">대표 이미지</label>
                            <input type="file" id="main-img" name="mainImage" ref={mainImgRef} />
                            <span className="info-text" id="main-img-hint">*이미지 사이즈: 800px(가로) * 600px(세로) 권장</span>
                        </div>

                        {/* 13. 상세 이미지 1 */}
                        <div className="form-group">
                            <label htmlFor="detail-img-1">상세 이미지 1</label>
                            <input type="file" id="detail-img-1" name="detailImages" multiple ref={detailImgsRef} />
                            <span className="info-text" id="detail-img-hint">*멀티업로드(~최대 10개/ 이미지별 용량제한 ~2MB)</span>
                        </div>

                        {/* 14. 이미지 설명 1 */}
                        <div className="form-group">
                            <label htmlFor="img-desc-1">이미지 설명</label>
                            <input type="text" id="img-desc-1" name="imageDesc1" ref={imageDescRef} />
                        </div>

                        <div className="info_date">
                            <b>등록일:</b>2025-00-00 (00:00:00)<b>수정일:</b>2025-00-00 (00:00:00)
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={handleSave}>저장</button>
                            <button>삭제</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}// DetailCommon1.jsx end