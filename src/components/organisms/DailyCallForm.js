import React, { useState } from 'react'
import DailyCallForm2 from "../organisms/DailyCallForm2";
import Button from '@mui/material/Button';
import {Style} from "../../Style";
import CustomButton from "../atoms/CustomButton";
import styled from 'styled-components'

const DailyCallForm = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const modalClose = () => {
        setModalOpen(!modalOpen)

    }

    return (
        <Located>
            <CustomButton type="normal" padding="" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                          backgroundColor={Style.color2} content="콜직원 통화 건수 목록 " onClick={modalClose}/>
            { modalOpen && <DailyCallForm2 modalClose={modalClose}></DailyCallForm2>}
        </Located>
    )
}

const Located = styled.div`
    
    & > button{
        position: fixed;
        bottom: 40px;
        left: 40%;
        transform: translate(-28.5%, 0);
    }
`;


export default DailyCallForm;