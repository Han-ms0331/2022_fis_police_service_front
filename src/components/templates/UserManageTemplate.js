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
    /*const contents = user;*/
    const [contents,setContents]=useState("");
    const headerContent = ["이름", "아이디", "비밀번호", "전화번호", "입사일", "권한", "평균통화건수", "오늘통화건수"] /*표 상단에 표시되는 텍스트*/
    const [currentInfo, setCurrentInfo] = useState({
        u_nickname: "", u_name: "", u_pwd: "", u_sDate: "", u_ph: "",u_auth:""
    })
    const [modify,setModify]=useState();

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

    const showData=async ()=>{
        await axios.get('/user')
            .then((res)=>{
            setContents(res.data.datas)
        })
    }

    useEffect(()=>{
        showData().then((res)=>{
            console.log("done")
        })
    },[])

    const handleClickSave = async() => {
        if(modify==true){
            await axios.patch('/user')
                .then((res)=>{
                    console.log("patch done")
                })
            alert("수정 되었습니다");
        }
        else{
            await axios.post('/user')
                .then((res)=>{
                    console.log("post done")
                })
            alert("추가 되었습니다")
        }
        handleClose();
    }
    const handleModifyButtonClick = (e) => {
        // 콜직원 수정버튼 클릭시
        setModify(true);
        const changeContent = {...contents[parseInt(e.target.getAttribute('name'))]};
        delete changeContent['today_call_num']; /*오늘통화건수 제외*/
        delete changeContent['average_call']; /*평균통화건수 제외*/
        let date = changeContent['u_sDate'].replaceAll('/', '-');
        changeContent['u_sDate'] = date;
        setCurrentInfo(changeContent)
        handleOpen(); /*수정창을 오픈한다*/
    }
    const handleAddButtonClick = (e)=>{
        setModify(false)
        setCurrentInfo({
            u_nickname: "", u_name: "", u_pwd: "", u_sDate: "", u_ph: "",u_auth:""
        });
        handleOpen();

    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Main id={"main"}>
           <ListContainer width="1800px" headerContents={headerContent} contents={contents}
                       gridRatio="1fr 1fr 1fr 1fr 1fr 2fr 1fr 1fr 1fr" buttonContent="정보수정" borderRadius="5px"
                       onClickFunction={handleModifyButtonClick}/>
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

            <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                          backgroundColor={Style.color2} content="콜직원 추가 +" onClick={handleAddButtonClick}/>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &> div:nth-child(1) {
    height: 960px;
    overflow: auto;
  }
  
  & > button { /*콜직원 추가*/
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
export default UserManageTemplate;