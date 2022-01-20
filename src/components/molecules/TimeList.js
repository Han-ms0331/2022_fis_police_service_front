/*
    작성시간: 2022/01/10 11:26 AM
    이름: 이창윤
    작성내용: 현장 요원 이름 + 스케줄표(CircleButton으로 시각화)
*/

import React from 'react';
import CircleButton from "../atoms/CircleButton";
import styled from "styled-components";

const Div = styled.div` // css
  border: 3px solid #eee;
  padding: 5px;
  background-color: White;
  border-radius: 10px;
  margin: 5px;
`;

const handleClick = () => {
    alert('현재 시간 저장');
}

function TimeList({content, setCurrentTime=0}) {
    return (
        <Div>
                <div>{content.Name}</div> {/* 현장 요원 이름 */}
                <CircleButton bgColor={content.Color} handleClick={handleClick}/>
                <CircleButton bgColor={content.Color} handleClick={handleClick}/>
                <CircleButton bgColor={content.Color} handleClick={handleClick}/>
                <CircleButton bgColor={content.Color} handleClick={handleClick}/>
                {/* 현장 요원 스케줄에 따른 버튼 */}
        </Div>
    );
}

export default TimeList;