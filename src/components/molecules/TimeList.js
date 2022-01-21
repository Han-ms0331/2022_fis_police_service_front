/*
    작성시간: 2022/01/10 11:26 AM
    이름: 이창윤
    작성내용: 현장 요원 이름 + 스케줄표(CircleButton으로 시각화)
*/

import React from 'react';
import CircleButton from "../atoms/CircleButton";
import styled from "styled-components";
import {ClickedAgentInfo} from "../../store/SelectedAgentStore";
import {useRecoilState} from "recoil";


const Div = styled.div` // css
  border: 3px solid #eee;
  padding: 5px;
  background-color: White;
  border-radius: 10px;
  margin: 5px;
`;


function TimeList({content, setCurrentTime=0}) {
    const red = '#e55039';
    const green = '#4cd137';
    const date = new Date().getHours();
    let using = [false, false, false, false];
    const handleClick = () => {
        setClickedAgent(content);
        console.log(content);
    }
    const [clickedAgent, setClickedAgent] = useRecoilState(ClickedAgentInfo);
    return (
        <Div>
            <div>{content.a_code} {content.a_name}</div> {/* 현장 요원 이름 */}
            {content.scheduleList.map(
                item => {
                    const x = Date.parse(item.visit_date + "T" + item.visit_time)
                    if (x>=Date.parse(item.visit_date + "T09:00:00") && x<=Date.parse(item.visit_date + "T10:00:00") ) {
                        using[0] = true;
                    } else if (x>=Date.parse(item.visit_date + "T10:00:00") && x<=Date.parse(item.visit_date + "T11:00:00")) {
                        using[1] = true;
                    } else if (x>=Date.parse(item.visit_date + "T11:00:00") && x<=Date.parse(item.visit_date + "T12:00:00")) {
                        using[2] = true;
                    } else if (x>=Date.parse(item.visit_date + "T12:00:00")) {
                        using[3] = true;
                    }
                }
            )}
            {/*{date}*/}
            <CircleButton bgColor={using[0] ? red : green} handleClick={handleClick}/>
            <CircleButton bgColor={using[1] ? red : green} handleClick={handleClick}/>
            <CircleButton bgColor={using[2] ? red : green} handleClick={handleClick}/>
            <CircleButton bgColor={using[3] ? red : green} handleClick={handleClick}/>
            {/* 현장 요원 스케줄에 따른 버튼 */}
        </Div>
    );
}

export default TimeList;