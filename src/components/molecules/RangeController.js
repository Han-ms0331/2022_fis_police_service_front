import React from 'react';
import {Style} from "../../Style";
import {
    buttonUnstyledClasses,
    TabPanelUnstyled,
    TabsListUnstyled,
    TabsUnstyled,
    TabUnstyled,
    tabUnstyledClasses
} from "@mui/material";
import styled from "styled-components";

/*
    날짜 : 2022/01/12 2:14 PM
    작성자 : 지상은
    작성내용 : 지도 오른쪽 상단에 띄워주는 거리 조절 버튼, 클릭 시 range를 set하여 지도의 level에 props로 넘겨준다
*/

function RangeController(props) {
    return (
        <>
            {/*<div style={{display: 'flex', alignItems: 'center'}}>*/}
            {/*    <CustomButton type={"normal"} width={"15px"} height={"35px"} margin={'0 2px'} color={"white"} borderRadius={"2"}*/}
            {/*                  backgroundColor={Style.color2} name={"250"} content={"250m"} onClick={props.onClickFunc}/>*/}
            {/*    <CustomButton type={"normal"} width={"15px"} height={"35px"} margin={'0 2px'} color={"white"} borderRadius={"2"}*/}
            {/*                  backgroundColor={Style.color2} name={"500"} content={"500m"} onClick={props.onClickFunc}/>*/}
            {/*    <CustomButton type={"normal"} width={"15px"} height={"35px"} margin={'0 2px'} color={"white"} borderRadius={"2"}*/}
            {/*                  backgroundColor={Style.color2} name={"1000"} content={"1km"} onClick={props.onClickFunc}/>*/}

            {/*</div>*/}

            <TabsUnstyled defaultValue={0} style={{zIndex: 3}}>
                <TabsList>
                    <Tab onClick={props.onClickFunc}>Remove</Tab>
                    <Tab onClick={props.onClickFunc}>250m</Tab>
                    <Tab onClick={props.onClickFunc}>500m</Tab>
                    <Tab onClick={props.onClickFunc}>1km</Tab>
                </TabsList>

            </TabsUnstyled>



        </>
    );
}

export default RangeController;

const Tab = styled(TabUnstyled)`
  color: ${Style.color2};
  cursor: pointer;
  font-weight: bold;
  background-color: ${Style.color1};
  width: 65px;
  padding: 10px 12px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  margin-right: 5px;
  font-family: ${Style.font};
  font-weight: bolder;


  &:hover {
    background-color: ${Style.color3};
  }


  &.${tabUnstyledClasses.selected} {
    background-color: ${Style.color2};
    color: ${Style.color1};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  display: flex;
  align-items: center;
  align-content: space-between;
`;