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

export default function KakaoMap(props) {
    UseKakaoLoader(); // 1. kakao.maps 스크립트를 로드합니다.

    // =================== useState 선언부 ===================
    const [markers, setMarkers] = useState(null);
    const [bounds, setBounds] = useState({
        south: "0.0",
        west: "0.0",
        north: "0.0",
        east: "0.0"
    }); // useState end
    const [currentLocation, setCurrentLocation] = useState({
        center: { lat: 37.489457, lng: 126.724494 },
        errMsg: null,
        isLoading: true
    }); // useState end

    // =================== useRef 선언부 ===================
    // 2. 지도를 담을 DOM 엘리먼트를 참조합니다.
    const mapContainerRef = useRef(null); 
    // 3. 생성된 지도와 클러스터러 인스턴스를 저장합니다. (state 대신 ref 사용)
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

    // =================== useEffect - [] : 현재 위치 가져오기 ===================
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                setCurrentLocation((prev) => ({
                    ...prev,
                    center: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    },
                    isLoading: false
                }));
            }, (error) => {
                setCurrentLocation((prev) => ({
                    ...prev,
                    errMsg: error.message,
                    isLoading: false
                })); 
            });
        } else {
            setCurrentLocation((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할 수 없는 상태입니다.",
                isLoading: false
            })); // setCurrentLocation end
        } // if end
    }, []); // useEffect end

    // =================== bounds Axios GET ===================
    // 5. 함수를 useCallback으로 감싸서 불필요한 재생성을 방지합니다.
    const getBoundsByAxios = useCallback(async () => {
        if (bounds.south === "0.0") return;
        try {
            const option = { withCredentials: true };
            const response = await axios.get(`http://localhost:8080/markersgps/getbycurrentlatlng?south=${bounds.south}&north=${bounds.north}&west=${bounds.west}&east=${bounds.east}`, option);
            setMarkers(response.data); // 이 state 변경이 마커 업데이트 effect를 트리거합니다.
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
        if (currentLocation.isLoading || !mapContainerRef.current || !window.kakao) return;

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

        // 9. 'idle' 이벤트 리스너 등록 (onIdle 대체)
        kakao.maps.event.addListener(map, 'idle', () => {
            const mapBounds = map.getBounds();
            const sw = mapBounds.getSouthWest();
            const ne = mapBounds.getNorthEast();
            
            // setBounds를 호출하여 [bounds] effect를 트리거 -> getBoundsByAxios 호출
            setBounds({
                south: sw.getLat(),
                west: sw.getLng(),
                north: ne.getLat(),
                east: ne.getLng()
            }); // setBounds end
        }); // addListener end

        // 10. (중요) 지도 생성 직후 'idle' 이벤트를 강제로 한번 실행(하거나 bounds를 직접 설정)
        // 기존 [initialMap] effect의 로직을 대체합니다.
        const initialBounds = map.getBounds();
        const sw = initialBounds.getSouthWest();
        const ne = initialBounds.getNorthEast();
        setBounds({
            south: sw.getLat(),
            west: sw.getLng(),
            north: ne.getLat(),
            east: ne.getLng()
        });
    }, [currentLocation.isLoading, currentLocation.center]); // Geolocation 완료 시 1회 실행

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
        
        const imageSize = new kakao.maps.Size(80, 80);

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
                    width: '1000px',
                    height: '600px'
                }}
            />

            {/* 나머지 UI는 동일 */}
            <h3>북쪽 : {bounds.north}</h3>
            <h3>남쪽 : {bounds.south}</h3>
            <h3>동쪽 : {bounds.east}</h3>
            <h3>서쪽 : {bounds.west}</h3>
            <button onClick={getBoundsByAxios}>버튼</button>
        </>
    ); // return end
} // func end