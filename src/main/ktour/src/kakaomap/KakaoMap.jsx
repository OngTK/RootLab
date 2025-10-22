import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import UseKakaoLoader from './UseKakaoLoader';
import axios from "axios";
import xxx from '../assets/contentTypeMarker/festival.png'
export default function KakaoMap(props) {
    UseKakaoLoader();
    // =================== useState 선언부 ===================
    const [markers, setMarkers] = useState(null);
    // =================== 렌더링 기준 사방좌표 구하기 ===================
    const [bounds, setBounds] = useState({
        south: "0.0",
        west: "0.0",
        north: "0.0",
        east: "0.0"
    }); // useState end
    // =================== 현재 위도경도 구하기 ===================
    const [initialMap, setInitialMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({
        center: {
            lat: 37.489457,
            lng: 126.724494
        },
        errMsg: null,
        isLoading: true
    }); // useState end
    // =================== useEffect - [] : 컴포넌트 마운트될 때, 최초 1번 실행 ===================
    useEffect(() => {
        // geolocation을 통해 위도·경도를 얻을 수 있다면
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                setCurrentLocation((prev) => ({
                    ...prev,
                    center: {
                        lat: location.coords.latitude,  // 위도
                        lng: location.coords.longitude  // 경도
                    },
                    isLoading: false
                })); // setCurrentLocation end
            }, (error) => {
                setCurrentLocation((prev) => ({
                    ...prev,
                    errMsg: error.message,
                    isLoading: false
                })); // setCurrentLocation end 
            } // error end
            ) // getCurrentPosition end
        } else {    // geolocation을 통해 위도·경도를 얻을 수 없다면
            setCurrentLocation((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할 수 없는 상태입니다.",
                isLoading: false
            })) // setCurrentLocation end
        } // if end
    }, []) // useEffect end
    // =================== bounds Axios GET ===================
    const getBoundsByAxios = async () => {
        // bounds가 유효하지 않으면, API 호출 X
        if (bounds.south === 0.0) return;
        try {
            const option = { withCredentials: true };
            const response = await axios.get(`http://localhost:8080/markersgps/getbycurrentlatlng?south=${bounds.south}&north=${bounds.north}&west=${bounds.west}&east=${bounds.east}`, option);
            const data = response.data;
            setMarkers(data);
        } catch (error) {
            console.log(error);
        } // try-catch end
    } // func end
    // =================== useEffect - [bounds] ===================
    useEffect(() => {
        getBoundsByAxios();
        console.log(markers);
    }, [bounds])
    // =================== return ===================
    if (currentLocation.isLoading) {
        return <div>현재 위치를 불러오는 중입니다...</div>;
    } // if end
    return (
        <>
            <Map
                center={
                    currentLocation.center
                }
                style={{
                    width: '1000px',
                    height: '600px'
                }}
                level={3}
                onIdle={(map) => {
                    const bounds = map.getBounds();
                    const southWest = bounds.getSouthWest();
                    const northEast = bounds.getNorthEast();
                    setBounds({
                        south: southWest.getLat(),
                        west: southWest.getLng(),
                        north: northEast.getLat(),
                        east: northEast.getLng()
                    });
                }}
                onCreate={setInitialMap}
            >
                {markers && markers.map((marker, index) => (
                    <MapMarker
                        key={marker.pno}
                        position={{
                            lat: marker.mapy,
                            lng: marker.mapx
                        }}
                        image={{
                            src: xxx,
                            size: {
                                width: 80,
                                height: 80
                            }
                        }}
                        title={'나중에 변경'}
                    />
                ))}
            </Map>
            <h3>북쪽 : {bounds.north}</h3>
            <h3>남쪽 : {bounds.south}</h3>
            <h3>동쪽 : {bounds.east}</h3>
            <h3>서쪽 : {bounds.west}</h3>
            <button onClick={getBoundsByAxios}>버튼</button>
        </>
    ) // return end
} // func end