import React, {useEffect, useState} from 'react';
import { Map } from "react-kakao-maps-sdk";
import UseKakaoLoader from './UseKakaoLoader';

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
    const [currentLocation, setCurrentLocation] = useState({
        center: {
            lat: 37.489457,
            lng: 126.724494
        },
        errMsg: null,
        isLoading: true
    }); // useState end
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
        } else {    // geolocation을 통해 위도·경도를 얻을 수 없다면
            setCurrentLocation((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할 수 없는 상태입니다.",
                isLoading: false
            })) // setCurrentLocation end
        } // if end
    }, []); // useEffect end












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
                const newBounds = {
                    south : southWest.getLat(),
                    west : southWest.getLng(),
                    north : northEast.getLat(),
                    east : northEast.getLng()
                };
                setBounds(newBounds);
            }}
        />
        <h3>북쪽 : {bounds.north}</h3>
        <h3>남쪽 : {bounds.south}</h3>
        <h3>동쪽 : {bounds.east}</h3>
        <h3>서쪽 : {bounds.west}</h3>
        </>
    ) // return end
} // func end