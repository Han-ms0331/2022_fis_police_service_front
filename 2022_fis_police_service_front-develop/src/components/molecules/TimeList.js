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
import {Style} from "../../Style";


const Button = styled.button` // css
  font-weight: normal;
  margin: 5px;
  padding: 5px;
  border: 3px solid #eee;
  color: black;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  width: 225px;
  height: 70px;
  font-size: 18px;
  
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  &:active {
    box-shadow: 0px 0px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 1px;
  }
`;


function TimeList({content, setCurrentTime=0, selected, setSelected}) {
    const red = '#e55039';
    const green = '#4cd137';
    let using = [false, false, false, false];
    const handleClick = () => {
        setClickedAgent(content);
        setSelected(content.agent_id);
    }


    const [clickedAgent, setClickedAgent] = useRecoilState(ClickedAgentInfo);
    content.scheduleList.map(
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
            })
    const Content = () => {
        return (
            <div style={{fontFamily: Style.font}}>
                  {content.a_code} {content.a_name}
              <div style={{display:"flex", justifyContent:"center"}} >
                  <CircleButton name={clickedAgent.a_code+'1'} bgColor={using[0] ? red : green} />
                  <CircleButton name={clickedAgent.a_code+'2'} bgColor={using[1] ? red : green} />
                  <CircleButton name={clickedAgent.a_code+'3'} bgColor={using[2] ? red : green} />
                  <CircleButton name={clickedAgent.a_code+'4'} bgColor={using[3] ? red : green} />
              </div>
            </div>
        );
    }

    return (
        <div>
            <Button onClick={handleClick} bgColor={selected === content.agent_id ? Style.color3 : 'white'}>
                <Content />
            </Button>
        </div>


    );
}

export default TimeList;