import React from 'react';
import CustomLabel from "../atoms/CustomLabel";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";

/*
    날짜 : 2022/01/12 2:14 PM
    작성자 : 지상은
    작성내용 : 지도 오른쪽 상단에 띄워주는 거리 조절 버튼, 클릭 시 range를 set하여 지도의 level에 props로 넘겨준다
*/

function RangeController(props) {
    return (
        <>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <CustomButton type={"normal"} width={"15px"} height={"35px"} margin={'0 2px'} color={"white"} borderRadius={"2"}
                                  backgroundColor={Style.color2} name={"250"} content={"250m"} onClick={props.onClickFunc}/>
                    <CustomButton type={"normal"} width={"15px"} height={"35px"} margin={'0 2px'} color={"white"} borderRadius={"2"}
                                  backgroundColor={Style.color2} name={"500"} content={"500m"} onClick={props.onClickFunc}/>
                    <CustomButton type={"normal"} width={"15px"} height={"35px"} margin={'0 2px'} color={"white"} borderRadius={"2"}
                                  backgroundColor={Style.color2} name={"1000"} content={"1km"} onClick={props.onClickFunc}/>
                                 
                </div>

        </>
    );
}

export default RangeController;