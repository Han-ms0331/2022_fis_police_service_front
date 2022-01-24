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
import NetworkConfig from "../../configures/NetworkConfig";

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
        const [contents, setContents] = useState("");
        const headerContent = ["이름", "아이디", "비밀번호", "전화번호", "입사일", "권한", "평균통화건수", "오늘통화건수"] /*표 상단에 표시되는 텍스트*/
        const [currentInfo, setCurrentInfo] = useState({
            u_nickname: "", u_name: "", u_pwd: "", u_sDate: "", u_ph: "", u_auth: ""
        })
        const [modify, setModify] = useState();

        const showData = async () => {
            await axios.get(`http://${NetworkConfig.networkAddress}:8080/user`, {withCredentials: true})
                .then((res) => {
                        console.log(res.data);
                        let tmp = [];
                        let a;
                        res.data.forEach((list) => {
                            if (list.u_auth === "ADMIN") {
                                a = "관리자"
                            } else if (list.u_auth === "USER") {
                                a = "일반직원"
                            } else {
                                a = "퇴사"
                            }

                            tmp.push({
                                user_id: list.user_id,
                                u_name: list.u_name,
                                u_nickname: list.u_nickname,
                                u_pwd: list.u_pwd,
                                u_ph: list.u_ph,
                                u_sDate: list.u_sDate,
                                u_auth: a,
                                averge_call: list.average_call,
                                today_call_num: list.today_call_num
                            })
                        })
                        console.log(tmp)
                        setContents(tmp);
                    }
                )
        }

        useEffect(() => {
            showData().then((res) => {
                console.log("done")
            })
        }, [])

        const handleInputFormChange = (e) => {
            // console.log(e);
            const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
            setCurrentInfo({
                ...currentInfo,
                [name]: value
            })
        }


        const handleClickSave = async () => {
            const emptyOrNot = ()=>{
                let a = 1;
                for(const key in currentInfo){
                    if(key==='user_id'){
                        continue;
                    }
                    if(currentInfo[key]===""){
                        console.log('hi')
                        a = 0;          // empty면 0으로 체크
                        break;
                    }
                }
                if(a === 0){
                    return true;       // a가 0이면 empty, true 리턴
                }else{
                    return false;
                }
            }

            if (emptyOrNot() === false && modify === true) {
                await axios.post(`http://${NetworkConfig.networkAddress}:8080/user`, currentInfo, {withCredentials: true}).then((res) => {
                    alert("수정 되었습니다");
                    showData()
                    handleClose();
                }).catch((err) => {
                    if(err.response.status === 402) {
                        alert("이미 있는 아이디입니다. 다시 입력해주시길 바랍니다.")
                    }
                })
            } else if(emptyOrNot() === false && modify === false) {
                console.log(currentInfo)
                await axios.post(`http://${NetworkConfig.networkAddress}:8080/user`, currentInfo, {withCredentials: true})
                    .then((res) => {
                        alert("추가 되었습니다")
                        showData()
                        handleClose();
                    }).catch((err) => {
                        if(err.response.status === 402) {
                            alert("이미 있는 아이디입니다. 다시 입력해주시길 바랍니다.")
                        }
                    })
            }
            else{
                alert("모든 폼을 입력해주세요.")
            }
        }

        const handleModifyButtonClick = (e) => {
            // 콜직원 수정버튼 클릭시
            setModify(true);
            const changeContent = {...contents[parseInt(e.target.getAttribute('name'))]};
            delete changeContent['today_call_num']; /*오늘통화건수 제외*/
            delete changeContent['average_call']; /*평균통화건수 제외*/
            let a;
            if (changeContent['u_auth'] === "관리자") {
                console.log(currentInfo.u_auth)
                a = "ADMIN"
            } else if (changeContent['u_auth'] === "일반직원") {
                console.log(currentInfo.u_auth)
                a = "USER"
            } else {
                console.log(currentInfo.u_auth)
                a = "FIRED"
            }
            changeContent['u_auth'] = a;
            if (changeContent['u_sDate'] != null) {
                let date = changeContent['u_sDate'].replaceAll('/', '-');
                changeContent['u_sDate'] = date;
            }

            setCurrentInfo(changeContent)
            handleOpen(); /*수정창을 오픈한다*/
        }
        const handleAddButtonClick = (e) => {
            setModify(false)
            setCurrentInfo({
                u_nickname: "", u_name: "", u_pwd: "", u_sDate: "", u_ph: "", u_auth: "", user_id: ""
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
    }
;

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

  & > div:nth-child(1) {
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