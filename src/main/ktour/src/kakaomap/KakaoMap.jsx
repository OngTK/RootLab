import React, {useEffect, useState} from 'react';
import { Map } from "react-kakao-maps-sdk";
import UseKakaoLoader from './UseKakaoLoader';
import axios from "axios";

export default function KakaoMap(props){
    UseKakaoLoader();
    // =================== 렌더링 기준 사방좌표 구하기 ===================
    const [bounds, setBounds] = useState({
        south : "0.0",
        west : "0.0",
        north : "0.0",
        east : "0.0"
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
// =================== useEffect - [initialMap] ===================
    useEffect( () => {
        // geolocation을 통해 위도·경도를 얻을 수 있다면
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((location) => {
                setCurrentLocation((prev) => ({
                    ...prev,
                    center: {
                        lat: location.coords.latitude,  // 위도
                        lng: location.coords.longitude  // 경도
                    },
                    isLoading: false
                })) // setCurrentLocation end
            }, // location end
            (error) => {
                setCurrentLocation((prev) => ({
                    ...prev,
                    errMsg: error.message,
                    isLoading: false
                })) // setCurrentLocation end 
            } // error end
        ) // getCurrentPosition end
        // initialMap이 생성되지 않았다면 실행 X
        if (!initialMap) return;
        // initialMap이 생성되었다면, 초기 위치 기준으로 bounds 얻기
        const bounds = initialMap.getBounds();
        const southWest = bounds.getSouthWest();
        const northEast = bounds.getNorthEast();
        // 얻은 bounds를 통해 bounds 업데이트하기
        setBounds({
            south : southWest.getLat(),
            west : southWest.getLng(),
            north : northEast.getLat(),
            east : northEast.getLng()
        });
        } else {    // geolocation을 통해 위도·경도를 얻을 수 없다면
            setCurrentLocation((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할 수 없는 상태입니다.",
                isLoading: false
            })) // setCurrentLocation end
        } // if end
    }, [initialMap]); // useEffect end
    // =================== bounds Axios POST ===================
    const postBounds = async () => {
        try {
            const option = {withCredentials: true};
            const response = await axios.get(`http://localhost:8080/markersgps/getbycurrentlatlng?south=${bounds.south}&north=${bounds.north}&west=${bounds.west}&east=${bounds.east}`, option);
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        } // try-catch end
    } // func end

    // =================== return ===================
    return(
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
            onBoundsChanged={(map) => {
                const bounds = map.getBounds();
                const southWest = bounds.getSouthWest();
                const northEast = bounds.getNorthEast();
                setBounds({
                    south : southWest.getLat(),
                    west : southWest.getLng(),
                    north : northEast.getLat(),
                    east : northEast.getLng()
                });
            }}
            onCreate={setInitialMap}
        />
        <h3>북쪽 : {bounds.north}</h3>
        <h3>남쪽 : {bounds.south}</h3>
        <h3>동쪽 : {bounds.east}</h3>
        <h3>서쪽 : {bounds.west}</h3>
        <button onClick={postBounds}>버튼</button>
        </>
    ) // return end
} // func end