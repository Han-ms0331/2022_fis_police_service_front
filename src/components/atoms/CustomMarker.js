/*global kakao*/
import React, {useState} from 'react';
import {MapMarker} from "react-kakao-maps-sdk";


/*
    날짜 : 2022/01/11 4:13 PM
    작성자 : 지상은
    작성내용 : 지도에 표시될 마커
            type과 position 을 props로 필요로함 그리고 type 이 center일 경우 content를 props로 전달 받아 시설정보를 표시해줌
 */

function CustomMarker(props) {

    const [isOpen,setIsOpen]=useState(false)
    if (props.type === 'center') {
        return (
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/keEB1A.png",
                    size: {
                        width: 40,
                        height: 40,
                    },
                }}
                clickable={true}
                onMouseOver={
                    ()=>setIsOpen(true)
                }
                onMouseOut={
                    ()=>setIsOpen(false)
                }
            >
                {isOpen && <div style={{padding: "3px", color: "#000" }}>
                    {props.content}
                </div>}
            </MapMarker>
        )
    } else if (props.type === 'agent') {
        return (
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/tkZYb6.png",
                    size: {
                        width: 35,
                        height: 35,
                    },
                }}
            />
        )
    } else if (props.type === 'agentSelected') {
        return (
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/9RnV0H.png",
                    size: {
                        width: 35,
                        height: 35,
                    },
                }}
            />
        )
    }
}

export default CustomMarker;
