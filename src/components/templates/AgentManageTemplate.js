import React, {useState} from 'react';
import {agent} from "../../store/dummy-data/agent";
import ListContainer from "../organisms/ListContainer";
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";
import Box from "@mui/material/Box";
import UserManageInputForm from "../organisms/UserManageInputForm";
import Modal from "@mui/material/Modal";
import AgentManageInputForm from "../organisms/AgentManageInputForm";

/*
날짜: 2022/01/13 4:14 PM
작성자: 정도식
작성내용: 현장요원관리 탭
*/
const AgentManageTemplate = () => {
    const [open,setOpen] = useState(false);
    const contents=agent;
    const headerContent = ["이름","아이디","현장요원코드","전화번호","차량여부","자택주소","장비번호","장비 수령날짜"]
    const handleClose = () =>{setOpen(false)}
    const handleModifyButtonClick = (e) => {
        // button이 관리페이지의 정보 수정 버튼일 시...

        console.dir(e)
    }
    return (
        <Main>
            <ListContainer style={{width: "100%", height: "100%"}} headerContents={headerContent} contents={contents}
                           gridRatio="1fr 1fr 1fr 2fr 1fr 3fr 1fr 1fr 1fr" buttonContent="정보수정" clickFunction={handleModifyButtonClick}/>
            <CustomButton  type = "normal" width="150px" height= "35px" borderRadius="3px" color="#222" backgroundColor="#FFD400" content="현장요원 추가" onClick={()=>setOpen(true)}/>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AgentManageInputForm handleClose={handleClose}/>
                </Box>
            </Modal>
        </Main>
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: "50vw",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


// ================ style ================

const Main = styled.div`
& >button{
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%,0);
}
`;

export default AgentManageTemplate;