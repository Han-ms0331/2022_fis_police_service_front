import React,{useState} from 'react';
import RangeController from "../molecules/RangeController";
import CustomMap from "../molecules/CustomMap";
import {SelectedCenterInfo, SelectedCenterList} from "../../store/SelectedCenterStore";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import { MdGpsFixed } from "react-icons/md";
import {ClickedAgentInfo, SelectedAgentInfo} from "../../store/SelectedAgentStore";


function MapView(props) {

    const [range, setRange] = useState(2);// 지도의 비율 설정
    const [selectedCenterList, setSelectedCenterList] = useRecoilState(SelectedCenterList); //선택된 시설의 주변 시설 리스트
    const [clickedAgent, setClickedAgent] = useRecoilState(ClickedAgentInfo); //클릭된 현장요원 정보
    const [selectedAgentInfo, setSelectedAgentInfo] = useRecoilState(SelectedAgentInfo); // 선택된 날짜의 주변 현장 요원들 정보
    const [centerInfo,setCenterInfo] = useState([]) // 선택된 센터의 확대 비율 별 주변 시설 리스트
    const [selCenterInfo, setSelCenterInfo] = useRecoilState(SelectedCenterInfo); // 선택된 센터의 정보

    const center = [ //선택된 시설의 좌표를 mainbodytemp에서 props로 받아옴
        {
            lat: props.thisCenterLocation[0],
            lng: props.thisCenterLocation[1],
        }
    ]

    let centerList=[] // 확대 비율에 따른 주변 시설 리스트 저장 => setCenterInfo를 이용해 set하여 centerInfo를 props로 넘겨줌
    let modifiedSelectedCenter= selectedCenterList.filter((el,idx)=>{
        return el.c_name!==selCenterInfo.c_name;
    }) // 선택된 센터를 주변시설 리스트에서 제외하는 부분


    const changeRange = (e) => { //range comtrol tab이 눌릴 때마다 정보 받아와서 centerInfo에 set
        if (e.target.textContent === "250m") {
            setRange(2)
            modifiedSelectedCenter.forEach((arr,index,buf)=>{ // 선택된 센터를 제외시킨 리스트로 centerList 구성
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
            modifiedSelectedCenter.forEach((arr,index,buf)=>{ // 선택된 센터를 제외시킨 리스트로 centerList 구성
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
            modifiedSelectedCenter.forEach((arr,index,buf)=>{ // 선택된 센터를 제외시킨 리스트로 centerList 구성
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
            <CustomMap aroundCdata={centerInfo} adata={selectedAgentInfo} clickedAdata={clickedAgent} lat={center[0].lat}
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
