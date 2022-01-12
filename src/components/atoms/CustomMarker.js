/*global kakao*/
import React from 'react';
import {MapMarker} from "react-kakao-maps-sdk";

/*
    날짜 : 2022/01/11 4:13 PM
    작성자 : 지상은
    작성내용 : 지도에 표시될 마커
            type과 position 을 props로 필요로함
 */

function CustomMarker(props) { //position={{lat:**,lng:**}}
    if (props.type === 'center') {//type={"center"}
        return(
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/mcKSN3.png",
                    size: {
                        width: 30,
                        height: 30,
                    },
                }}
            />)
    } else if (props.type === 'agent') {//type={"agent"}
        return(
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/QRQ7cN.png",
                    size: {
                        width: 30,
                        height: 30,
                    },
                }}
            />
        )
    } else if (props.type === 'agentSelected') {//type={"agentSelected"}
        return(
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/gFpslz.png",
                    size:{
                        width: 30,
                        height: 30,
                    },
                }}
            />
        )
    }
}

export default CustomMarker;