/*
    작성시간: 2022/01/10 11:26 AM
    이름: 이창윤
    작성내용: 시간표에 따른 원형 버튼 컴포넌트
*/

import React from "react";
import styled from "styled-components";

const Button = styled.button` // css
  background-color: ${(props) => props.bgColor};
  border-width: 0px;
  border-color: black;
  border-radius: 60%;
  padding: 5%;
  box-shadow: 0.1px 0.1px 0 rgb(0, 0, 0, 0.5);
  margin: 1px;
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

export default function CircleButton({bgColor, handleClick}) { // bgColor로 버튼 색 props 받음.
    return (
        <>
            {
                bgColor === "#3dc1d3"
                ? <Button bgColor={bgColor} onClick={handleClick}></Button>
                    : <Button bgColor={bgColor}></Button>
                // 초록색 버튼일 경우 Click Event 활성화
            }

        </>
    );
}
