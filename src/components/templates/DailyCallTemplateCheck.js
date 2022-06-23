import React from 'react';
import styled from "styled-components";
import '../atoms/style.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Icon } from '@mui/material';


const StyleDiv = styled.div`
    background:white;
    border-radius:13px;
    border:2px solid #2E3C7E;
    
    width:930px;
    height:325px;
    
    padding:5px;
    
    position:fixed;
    top:120px;
    left: 400px; 
`;

const StyleTxt = styled.div`
    text-align:center;
    color:#6D5A00;
    padding:20px 0 40px 0;
    font-size:23px;    
    padding-left:380px;
    padding-top:30px;
`;

const StrongTxt = styled.div`
    font-size:22px; 
    color:#000000;
`;

const ColorTxt = styled.div`
    color:#2E3C7E;
`;

const SubDiv = styled.div`
    padding-top:125px;
    padding-left:35px;
    text-align:center;
`;

function DailyCallTemplate2(){
    return(
        <>

            <StyleDiv>
                <SubDiv>
                    <ColorTxt><ErrorOutlineIcon fontSize="large"/></ColorTxt>
                    <strong><StrongTxt>원하시는 날짜를 선택해주세요</StrongTxt></strong>
                </SubDiv>
            </StyleDiv>
        </>
    );
}

export default DailyCallTemplate2;