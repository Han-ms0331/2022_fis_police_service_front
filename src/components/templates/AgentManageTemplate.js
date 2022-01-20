import React, {useEffect, useState} from 'react';
import {agent} from "../../store/dummy-data/agent";
import ListContainer from "../organisms/ListContainer";
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";
import Box from "@mui/material/Box";
import UserManageInputForm from "../organisms/UserManageInputForm";
import Modal from "@mui/material/Modal";
import AgentManageInputForm from "../organisms/AgentManageInputForm";
import {Style} from "../../Style";
import axios from "axios";

/*
날짜: 2022/01/13 4:14 PM
작성자: 정도식
작성내용: 현장요원관리 탭
*/
const AgentManageTemplate = () => {
    const [open, setOpen] = useState(false);
    const [contents,setContents] =useState("");
    /*const contents = agent;*/
    const headerContent = ["이름", "현장요원코드", "전화번호", "차량여부", "자택주소", "장비번호", "장비 수령날짜", "퇴사 여부"]
    const [currentInfo, setCurrentInfo] = useState({
        a_name: "",
        a_code: "",
        a_ph: "",
        a_hasCar: "",
        a_address: "",
        a_equipment: "",
        a_receiveDate: "",
        a_status:""
    });

    const showData=async () => {
        await axios.get('/agent')
            .then((res)=>{
                /*console.log(res.data.a_data);*/
                setContents(res.data.a_data);
            })
    }

    useEffect(()=>{ //처음 렌더링시에만 데이터 요청
    showData().then((res)=>{
        console.log("done")
    })
    },[]);


    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const handleInputFormChange = (e) => {
        // console.log(e);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출{
        setCurrentInfo({
            ...currentInfo, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });

        // console.log(currentInfo)
    };

    // useEffect(()=>{
    //     console.log(currentInfo)}
    // ,[currentInfo]);
    //주석추ㅏ

    const handleClickSave = async() => { //정보 수정,추가 요청
        await axios.patch('/agent')
            .then((res) => {
                console.log("success")
            })
        handleClose();
    };

    const handleModifyButtonClick = (e) => {
        // button이 관리페이지의 정보 수정 버튼일 시...
        console.log(e.target.name);
        const changeContent = {...contents[parseInt(e.target.getAttribute("name"))]};
        let date = changeContent['a_receiveDate'].replaceAll('/', '-');
        changeContent['a_receiveDate'] = date;
        setCurrentInfo(changeContent);
        handleOpen();
    }
    const handleAddButtonClick=(e)=>{
        setCurrentInfo({
            a_name: "",
            a_code: "",
            a_ph: "",
            a_hasCar: "",
            a_address: "",
            a_equipment: "",
            a_receiveDate: "",
            a_status:""
        });
        handleOpen()
    }
    return (
        <Main>
            <ListContainer width="1800px" height="1000px"  headerContents={headerContent} contents={contents}
                           gridRatio="1fr 1fr 1fr 1fr 3fr 1fr 1fr 1fr 1fr" buttonContent="정보수정"
                           onClickFunction={handleModifyButtonClick}/>
            <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                          backgroundColor={Style.color2} content="현장요원 추가" onClick={handleAddButtonClick}/>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AgentManageInputForm handleClose={handleClose} currentInfo={currentInfo}
                                          handleInputFormChange={handleInputFormChange}
                                          handleClickSave={handleClickSave}/>
                </Box>
            </Modal>
            <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                          backgroundColor={Style.color2} content="현장요원 추가 +" onClick={() => setOpen(true)}/>
        </Main>
    );
};


// ================ style ================

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &> div:nth-child(1) {
    height: 960px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  & > button { /*콜직원 추가*/
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

export default AgentManageTemplate;