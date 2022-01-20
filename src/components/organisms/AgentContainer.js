/*
    작성시간: 2022/01/10 2:55 PM
    이름: 이창윤
    작성내용: 현장요원 스케줄의 리스트들을 모두 띄우는 컨테이너
*/

import React from 'react';
import AgentSchedule from "../molecules/AgentSchedule";
import styled from "styled-components";
import {Style} from "../../Style";

const Container = styled.div`
  border: 3px solid #eee;
  padding: 5px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
  margin: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const tempAgent = [
    {id: 1, Name: "가산1 김철수" , Color: "#4cd137"},
    {id: 2, Name: "가산2 박철수" , Color: "#e55039"},
    {id: 3, Name: "가산3 최철수" , Color: "#4cd137"},
    {id: 4, Name: "가산4 이철수" , Color: "#e55039"},
];
 // tempAgent - 더미 데이터

function AgentContainer({content=tempAgent, width=200, height=400}) {
    // content - 요원 정보가 담긴 배열을 받음. width와 height으로 컨테이너 크기 조절..
    return (
        <Container backgroundColor={Style.color1} width={width} height={height}>
            <center>
                <div>주변 현장요원</div>
                <AgentSchedule content={content} width={width} height={height} />
            </center>
        </Container>
    );
}

export default AgentContainer;