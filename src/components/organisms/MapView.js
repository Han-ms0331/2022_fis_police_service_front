import React, {useState} from 'react';
import RangeController from "./RangeController";
import MapApp from "./KakaoMap";




function MapView() {

    const [range,setRange] =useState(5);
    const  changeRange=(e)=>{
        if (e.target.textContent === "250m") {
            setRange(5)
        }
        else if (e.target.textContent === "500m"){
            setRange(6)
        }
        else if (e.target.textContent === "1km"){
            setRange(7)
        }
    }

    return (
        <>
            <div style={styles.sButton}>
                <RangeController onClickFunc={changeRange}/>
            </div>
            <div style={styles.MapView}>
                <MapApp lat={"37.5283169"} lng={"127.0294254"} level={range}/>
            </div>
        </>
    );
}

const styles = {
    sButton: {
        marginLeft:"700px",
        marginTop:"50px",
        flexDirection: 'column',
    },
    MapView: {
        marginTop:"-33px",
        marginLeft:"295px",
        width: "70%",
        height: "550px",
    }
}


export default MapView;