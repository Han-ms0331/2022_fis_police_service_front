import React, {useState} from 'react';
import RangeController from "../molecules/RangeController";
import CustomMap from "../molecules/CustomMap";
import axios from "axios";


const roadInfo = [
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
]

/*const roadInfo = async () => {   //서버와 로그인 통신을 하는 부분
    await axios.get('/center/{center_id}/range?range={value}')
        .then((res) => {
                console.log(res.data.cdata);
            }
        )
}*/

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
const center = [
    {
        lat: selCenter[1].c_latitude,
        lng: selCenter[1].c_longitude,
    }
]


let road = []
let cInfo = []

selCenter.forEach((arr, index, buf) => {
    road.push({
        ...arr,
        lat: arr.c_latitude, lng: arr.c_longitude,
    })
})

roadInfo.forEach((arr, index, buf) => {
    selCenter.forEach((arr1, index1, buf1) => {
        if (arr.c_id === arr1.c_id) {
            roadInfo.push({
                ...arr,
                c_order: (index1 + 1)
            })
        }
    })
})


roadInfo.forEach((arr, index, buf) => {
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


function MapView() {

    const [range, setRange] = useState(2);
    /*const [position, setPosition] = useState({
        center: {lat: center[0].lat, lng: center[0].lng}
    })*/


    const changeRange = (e) => {
        console.log(e.target)
        if (e.target.textContent === "250m") {
            setRange(2)
            console.log('250m')
            /* setPosition({
                 center: {lat: center[0].lat, lng: center[0].lng},
             })*/
            {/*axios.get(url).then(response => {
                setData(response.data)
            })
              data.forEach((arr,index,buf)=>{
                rangeData.push(arr.latlng)
              }
           */
            }
        } else if (e.target.textContent === "500m") {
            setRange(3)
            console.log('500m')
            /*setPosition({
                center: {lat: center[0].lat, lng: center[0].lng},
            })*/
            {/*axios.get(url).then(response => {
                setData(response.data)
            })
              data.forEach((arr,index,buf)=>{
                rangeData.push(arr.latlng)
              }
            */
            }
        } else if (e.target.textContent === "1km") {
            setRange(4)
            console.log('1000m')
            /*setPosition({
                center: {lat: center[0].lat, lng: center[0].lng},
            })*/
            {/*axios.get(url).then(response => {
                setData(response.data)
            })
              data.forEach((arr,index,buf)=>{
                rangeData.push(arr.latlng)
              }
            */
            }
        }

    }


    return (
        <>
            {/*<button
                onClick={() =>
                    setPosition({
                        center: {
                            lat: center[0].lat,
                            lng: center[0].lng,
                        },
                        isPanto: true,
                    })
                }
            >
                지도 중심좌표 이동시키기
            </button>*/}
            <>
                <div style={styles.sButton}>
                    <RangeController onClickFunc={changeRange}/>
                </div>
            </>
            <div style={styles.MapView}> {/* lat lng 값 변경 해줘야 함*/}
                <CustomMap cdata={cInfo} adata={agentInfo} rdata={road} lat={center[0].lat} lng={center[0].lng}
                           level={range}/>
            </div>
        </>
    );
}

const styles = {
    sButton: {
        marginLeft: "1186px",
        marginTop: "90px",
        flexDirection: 'column',
    },
    MapView: {
        marginTop: "-33px",
        marginLeft: "337px",
        width: "70%",
        height: "550px",
    }
}


export default MapView;