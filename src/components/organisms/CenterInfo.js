import React from 'react';
import styled from "styled-components";
import {Style} from "../../Style";

function CenterInfo(props) {
    return (
                <Container>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>시설이름:</div>   <div>test3</div></div>
                    <br/>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>시설주소:</div>   <div>서울시 노원구 동이로 215길 48</div></div>
                    <br/>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>전화번호:</div>   <div>02-413-7346</div></div>
                </Container>
    );
}
const Container = styled.div`
  border:none;
  background-color: ${Style.color1};
  box-shadow: 3px 3px #dadada;
  border-radius:15px;
  padding:1vw;
  text-align:center;
`;

export default CenterInfo;
