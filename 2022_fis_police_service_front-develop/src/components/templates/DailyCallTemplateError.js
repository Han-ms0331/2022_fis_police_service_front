import React from 'react';
import styled from "styled-components";
import '../atoms/style.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Icon } from '@mui/material';


const StyleDiv = styled.div`
    background:white;
    border-radius:13px;
    border:2px solid #2E3C7E;
    
    width:680px;
    height:325px;
    
    position:fixed;
    top:80px;
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

//<strong><StyleTxt>날짜별 콜직원 통화 건수</StyleTxt></strong>

function DailyCallTemplateError(){
    return(
        <>

            <StyleDiv>
                <SubDiv>
                <ColorTxt><ErrorOutlineIcon fontSize="large"/></ColorTxt>
                <strong><StrongTxt>해당 날짜에 등록된 콜직원이 없습니다.</StrongTxt></strong>
                </SubDiv>
            </StyleDiv>
        </>
    );
}

export default DailyCallTemplateError;