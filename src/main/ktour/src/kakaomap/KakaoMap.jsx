import React, {useState} from 'react';
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
    });

    return(
        <>
        <Map
            center={{ lat: 33.450701, lng: 126.570667 }}
            style={{ width: '1000px', height: '600px' }}
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
        <h3>{bounds.south}</h3>
        <h3>{bounds.west}</h3>
        <h3>{bounds.north}</h3>
        <h3>{bounds.east}</h3>
        </>
    ) // return end
} // func end