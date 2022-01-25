/*global kakao */
import React, {useEffect, useState} from "react";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import CustomPolyLine from "../atoms/CustomPolyLine";
import CustomMarker from "../atoms/CustomMarker";
import {useRecoilState} from "recoil";
import {SelectedCenterId, SelectedCenterInfo} from "../../store/SelectedCenterStore";
import {Style} from "../../Style";
import {MdGpsFixed} from "react-icons/md";
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";


/*
    날짜 : 2022/01/11 4:34 PM
    작성자 : 지상은
    작성내용 : Map을 띄워준다
             center, zoomlevel, size 설정 필요
*/

function CustomMap(props) {
    const [selCenterInfo, setSelCenterInfo] = useRecoilState(SelectedCenterInfo);
    const [selectedCenterId, setSelectedCenterId] = useRecoilState(SelectedCenterId);
    const [position, setPosition] = useState(
        {
            center: {lat: props.lat, lng: props.lng},
            isPanto: true,
        }
    ) //선택한 센터의 좌표를 초기 값으로 갖고, 지도의 중앙값을 추적하는 state


    let aInfo = [] // 현장요원 리스트
    let road = [] // 동선 저장
    let center = {
        lat: props.lat,
        lng: props.lng
    } // position 은 계속 변화함, 선택한 센터의 중앙값을 고정하여 저장
    let roadCenter = [] // 동선에 해당하는 center 마커 표시

    const handleClick = () => {
        setPosition({
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            isPanto: true,
        });
    }

    if (props.adata != null) {
        props.adata.forEach((arr, index, buf) => {
            aInfo.push({
                ...arr,
                latlng: {lat: arr.a_latitude, lng: arr.a_longitude},
                type: "agent"
            })
        })
    } // 현장요원 리스트에 타입과 latlng 형식 추가


    if (props.clickedAdata != null) {
        aInfo.forEach((arr, index, buf) => {
            if (props.clickedAdata.agent_id === arr.agent_id) {
                arr.type = "agentSelected"
            }
        }) // 만약 선택된 햔장요원과 현장요원 리스트에 있는 agent_id가 같을 경우 현장요원 리스트의 해당하는 현장요원 타입을 agentSelected로 변경
        if (props.clickedAdata.scheduleList != null) {
            props.clickedAdata.scheduleList.forEach((list, index, buf) => {
                road.push({
                    ...list,
                    schedule_id:list.schedule_id,
                    lat: list.center.a_latitude,
                    lng: list.center.a_longitude,
                }) // 동선 표시를 해야하는 위치 저장
                roadCenter.push({
                    schedule_id:list.schedule_id,
                    latlng: {lat: list.center.a_latitude, lng: list.center.a_longitude},
                    c_name: list.center.c_name,
                    c_people: list.estimate_num
                }) // 센터 표시를 해야하는 위치, 해당 센터의 이름과 예상인원 저장
            })
/*            for (let i = 0; i < 2; i++) {
                road.push({
                    lat: props.clickedAdata.scheduleList.center.a_latitude,
                    lng: props.clickedAdata.scheduleList.center.a_longitude,
                })
            }
            for (let j = 0; j < 2; j++) {
                roadCenter.push({
                    latlng: {
                        lat: props.clickedAdata.scheduleList.center.a_latitude,
                        lng: props.clickedAdata.scheduleList.center.a_longitude
                    },
                    c_name: props.clickedAdata.scheduleList.center.c_name,
                    c_people: props.clickedAdata.scheduleList.c_people,
                })
}*/

        }
    }

    /*road.splice(1, 0, center); // 동선 중간에 현재 선택된 센터의 위치 넣어줌
    roadCenter.splice(1, 0, {
        latlng: {lat: center.lat, lng: center.lng},
        c_name: selCenterInfo.c_name,
        c_people: selCenterInfo.c_people
    }); // 동선 중간에 현재 선택된 센터의 정보 넣어줌*/

    let modifiedAround = props.aroundCdata;
    roadCenter.forEach((value,index)=>{
        modifiedAround=modifiedAround.filter((e) => e.c_name!== value.c_name)

    })
    return (
        <Container>
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
                    width: "1200px",
                    height: "880px",
                }}
                level={props.level} // 지도의 확대 레벨
                onCenterChanged={(map) => setPosition({ // 드래그로 인해 바뀌는 지도의 센터 값 추적
                    center: {
                        lat: map.getCenter().getLat(),
                        lng: map.getCenter().getLng(),
                    }
                })}
            >
                {/*return 버튼*/}
                <CustomPolyLine
                    path={[
                        road,
                    ]}
                /> {/*선택된 현장 요원의 동선 표시 -> 요원 선택 시 나타나야 함*/}


                <CustomMarker
                    type={"center"}
                    position={{lat: props.lat, lng: props.lng}}
                    content={
                        <div>
                            <div>시설이름 : {selCenterInfo.c_name}</div>
                            <div>예상인원 : {selCenterInfo.c_people}명</div>
                            <div>{selCenterInfo.distance}</div>
                        </div>
                    }
                /> {/*선택된 센터 표시*/}

                {modifiedAround.map((position, index) => (
                    <>
                        <CustomMarker
                            key={index}
                            type={position.type}
                            position={position.latlng} // 마커를 표시할 위치
                            content={position.contents}

                        />
                    </>
                ))} {/*선택된 센터의 주변 시설 정보 표시*/}

                {aInfo.map((position, index) => (
                    <CustomMarker
                        key={index}
                        type={position.type}
                        position={position.latlng} // 마커를 표시할 위치
                    />
                ))} {/*선택된 현장 요원과 주변 현장 요원 표시*/}

                {
                    roadCenter.map((center, index) => (
                        <CustomMarker
                            type={"center"}
                            position={center.latlng}
                            content={
                                <div>
                                    <div>{index + 1}</div>
                                    <div>시설이름 : {center.c_name}</div>
                                    <div>예상인원: {center.c_people} 명</div>
                                </div>
                            }
                        />
                    ))
                }
            </Map>
            <MdGpsFixed onClick={handleClick}/>
        </Container>
    )
}

const Container = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 10px;

  & > div { /*지도*/
    z-index: 2;
  }
  
  & > svg { /*현재위치 버튼*/
    width: 27px;
    height: 27px;
    color: #fff;
    border-radius: 20px;
    padding: 5px;
    background-color: ${Style.color2};
    cursor: pointer;
    z-index: 3;
    position: absolute;
    bottom: 30px;
    left: 30px;
  }
`;
export default CustomMap;