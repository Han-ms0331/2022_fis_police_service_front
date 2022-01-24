import React from 'react';
import CustomLabel from "../atoms/CustomLabel";
import CustomButton from "../atoms/CustomButton";

/*
    날짜 : 2022/01/12 2:14 PM
    작성자 : 지상은
    작성내용 : 지도 오른쪽 상단에 띄워주는 거리 조절 버튼, 클릭 시 range를 set하여 지도의 level에 props로 넘겨준다
*/

function RangeController(props) {
    return (
        <>
            <div style={{marginTop:"50px", marginLeft:"-208px"}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{marginRight:"5px"}}>주변시설</div>
                    <CustomButton type={"normal"} width={"10px"} height={"20px"} color={"white"} borderRadius={"2"}
                                  backgroundColor={"orange"} name={"250"} content={"250m"} onClick={props.onClickFunc}/>
                    <CustomButton type={"normal"} width={"10px"} height={"20px"} color={"white"} borderRadius={"2"}
                                  backgroundColor={"orange"} name={"500"} content={"500m"} onClick={props.onClickFunc}/>
                    <CustomButton type={"normal"} width={"10px"} height={"20px"} color={"white"} borderRadius={"2"}
                                  backgroundColor={"orange"} name={"1000"} content={"1km"} onClick={props.onClickFunc}/>
                </div>
            </div>
        </>
    );
}

export default RangeController;