import React, { useEffect, useState, useRef, useCallback } from 'react';
import UseKakaoLoader from './UseKakaoLoader'; // 이 로더는 kakao 스크립트를 로드합니다.
import axios from "axios";
import festival from '../assets/contentTypeMarker/festival.png'
import cultural_facilities from '../assets/contentTypeMarker/cultural_facilities.png'
import food from '../assets/contentTypeMarker/food.png'
import leports from '../assets/contentTypeMarker/leports.png'
import shopping from '../assets/contentTypeMarker/shopping.png'
import stay from '../assets/contentTypeMarker/stay.png'
import tourSpot from '../assets/contentTypeMarker/tourSpot.png'
import travelCourse from '../assets/contentTypeMarker/travelCourse.png'
// Axios Option
const option = { withCredentials: true };

export default function KakaoMap(props) {
    const isScriptLoaded = UseKakaoLoader();

    // =================== useState 선언부 ===================
    const [markers, SetMarkers] = useState("");
    const [bounds, SetBounds] = useState({
        south: "0.0",
        west: "0.0",
        north: "0.0",
        east: "0.0"
    }); // useState end
    const [currentLocation, SetCurrentLocation] = useState({
        center: { lat: 37.489457, lng: 126.724494 },
        errMsg: null,
        isLoading: true
    }); // useState end
    const [lDongRegnCd, SetLDongRegnCd] = useState([]);
    const [selectedRegnCd, SetSelectedRegnCd] = useState("");
    const [lDongSignguCd, SetLDongSigngu] = useState([]);
    const [selectedLdNo, SetSelectedLdNo] = useState("");
    const [selectedGps, SetSelectedGps] = useState("");
    const [clickedMarker, SetClickedMarker] = useState("");       // 마커를 클릭했을 때, 마커의 정보를 저장할 useState

    // =================== useRef 선언부 ===================
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const clustererRef = useRef(null);

    // 4. 마커 이미지 소스를 객체로 미리 정의합니다.
    const markerImages = {
        'food.png': food,
        'cultural_facilities.png': cultural_facilities,
        'festival.png': festival,
        'leports.png': leports,
        'shopping.png': shopping,
        'stay.png': stay,
        'tourSpot.png': tourSpot,
        'travelCourse.png': travelCourse,
    };

    // =================== useEffect - [] : 마운트될 때 1번만 실행 ===================
    useEffect(() => {
        // =================== geolocation으로 현재 위치 가져오기 ===================
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                SetCurrentLocation((prev) => ({
                    ...prev,
                    center: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    },
                    isLoading: false
                }));
            }, (error) => {
                SetCurrentLocation((prev) => ({
                    ...prev,
                    errMsg: error.message,
                    isLoading: false
                }));
            });
        } else {
            SetCurrentLocation((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할 수 없는 상태입니다.",
                isLoading: false
            })); // SetCurrentLocation end
        } // if end
        // =================== 법정동 코드 가져오기 ===================
        getLDongRegnCdByAxios();
    }, []); // useEffect end
    // =================== LDongRegnCd Axios GET ===================
    const getLDongRegnCdByAxios = async () => {
        try {
            const response = await axios.get("http://localhost:8080/ldongcode/getregn", option);
            SetLDongRegnCd(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('getLDongCodeByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end
    // =================== LDongSignguCd Axios GET ===================
    const getLDongSignguCdByAxios = async () => {
        if (selectedRegnCd == "") return;
        try {
            const response = await axios.get(`http://localhost:8080/ldongcode/getsigngu?lDongRegnCd=${selectedRegnCd}`, option);
            SetLDongSigngu(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('getLDongSignguCdByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end
    // =================== useEffect - [selectedRegnCd] : 시군구 정보 가져오기 ===================
    useEffect(() => {
        getLDongSignguCdByAxios();
    }, [selectedRegnCd]);
    // =================== LDongCode Axios GET ===================
    const getLDongCodeByAxios = async () => {
        if (selectedLdNo == "") return;
        try {
            const response = await axios.get(`http://localhost:8080/ldongcode/getbyldno?ldNo=${selectedLdNo}`, option);
            SetSelectedGps(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('getLDongCodeByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end
    // =================== useEffect - [selectedGps] : 중심 좌표 이동 ===================
    useEffect(() => {
        // 1. 선택된 좌표(selectedGps)가 없으면 아무것도 안 함
        if (!selectedGps || !window.kakao || !mapRef.current) return;
        // 2. window.kakao.maps.LatLng를 사용해 카카오 지도용 좌표 객체를 생성합니다.
        const newCoords = new window.kakao.maps.LatLng(
            selectedGps.mapy, // selectedGps의 mapy
            selectedGps.mapx  // selectedGps의 mapx
        );

        // 3. mapRef에 저장해 둔 지도의 panTo() 함수를 호출하여 지도를 부드럽게 이동시킵니다.
        mapRef.current.panTo(newCoords);

    }, [selectedGps]); // 4. selectedGps 변경될 때마다 이 효과를 실행


    // =================== ldNoMarkers Axios GET ===================
    const getLdNoMarkersByAxios = async () => {
        if (selectedLdNo == "") return;
        try {
            const response = await axios.get(`http://localhost:8080/markersgps/getbycurrentldong?ldNo=${selectedLdNo}`, option);
            SetMarkers(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('getLdNoMarkersByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end
    // =================== useEffect - [selectedLdNo] : 시군구 좌표 가져오기 ===================
    useEffect(() => {
        getLDongCodeByAxios();
        getLdNoMarkersByAxios();
    }, [selectedLdNo]);

    // =================== bounds Axios GET ===================
    // 5. 함수를 useCallback으로 감싸서 불필요한 재생성을 방지합니다.
    const getBoundsByAxios = useCallback(async () => {
        if (bounds.south === "0.0") return;
        try {
            const response = await axios.get(`http://localhost:8080/markersgps/getbycurrentlatlng?south=${bounds.south}&north=${bounds.north}&west=${bounds.west}&east=${bounds.east}`, option);
            SetMarkers(response.data); // 이 state 변경이 마커 업데이트 effect를 트리거합니다.
        } catch (error) {
            console.log(error);
        } // try-catch end
    }, [bounds]); // bounds가 변경될 때만 함수를 새로 생성합니다.

    // =================== useEffect - [bounds] : 데이터 가져오기 ===================
    useEffect(() => {
        getBoundsByAxios();
    }, [bounds, getBoundsByAxios]);

    // =================== useEffect - [currentLocation] : 지도 초기화 ===================
    // 6. <Map> 컴포넌트의 onCreate, onIdle 프롭을 대체합니다.
    useEffect(() => {
        // 현재 위치 로딩이 끝났고, mapContainerRef가 준비되었고, kakao 스크립트가 로드되었는지 확인
        if (currentLocation.isLoading || !mapContainerRef.current || !isScriptLoaded || !window.kakao) return;

        const { kakao } = window;
        const mapContainer = mapContainerRef.current;
        const mapOption = {
            center: new kakao.maps.LatLng(currentLocation.center.lat, currentLocation.center.lng),
            level: 5
        };

        // 7. 지도 인스턴스 생성
        const map = new kakao.maps.Map(mapContainer, mapOption);
        mapRef.current = map;

        // 8. 클러스터러 인스턴스 생성
        const clusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 4
        }); // clusterer end
        clustererRef.current = clusterer;

        // 지도에 원 표시 로직
        let circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(currentLocation.center.lat, currentLocation.center.lng),
            radius: 2000,              // 반경 2KM 표시
            strokeWeight: 3,           // 선의 두께
            strokeColor: '#75B8FA',  // 선의 색깔 -> 추후 원하는 색으로 변경
            strokeOpacity: 0.9,        // 선의 불투명도 -> 0에 가까울수록 투명(범위 : 0 ~ 1)
            strokeStyle: 'dashed',     // 선의 스타일
            fillColor: '#CFE7FF',    // 채우기 색깔 -> 추후 원하는 색으로 변경
            fillOpacity: 0.3           // 채우기 불투명도 -> 0에 가까울수록 투명(범위 : 0 ~ 1)
        }); // circle end

        circle.setMap(map);

        // 9. 'idle' 이벤트 리스너 등록
        kakao.maps.event.addListener(map, 'idle', () => {
            const mapBounds = map.getBounds();
            const sw = mapBounds.getSouthWest();
            const ne = mapBounds.getNorthEast();

            // SetBounds를 호출하여 [bounds] effect를 트리거 -> getBoundsByAxios 호출
            SetBounds({
                south: sw.getLat(),
                west: sw.getLng(),
                north: ne.getLat(),
                east: ne.getLng()
            }); // SetBounds end
        }); // addListener end

        // 10. (중요) 지도 생성 직후 'idle' 이벤트를 강제로 한번 실행(하거나 bounds를 직접 설정)
        // 기존 [initialMap] effect의 로직을 대체합니다.
        const initialBounds = map.getBounds();
        const sw = initialBounds.getSouthWest();
        const ne = initialBounds.getNorthEast();
        SetBounds({
            south: sw.getLat(),
            west: sw.getLng(),
            north: ne.getLat(),
            east: ne.getLng()
        });
    }, [currentLocation.isLoading, currentLocation.center, isScriptLoaded]); // Geolocation 완료 시 1회 실행

    // =================== useEffect - [markers] : 마커 업데이트 ===================
    // 11. <MarkerClusterer> 내부의 map() 렌더링 로직을 대체합니다.
    useEffect(() => {
        // 클러스터러 인스턴스나 kakao 객체가 없으면 실행 중지
        if (!clustererRef.current || !window.kakao) return;

        const { kakao } = window;
        const clusterer = clustererRef.current;

        // 12. 기존 마커 모두 제거
        clusterer.clear();

        // 새 마커 데이터가 없으면 여기서 종료
        if (!markers || markers.length === 0) return;

        const imageSize = new kakao.maps.Size(33, 50); 

        // 13. JS SDK용 카카오 마커 객체 배열 생성
        const kakaoMarkers = markers.map(marker => {
            const position = new kakao.maps.LatLng(marker.mapy, marker.mapx);

            // 이미지 소스 선택
            // todo .includes()를 통한 mkURL sort 필요
            const src = markerImages[marker.defaultMarker] || markerImages['travelCourse.png'];
            const markerImage = new kakao.maps.MarkerImage(src, imageSize);

            return new kakao.maps.Marker({
                position: position,
                image: markerImage,
                title: '나중에 변경' // 실제 데이터로 변경
            }); // return end
        }); // map end

        // 14. 클러스터러에 새 마커 추가
        clusterer.addMarkers(kakaoMarkers);

    }, [markers]); // 'markers' state가 변경될 때마다 실행
    // =================== Select Markup Change ===================
    const changeRegnCd = (e) => {
        SetSelectedRegnCd(e.target.value);
        console.log(e.target.value);
    } // func end
    const changeLdNo = (e) => {
        SetSelectedLdNo(e.target.value);
        console.log(e.target.value);
    } // func end


    // =================== return ===================
    if (currentLocation.isLoading) {
        return <div>현재 위치를 불러오는 중입니다...</div>;
    } // if end

    return (
        <>
            {/* 15. 지도가 렌더링될 실제 DOM 요소 */}
            <div
                ref={mapContainerRef}
                style={{
                    width: '100%',
                    height: '100vh'
                }}
            />
            <select onChange={changeRegnCd} value={selectedRegnCd}>
                <option value="" disabled> 시구 선택</option>
                {
                    lDongRegnCd.map((regn) => {
                        return <option key={regn.ldongregncd} value={regn.ldongregncd}>
                            {regn.ldongregnnm}
                        </option>
                    })
                }
            </select>
            <select onChange={changeLdNo} value={selectedLdNo}>
                <option value="" disabled> 시군구 선택</option>
                {
                    lDongSignguCd.map((signgu) => {
                        return <option key={signgu.ldNo} value={signgu.ldNo}>
                            {signgu.ldongsigngunm}
                        </option>
                    })
                }
            </select>
        </>
    ); // return end
} // func end