import React, {useState} from 'react';
import RangeController from "../molecules/RangeController";
import CustomMap from "../molecules/CustomMap";
import axios from "axios";
import CenterInfo from "./CenterInfo";
import {SelectedCenterInfo} from "../../store/SelectedCenterStore";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import { MdGpsFixed } from "react-icons/md";

let center_id = "1"
let value = "4"


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
    {
        agent_id: 7,
        a_name: "asd",
        a_ph: "123",
        a_code: "111",
        a_address: "분당구 불정로 6",
        a_hasCar: "CAR",
        a_equipment: "",
        a_receiveDate: "2022-01-20T17:42:51.524995",
        a_latitude: 33.44995682230663,
        a_longitude: 126.57062723393493,
        scheduleList: []
    },
    {
        agent_id: 8,
        a_name: "asd",
        a_ph: "123",
        a_code: "111",
        a_address: "분당구 불정로 6",
        a_hasCar: "CAR",
        a_equipment: "",
        a_receiveDate: "2022-01-20T17:42:51.524995",
        a_latitude: 33.45113828191392,
        a_longitude: 126.5720357592316,
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
] /* onClick함수,,,?*/


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
    {
        c_id: "3",
        c_address: "g",
        c_ph: "",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.44997113581058",
        c_longitude: "126.57215980066594",
    },
]
let road = []

selCenter.splice(1, 0, thisCenter[0]); // 선택된 현장 요원의 스케쥴 사이에 선택된 센터 정보 집어 넣기

selCenter.forEach((arr, index, buf) => { // 동선 표시를 위해 위도경도 입력 형태 변경
    road.push({
        ...arr,
        lat: arr.c_latitude, lng: arr.c_longitude,
    })
})


function MapView(props) {

    const [range, setRange] = useState(2);// 지도의 비율 설정
    const [centerInfo, setCenterInfo] = useState([]);//지도 확대 비율 별 주변 시설 정보를 서버로 부터 받아와서 set!

    const center = [ //선택된 시설의 좌표를 mainbodytemp에서 props로 받아옴
        {
            lat: props.thisCenterLocation[0],
            lng: props.thisCenterLocation[1],
        }
    ]

    /*const [date,setDate] = useState(119)
    const [selAgent, setSelAgent] = useState(agentInfo[1]);*/

    const loadInfo = async () => { //지도의 확대 비율 별 주변 시설 정보 받아오기
        await axios.get(`/main/center/${center_id}/range?range=${value}`)
            .then((res) => {
                console.log("done")
                console.log(res.data.cdata)
                setCenterInfo(res.data.cdata)
            })
    }


    const changeRange = (e) => { //range comtrol tab이 눌릴 때마다 정보 받아와서 centerInfo에 set
        if (e.target.textContent === "250m") {
            setRange(2)
            console.log('250m');
            loadInfo().then((res) => {
                console.log("success")
            })

        } else if (e.target.textContent === "500m") {
            setRange(3)
            console.log('500m')
            loadInfo().then((res) => {
                console.log("success")
            })

        } else if (e.target.textContent === "1km") {
            setRange(4)
            console.log('1000m')
            loadInfo().then((res) => {
                console.log("success")
            })

        }

    }


    return (

        <MapContainer>
            <RangeController onClickFunc={changeRange}/>
            <CustomMap cdata={centerInfo} adata={agentList} rdata={road} sdata={selCenter} lat={center[0].lat}
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
