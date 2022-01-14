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
    const [currentInfo, setCurrentInfo] = useState({
        agentId: "",
        agentName: "",
        agentPhone: "",
        agentAddress: "",
        agentCode:"",
        agentHasCar:"",
    })
    let contents = agent

    const headerContent = ["이름","아이디","현장요원코드","전화번호","차량여부","자택주소","장비번호","장비 수령날짜"]
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{setOpen(false)}
    const handleModifyButtonClick = (e) => {
        //inputForm의 input으로 시설아이디, 시설이름, 전화번호, 시설주소 가져오기 => 1월 14일 오늘 구현하기.
        console.log(e.target.name);
        setCurrentInfo(contents[parseInt(e.target.name)])
        handleOpen();
    }
    const handleInputFormChange = (e) => {
        // console.log(e);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setCurrentInfo({
            ...currentInfo, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
        // console.log(currentInfo);
    }
    const handleAddButtonClick = (e) =>{
        setCurrentInfo({
            centerId: "",
            centerName: "",
            centerPhone: "",
            centerAddress: ""
        });
        handleOpen();
    }
    const handleClickSave = () => {
        //api 수정 요청 보냄,,?
        //input state 에 적혀있는 것으로 수정,,,?

        console.log("hi");

        handleClose();
    }
    return (
        <Main>
            <ListContainer width="1500px" height="100vh" headerContents={headerContent} contents={contents}
                           gridRatio="1fr 1fr 1fr 2fr 1fr 3fr 1fr 1fr 1fr" buttonContent="정보수정" onClickFunction={handleModifyButtonClick}/>
            <CustomButton  type = "normal" width="150px" height= "35px" borderRadius="3px" color="#222" backgroundColor="#FFD400" content="현장요원 추가" onClick={()=>setOpen(true)}/>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AgentManageInputForm handleClose={handleClose} handleClickSave={handleClickSave}
                                          handleInputFormChange={handleInputFormChange} currentInfo={currentInfo}/>
                </Box>
            </Modal>
        </Main>
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const Main = styled.div`
  display: flex;
  justify-content: center;
& >button{
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%,0);
}
`;

export default AgentManageTemplate;