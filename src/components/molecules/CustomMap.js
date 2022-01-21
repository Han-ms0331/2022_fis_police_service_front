/*global kakao */
import React, {useEffect, useState} from "react";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import CustomPolyLine from "../atoms/CustomPolyLine";
import CustomMarker from "../atoms/CustomMarker";
import {useRecoilState} from "recoil";
import {SelectedCenterInfo} from "../../store/SelectedCenterStore";
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
    const [position, setPosition] = useState(
        {
            center: {lat: props.lat, lng: props.lng},
            isPanto: true,
        }
    )

    let cInfo = []
    let aInfo=[]
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
    const handleClick = () => {
        setPosition({
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            isPanto: true,
        });
    }
    props.adata.forEach((arr,index,buf)=>{
        aInfo.push({
            ...arr,
            latlng:{lat:arr.a_latitude,lng:arr.a_longitude},
            type:"agent"
        })
        console.log(aInfo)
    })

    if (props.clickedAdata != null){
        aInfo.forEach((arr,index,buf)=>{
            if(props.clickedAdata.agent_id==arr.agent_id){
                arr.type="agentSelected"
            }
        })
    }





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
                        props.rdata,
                    ]}
                /> {/*선택된 현장 요원의 동선 표시 -> 요원 선택 시 나타나야 함*/}
                <CustomMarker
                    type={"center"}
                    position={{lat: props.lat, lng: props.lng}}
                    content={
                        <div>
                            <div>시설이름 : {selCenterInfo.c_name}</div>
                            <div>예상인원 : {selCenterInfo.c_people}명</div>
                        </div>
                    }
                />

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
                {aInfo.map((position, index) => (
                    <CustomMarker
                        key={index}
                        type={position.type}
                        position={position.latlng} // 마커를 표시할 위치
                    />
                ))} {/*선택된 현장 요원과 주변 현장 요원 표시*/}
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