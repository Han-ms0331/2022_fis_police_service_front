/*global kakao */
import React, { useEffect } from "react";
import {Map, MapMarker} from "react-kakao-maps-sdk";

/*
    날짜 : 2022/01/11 4:34 PM
    작성자 : 지상은
    작성내용 : Map을 띄워준다
             center, zoomlevel, size 설정 필요
*/

function CustomMap(props){
    return (
        <Map // 지도를 표시할 Container
            center={{
                // 지도의 중심좌표
                lat: props.lat,
                lng: props.lng,
            }}
            style={{
                // 지도의 크기
                width: "70%",
                height: "550px",
            }}
            level={props.level} // 지도의 확대 레벨
        >
        </Map>
    )
}

export default CustomMap;