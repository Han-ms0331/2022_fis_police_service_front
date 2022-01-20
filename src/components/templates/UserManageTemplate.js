import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {user} from '../../store/dummy-data/user'
import ListContainer from "../organisms/ListContainer";
import CustomButton from "../atoms/CustomButton";
import UserManageInputForm from "../organisms/UserManageInputForm";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import axios from "axios";
import {Style} from "../../Style";

/*
날짜: 2022/01/13 4:14 PM
작성자: 정도식
작성내용: 콜직원관리 탭
*/
/*
날짜: 2022/01/14 4:57 PM
작성자: 정도식
작성내용: 정보수정 클릭함수
*/

const UserManageTemplate = () => {
    const [open, setOpen] = React.useState(false);
    const contents = user;
    const headerContent = ["이름", "아이디", "비밀번호", "권한", "입사일", "전화번호", "평균통화건수", "오늘통화건수"] /*표 상단에 표시되는 텍스트*/
    const [currentInfo, setCurrentInfo] = useState({
        name: "", username: "", password: "", start: "", hp: "", auth: ""
    })
    const handleInputFormChange = (e) => {
        // console.log(e);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        console.log(name);
        if (name !== 'start') {
            setCurrentInfo({
                ...currentInfo, // 기존의 input 객체를 복사한 뒤
                [name]: value // name 키를 가진 값을 value 로 설정
            });
        } else {
            console.log(e.target.name)
            // setCurrentInfo({
            //     ...currentInfo, // 기존의 input 객체를 복사한 뒤
            //     [name]: toString(value) // name 키를 가진 값을 value 로 설정
            // });
        }
    }

    // useEffect(()=>{
    //     console.log(currentInfo)
    // },[currentInfo]);


    const handleClickSave = () => {
        //api 수정 요청 보냄,,?
        //input state 에 적혀있는 것으로 수정,,,?
        console.log(currentInfo);
        console.log("saved");
        handleClose();
    }
    const handleModifyButtonClick = (e) => {
        // 콜직원 수정버튼 클릭시
        const changeContent = {...contents[parseInt(e.target.name)]};
        delete changeContent['today']; /*오늘통화건수 제외*/
        delete changeContent['avg']; /*평균통화건수 제외*/
        let date = changeContent['start'].replaceAll('/', '-');
        changeContent['start'] = date;
        setCurrentInfo(changeContent)
        handleOpen(); /*수정창을 오픈한다*/
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Main>
            <ListContainer width="1800px" height="100%" headerContents={headerContent} contents={contents}
                           gridRatio="1fr 1fr 1fr 1fr 1fr 2fr 1fr 1fr 1fr" buttonContent="정보수정" borderRadius="5px"
                           onClickFunction={handleModifyButtonClick}/>
            <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                          backgroundColor={Style.color2} content="콜직원 추가 +" onClick={() => setOpen(true)}/>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserManageInputForm handleClose={handleClose} currentInfo={currentInfo}
                                         handleInputFormChange={handleInputFormChange}
                                         handleClickSave={handleClickSave}/>
                </Box>
            </Modal>
        </Main>);
};

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
  justify-content: center;

  & > button {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
export default UserManageTemplate;