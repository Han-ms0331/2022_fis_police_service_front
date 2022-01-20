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

function CustomMap(props) {
    /*const [position, setPosition] = useRecoilState(positionState);*///   지도의 바뀌는 센터 값 추적
    let scheduleData = []
    const [firstInfo, setFirstInfo] = useState("");
    const [firstLocation, setFirstLocation] = useState([]);
    const [position, setPosition] = useState(
        {
            center: {lat: props.lat, lng: props.lng},
            isPanto: true,
        }
    )

    /*props.fdata().then((res)=>{
        console.log("gg")
        setFirstInfo(props.thisCenter)
        console.log(firstInfo)
        setFirstLocation(props.thisCenterLocation)
        console.log(props.thisCenterLocation)
        setFirstLocation([props.thisCenterLocation])
        console.log(firstLocation)
    })*/

        /*props.fcdata.push({
            ...props.fcdata,
            latlng: props.floc,
            type: "center",
            contents:
                <div>
                    <div>시설 이름: {props.fcdata.c_name}</div>
                    <div>예상 인원: {}</div>
                    <div>방문 예정 시간: {}</div>
                </div>
        })*/

    /*selCenter.push({
        ...selCenter,
        latlng:{lat:props.floc.lat,lng:props.floc.lng},
        type:"center",
        contents:
            <div>
                <div>시설 이름: {props.fcdata.c_name}</div>
                <div>예상 인원: {}</div>
                <div>방문 예정 시간: {}</div>
            </div>
    })*/

    let cInfo = []
    props.cdata.forEach((arr, index, buf) => {
        props.sdata.forEach((arr1, index1, buf1) => {
            if (arr.c_id === arr1.c_id) {
                props.cdata.push({
                    ...arr,
                    c_order: (index1 + 1)
                })
            }
        })
    })


    props.cdata.forEach((arr, index, buf) => {
        cInfo.push({
            ...arr,
            latlng: {lat: arr.c_latitude, lng: arr.c_longitude},
            type: "center",
            contents:
                <div>
                    <div>{arr.c_order}</div>
                    <div>시설 이름: {arr.c_name}</div>
                    <div>예상 인원: {}</div>
                    <div>방문 예정 시간: {}</div>
                </div>
        })
    })


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
                    width: "95%",
                    height: "950px",
                }}
                level={props.level} // 지도의 확대 레벨
                onCenterChanged={(map) => setPosition({ // 드래그로 인해 바뀌는 지도의 센터 값 추적
                    center: {
                        lat: map.getCenter().getLat(),
                        lng: map.getCenter().getLng(),
                    }
                })}
            >
                <div style={{marginTop: "5px"}}>
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
                {/*return 버튼*/}
                <CustomPolyLine
                    path={[
                        props.rdata,
                    ]}
                /> {/*선택된 현장 요원의 동선 표시 -> 요원 선택 시 나타나야 함*/}
               {/* <CustomMarker
                    key="main"
                    type={props.fcdata.type}
                    position={props.fcdata.latlng}
                    color={props.fcdata.contents}
                />*/}
                {cInfo.map((position, index) => (
                    <>
                    <CustomMarker
                        key={index}
                        type={position.type}
                        position={position.latlng} // 마커를 표시할 위치
                        content={position.contents} // type이 center일 경우 전달받은 시설정보를 띄워준다

                    />
                    </>
                ))} {/*선택된 센터의 주변 시설 정보 표시*/}
                {props.adata.map((position, index) => (
                    <CustomMarker
                        key={index}
                        type={position.type}
                        position={position.latlng} // 마커를 표시할 위치
                    />
                ))} {/*선택된 현장 요원과 주변 현장 요원 표시*/}
            </Map>
        </>
    )
}

export default CustomMap;