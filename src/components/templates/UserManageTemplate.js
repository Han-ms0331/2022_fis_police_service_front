import React from 'react';
import styled from 'styled-components';
import {user} from '../../store/dummy-data/user'
import ListContainer from "../organisms/ListContainer";
import CustomButton from "../atoms/CustomButton";
import UserManageInputForm from "../organisms/UserManageInputForm";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import CenterManageInputForm from "../organisms/CenterManageInputForm";

/*
날짜: 2022/01/13 4:14 PM
작성자: 정도식
작성내용: 콜직원관리 탭
*/

const UserManageTemplate = () => {
    const [open, setOpen] = React.useState(false);
    const contents=user;
    const headerContent = ["이름","아이디","비밀번호","입사일","전화번호","평균통화건수","오늘통화건수"]
    const handleModifyButtonClick = (e) => {
        // button이 관리페이지의 정보 수정 버튼일 시...
        console.dir(e)
    }

    const handleClose = () => setOpen(false);
    return (
        <Main>
            <ListContainer style={{width: "100%", height: "100%"}} headerContents={headerContent} contents={contents}
                           gridRatio="1fr 1fr 1fr 1fr 2fr 1fr 1fr 1fr" buttonContent="정보수정" onClickFunction={handleModifyButtonClick}/>
            <CustomButton  type = "normal" width="150px" height= "35px" borderRadius="3px" color="#222" backgroundColor="#FFD400" content="콜직원 추가" onClick={()=>setOpen(true)}/>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserManageInputForm handleClose={handleClose}/>
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
& >button{
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%,0);
}
`;
export default UserManageTemplate;