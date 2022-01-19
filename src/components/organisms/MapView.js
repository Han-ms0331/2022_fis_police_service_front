import React, {useState} from 'react';
import RangeController from "../molecules/RangeController";
import CustomMap from "../molecules/CustomMap";
import axios from "axios";
import CenterInfo from "./CenterInfo";
import {SelectedCenterInfo} from "../../store/SelectedCenterStore";
import {useRecoilState} from "recoil";

let center_id = "1"
let value = "4"

/*const roadInfo = [
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
        c_id: "2",
        c_address: "f",
        c_ph: "",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.450492180670004",
        c_longitude: "126.5716140938378",
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
    {
        c_id: "4",
        c_address: "h",
        c_ph: "",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.452069734399245",
        c_longitude: "126.57284861031886",
    },
    {
        c_id: "5",
        c_address: "j",
        c_ph: "",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.46273767046406",
        c_longitude: "126.55046492951271",
    },
    {
        c_id: "6",
        c_address: "k",
        c_ph: "",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.470245538298876",
        c_longitude: "126.5727164298056",
    },
    {
        c_id: "7",
        c_address: "t",
        c_ph: "",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.46494524738042",
        c_longitude: "126.60570252290822",
    },
    {
        c_id: "8",
        c_address: "h",
        c_ph: "",
        participation: null,
        visited: null,
        distance: "",
        c_latitude: "33.42466652636361",
        c_longitude: "126.55392992730667",
    },
]*/


const agentInfo = [
    {
        type: "agentSelected",
        latlng: {lat: 33.44976681228811, lng: 126.57173596860564},
    },
    {
        type: "agent",
        latlng: {lat: 33.44995682230663, lng: 126.57062723393493},
    },
    {
        type: "agent",
        latlng: {lat: 33.45113828191392, lng: 126.5720357592316},

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

selCenter.splice(1, 0, thisCenter[0]);



let road = []
let cInfo = []

selCenter.forEach((arr, index, buf) => {
    road.push({
        ...arr,
        lat: arr.c_latitude, lng: arr.c_longitude,
    })
})


function MapView(props) {

    const [range, setRange] = useState(2);
    const [centerInfo, setCenterInfo] = useState([]);
    const center = [
        {
            lat: props.thisCenterLocation[0],
            lng: props.thisCenterLocation[1],
        }
    ]


    const loadInfo = async () => {
        await axios.get(`/main/center/${center_id}/range?range=${value}`)
            .then((res) => {
                console.log("done")
                console.log(res.data.cdata)
                setCenterInfo(res.data.cdata)
            })
    }


    const changeRange = (e) => {
        console.log(e.target)
        if (e.target.textContent === "250m") {
            setRange(2)
            console.log('250m');
            loadInfo().then((res)=>{
                console.log("success")
            })

        } else if (e.target.textContent === "500m") {
            setRange(3)
            console.log('500m')
            loadInfo().then((res)=>{
                console.log("success")
            })

        } else if (e.target.textContent === "1km") {
            setRange(4)
            console.log('1000m')
            loadInfo().then((res)=>{
                console.log("success")
            })

        }

    }


    return (
<>

                <div style={styles.sButton}>
                    <RangeController onClickFunc={changeRange}/>
                </div>

                <div style={styles.MapView}> {/* lat lng 값 변경 해줘야 함*/}
                    <CustomMap cdata={centerInfo} adata={agentInfo} rdata={road} sdata={selCenter}  lat={center[0].lat} lng={center[0].lng}
                               level={range}/>
                </div>
        </>
    );
}


export default MapView;

const styles = {
    sButton: {
        marginLeft: "1200px",
        marginTop: "100px",
        flexDirection: 'column',
    },
    MapView: {

        marginLeft: "150px",
        width: "70%",
        height: "550px",
    }
}


