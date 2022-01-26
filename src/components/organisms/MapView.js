import React, {useEffect, useState} from 'react';
import RangeController from "../molecules/RangeController";
import CustomMap from "../molecules/CustomMap";
import {SelectedCenterInfo, SelectedCenterList, SelectedCenterListInfo} from "../../store/SelectedCenterStore";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import { MdGpsFixed } from "react-icons/md";
import {ClickedAgentInfo, SelectedAgentInfo} from "../../store/SelectedAgentStore";


const agentList=[
    {
        agent_id: 6,
        a_name: "asd",
        a_ph: "123",
        a_code: "111",
        a_address: "분당구 불정로 6",
        a_hasCar: "CAR",
        a_equipment: "",
        a_receiveDate: "2022-01-20T17:42:51.524995",
        a_latitude: 33.44976681228811,
        a_longitude: 126.57173596860564,
        scheduleList: []
    },
]

const selAgent=[
    {
        agent_id: 6,
        a_name: "asd",
        a_ph: "123",
        a_code: "111",
        a_address: "분당구 불정로 6",
        a_hasCar: "CAR",
        a_equipment: "",
        a_receiveDate: "2022-01-20T17:42:51.524995",
        a_latitude: 33.44976681228811,
        a_longitude: 126.57173596860564,
        scheduleList: []
    },
]


const thisCenter = [
    {
        c_id: "2",
        c_address: "f",
        c_ph: "",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.450492180670004",
        c_longitude: "126.5716140938378",
    },
]

const selCenter = [
    {
        c_id: "1",
        c_address: "제즈더",
        c_ph: "000",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.450705",
        c_longitude: "126.570677",
    },
]
/*let road = []

selCenter.splice(1, 0, thisCenter[0]); // 선택된 현장 요원의 스케쥴 사이에 선택된 센터 정보 집어 넣기

selCenter.forEach((arr, index, buf) => { // 동선 표시를 위해 위도경도 입력 형태 변경
    road.push({
        ...arr,
        lat: arr.c_latitude, lng: arr.c_longitude,
    })
})*/


function MapView(props) {

    const [range, setRange] = useState(2);// 지도의 비율 설정
    const [selectedCenterList, setSelectedCenterList] = useRecoilState(SelectedCenterList);
    const [clickedAgent, setClickedAgent] = useRecoilState(ClickedAgentInfo);
    const [selectedAgentInfo, setSelectedAgentInfo] = useRecoilState(SelectedAgentInfo);
    const [centerInfo,setCenterInfo] = useState([])
    const [selCenterInfo, setSelCenterInfo] = useRecoilState(SelectedCenterInfo);

    const center = [ //선택된 시설의 좌표를 mainbodytemp에서 props로 받아옴
        {
            lat: props.thisCenterLocation[0],
            lng: props.thisCenterLocation[1],
        }
    ]
    console.log("selAgent")
    console.log(selectedAgentInfo)
    console.log("clickedAgent")
    console.log(clickedAgent)
    let centerList=[]

    let modifiedSelectedCenter= selectedCenterList.filter((el,idx)=>{
        return el.c_name!==selCenterInfo.c_name;
    })
    console.log(modifiedSelectedCenter);

    const changeRange = (e) => { //range comtrol tab이 눌릴 때마다 정보 받아와서 centerInfo에 set
        if (e.target.textContent === "250m") {
            setRange(2)
            console.log('250m');
            modifiedSelectedCenter.forEach((arr,index,buf)=>{
               if (0<arr.distance<=250){
                    centerList.push({
                        ...arr,
                        latlng:{lat:arr.c_latitude,lng:arr.c_longitude},
                        type: "center",
                        contents:
                            <div>
                                <div>시설 이름: {arr.c_name}</div>
                                <div>예상 인원: {arr.c_people} 명</div>
                            </div>
                    })
                }
            })
            setCenterInfo(centerList)
        }
        else if (e.target.textContent === "500m") {
            setRange(3)
            console.log('500m')
            modifiedSelectedCenter.forEach((arr,index,buf)=>{
                if (arr.distance<=500){
                    centerList.push({
                        ...arr,
                        latlng:{lat:arr.c_latitude,lng:arr.c_longitude},
                        type: "center",
                        contents:
                            <div>
                                <div>시설 이름: {arr.c_name}</div>
                                <div>예상 인원: {arr.c_people} 명</div>
                            </div>
                    })
                }
            })
            setCenterInfo(centerList)
        }
        else if (e.target.textContent === "1km") {
            setRange(4)
            console.log('1000m')
            modifiedSelectedCenter.forEach((arr,index,buf)=>{
                if (arr.distance<=1000){
                    centerList.push({
                        ...arr,
                        latlng:{lat:arr.c_latitude,lng:arr.c_longitude},
                        type: "center",
                        contents:
                            <div>
                                <div>시설 이름: {arr.c_name}</div>
                                <div>예상 인원: {arr.c_people} 명</div>
                            </div>
                    })
                }
            })
            setCenterInfo(centerList)
        }
    }

    return (
        <MapContainer>
            <RangeController onClickFunc={changeRange}/>
            <CustomMap aroundCdata={centerInfo} adata={selectedAgentInfo} clickedAdata={clickedAgent}  sdata={selCenter} lat={center[0].lat}
                       lng={center[0].lng}
                       level={range}/>
        </MapContainer>
    );
}


const MapContainer = styled.div`
  position: relative;
  &>div:nth-child(1){
    position: absolute;
    right: 10px;
    top: -10px;
    z-index: 3;
    margin-top: -7px;
  }
  &>div:nth-child(2){
    margin-top: -28px;
    z-index: 2;
  }
`;



export default MapView;
