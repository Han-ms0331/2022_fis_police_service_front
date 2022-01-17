/*global kakao */
import React, {useEffect, useState} from "react";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import CustomButton from "../atoms/CustomButton";
import CustomPolyLine from "../atoms/CustomPolyLine";
import CustomMarker from "../atoms/CustomMarker";

/*
    날짜 : 2022/01/11 4:34 PM
    작성자 : 지상은
    작성내용 : Map을 띄워준다
             center, zoomlevel, size 설정 필요
*/

function CustomMap(props){
    const [position, setPosition] = useState({
        center: {lat: props.lat, lng: props.lng},
        isPanto: true,
    })
    /*const [mid,setMid]=useState({
        center:{lat: 33.450492180670004, lng: 126.5716140938378},
        isPanto:false,
    })*/
    return (
        <>
            <Map // 지도를 표시할 Container
                center={
                    // 선택된 센터의 경/위도
                    {
                        lat: position.center.lat,
                        lng: position.center.lng,
                    }

                }
                style={{
                    // 지도의 크기
                    width: "65%",
                    height: "590px",
                }}
                level={props.level} // 지도의 확대 레벨
                onCenterChanged={(map) => setPosition({
                    center: {
                        lat: map.getCenter().getLat(),
                        lng: map.getCenter().getLng(),
                    }
                })}
            >
                <div style={{marginLeft:"-950px"}}>
                    <CustomButton type={"normal"} width={"20px"} height={"20px"} color={"white"} borderRadius={"2"}
                                  backgroundColor={"orange"} content={"return"}
                                  onClick={() =>
                                      setPosition({
                                          center: {
                                              lat: props.lat,
                                              lng: props.lng,
                                          },
                                          isPanto: true,
                                      })
                                  }
                    />
                </div>
                <CustomPolyLine
                    path={[
                        props.rdata,
                    ]}
                />
                {props.cdata.map((position, index) => (
                    <CustomMarker
                        type={position.type}
                        position={position.latlng} // 마커를 표시할 위치
                        content={position.contents} // type이 center일 경우 전달받은 시설정보를 띄워준다

                    />
                ))}
                {props.adata.map((position, index) => (
                    <CustomMarker
                        type={position.type}
                        position={position.latlng} // 마커를 표시할 위치
                    />
                ))}
            </Map>
            {/*{position && <p>{'변경된 지도 중심좌표는 ' + position.lat + ' 이고, 경도는 ' + position.lng + ' 입니다'}</p>}*/}
        </>
    )
}

export default CustomMap;