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
                    src: "https://ifh.cc/g/TgJfMo.png",
                    size: {
                        width: 70,
                        height: 70,
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
    }
    else if (props.type === 'centerSelected') {
        return (
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/VyEmoZ.png",
                    size: {
                        width: 70,
                        height: 70,
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
    }
    else if (props.type === 'mainCenter') {
        return (
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/p3UNPH.png",
                    size: {
                        width: 70,
                        height: 70,
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
    }
    else if (props.type === 'agent') {
        return (
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/TSz6dP.png",
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
    } else if (props.type === 'agentSelected') {
        return (
            <MapMarker
                position={props.position}
                image={{
                    src: "https://ifh.cc/g/HDUkhx.png",
                    size: {
                        width: 70,
                        height: 70,
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
    }
}

export default CustomMarker;
