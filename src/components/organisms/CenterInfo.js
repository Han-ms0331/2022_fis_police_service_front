import React from 'react';
import styled from "styled-components";
import {Style} from "../../Style";
import {useRecoilValue} from "recoil";
import {SelectedCenterInfo} from "../../store/SelectedCenterStore";

function CenterInfo(props) {
    const selectedCenterInfo = useRecoilValue(SelectedCenterInfo)
    return (
                <Container>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>시설이름:</div>   <div>{selectedCenterInfo.c_name}</div></div>
                    <br/>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>시설주소:</div>   <div>{selectedCenterInfo.c_address}</div></div>
                    <br/>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>전화번호:</div>   <div>{selectedCenterInfo.c_ph}</div></div>
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
