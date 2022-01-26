/*
날짜: 2022/01/25 4:54 PM
작성자: 정도식
작성내용: Spinner 컴포넌트 작성
*/

import React from 'react';
import {ClipLoader} from "react-spinners";
import styled from "styled-components";
import {Style} from "../../Style";
const CustomSpinner = (props) => {
    return (
        <Container width={props.width}>
            <h2>Loading</h2>
            <ClipLoader size="62px" color={Style.color2}/>
        </Container>
    );
};

const Container = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  color: ${Style.color2};
  & h2{
    font-size: 45px;
    font-weight: 500;
  }
`;
export default CustomSpinner;