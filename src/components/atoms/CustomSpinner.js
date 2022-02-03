/*
날짜: 2022/01/25 4:54 PM
작성자: 정도식
작성내용: Spinner 컴포넌트 작성
*/

import React from 'react';
import {ClipLoader} from "react-spinners";
import styled from "styled-components";

const CustomSpinner = (props) => {
    return (
        <Container className="spinner" width={props.width}>
            <h2>Loading</h2>
            <ClipLoader size="62px" color="rgba(46, 60, 126,0.3)"/>
        </Container>
    );
};

const Container = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(46, 60, 126,0.3);
  & h2{
    font-size: 45px;
    font-weight: 500;
  }
`;
export default CustomSpinner;