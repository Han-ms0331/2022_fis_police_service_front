import React from 'react';
import CallInfoList from "../molecules/CallInfoList";
import ApplyInfoList from "../molecules/ApplyInfoList";
import styled from "styled-components";
import {Style} from "../../Style";

/*
    날짜: 2022/01/14 10:54 오전
    작성자: 한명수
    작성내용:   style
*/

/*
    날짜: 2022/01/14 10:49 오전
    작성자: 한명수
    작성내용:   InfoContainer 작성,
*/
function InfoContainer(props) {
    const {type} = props    //props로 넘어온 type에 따라 다른 랜더링
    if (type === "call") {
        return (
            <Container1>
                {props.content.map(o => <CallInfoList u_name={props.u_name} content={o}/>)}
            </Container1>
        );

    } else if (type === "apply") {
        return (
            <Container2>
                {props.content.map(o => <ApplyInfoList u_name={props.u_name} content={o}/>)}
            </Container2>
        );
    }
}

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 15px;
  box-shadow: 3px 3px #dadada;
  background-color: ${Style.color1};
  padding: 20px;
  width: 610px;
  text-align: center;
  min-height: 300px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 15px;
  box-shadow: 3px 3px #dadada;
  background-color: ${Style.color1};
  padding: 20px;
  width: 610px;
  text-align: center;
  min-height: 350px;
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
`
export default InfoContainer;