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
import NetworkConfig from "../../configures/NetworkConfig";
import Swal from "sweetalert2";
import '../atoms/swal.css'

/*
날짜: 2022/01/13 4:14 PM
작성자: 정도식
작성내용: 현장요원관리 탭
*/
const AgentManageTemplate = () => {
        const [open, setOpen] = useState(false);
        const [contents, setContents] = useState("");
        /*const contents = agent;*/
        const headerContent = ["이름", "현장요원코드", "전화번호", "차량여부", "자택주소", "장비번호", "장비 수령날짜", "퇴사 여부"]
        const [currentInfo, setCurrentInfo] = useState({
            agent_id: "",
            a_name: "",
            a_code: "",
            a_ph: "",
            a_hasCar: "",
            a_address: "",
            a_equipment: "",
            a_receiveDate: "",
            a_status: ""
        });
        const [modify, setModify] = useState();

        const showData = async () => {
            await axios.get(`http://${NetworkConfig.networkAddress}:8080/agent`, {withCredentials: true})
                .then((res) => {
                    console.log(res.data.data)
                    let tmp = [];
                    let a, b;

                    res.data.data.forEach((list) => {
                        list.a_hasCar ? a = "자차" : a = "도보"
                        list.a_status ? b = "재직" : b = "퇴사"
                        tmp.push({
                            agent_id: list.agent_id,
                            a_name: list.a_name,
                            a_code: list.a_code,
                            a_ph: list.a_ph,
                            a_hasCar: a,
                            a_address: list.a_address,
                            a_equipment: list.a_equipment,
                            a_receiveDate: list.a_receiveDate,
                            a_status: b,
                        })
                    })
                    setContents(tmp)
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        Swal.fire({
                            icon: "warning",
                            title: "세션이 만료되었습니다.",
                            text: "다시 로그인 해주세요.",
                            confirmButtonText: "확인",
                            confirmButtonColor: Style.color2
                        });
                    }else{
                        Swal.fire({
                            icon: "warning",
                            title: "서버오류입니다.",
                            text: "잠시 후 재시도해주세요.",
                            confirmButtonText: "확인",
                            confirmButtonColor: Style.color2
                        })
                    }
                })
        }

        useEffect(() => { //처음 렌더링시에만 데이터 요청
            showData().then((res) => {
                console.log("done")
            })
        }, []);


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
                ...currentInfo,
                [name]: value
            })
        };


        const handleClickSave = async () => { //정보 수정,추가 요청
            const emptyOrNot = () => {
                let a = 1;
                for (const key in currentInfo) {
                    if (key === 'agent_id') {
                        continue;
                    }
                    if (currentInfo[key] === "") {
                        console.log('hi')
                        a = 0;          // empty면 0으로 체크
                        break;
                    }
                }
                if (a === 0) {
                    return true;       // a가 0이면 empty, true 리턴
                } else {
                    return false;
                }
            }
            const showErrorMessage = (err) =>{
                if (err.response.status === 400) {
                    // alert("이미 있는 현장요원 코드 입니다. 현장 요원 코드를 다시 입력해주세요.")
                    Swal.fire({
                        icon: 'warning',
                        title: '이미 있는 현장요원 코드 입니다.',
                        text: '현장 요원 코드를 다시 입력해주세요.',
                        confirmButtonColor: Style.color2,
                        confirmButtonText: '확인',
                    })
                } else if (err.response.status === 401) {
                    // alert("잘못된 주소를 입력하셨습니다. 올바른 주소를 입력해주세요.")
                    Swal.fire({
                        icon: 'warning',
                        title: '잘못된 주소를 입력하셨습니다.',
                        text: '올바른 주소를 입력해주세요.',
                        confirmButtonColor: Style.color2,
                        confirmButtonText: '확인',
                    })
                } else {
                    // alert("서버 오류입니다. 잠시 후 재시도 해주세요.")
                    Swal.fire({
                        icon: 'warning',
                        title: '서버 오류입니다.',
                        text: '잠시 후 재시도 해주세요.',
                        confirmButtonColor: Style.color2,
                        confirmButtonText: '확인',
                    })
                }
            }

            if (emptyOrNot() === false && modify == true) {
                Swal.fire({
                    icon: "question",
                    title: '수정하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        await axios.patch(`http://${NetworkConfig.networkAddress}:8080/agent`, currentInfo, {withCredentials: true})
                            .then((res) => {
                                Swal.fire({
                                    icon: 'success',
                                    title: '수정되었습니다.',
                                    confirmButtonColor: Style.color2,
                                    confirmButtonText: '확인',
                                })
                                showData();
                                handleClose();
                            }).catch((err) => {
                                console.log(err);
                               showErrorMessage(err);
                            })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                })

            } else if (emptyOrNot() === false && modify === false) {
              /*  await axios.post(`http://${NetworkConfig.networkAddress}:8080/agent`, currentInfo, {withCredentials: true})
                    .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: '추가되었습니다.',
                                confirmButtonColor: Style.color2,
                                confirmButtonText: '확인',
                            })
                            showData();
                            handleClose();
                        }
                    ).catch((err) => {
                       showErrorMessage(err);
                    })*/
                Swal.fire({
                    icon: "question",
                    title: '추가하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        await axios.post(`http://${NetworkConfig.networkAddress}:8080/agent`, currentInfo, {withCredentials: true})
                            .then((res) => {
                                Swal.fire({
                                    icon: 'success',
                                    title: '추가되었습니다.',
                                    confirmButtonColor: Style.color2,
                                    confirmButtonText: '확인',
                                })
                                showData();
                                handleClose();
                            }).catch((err) => {
                                console.log(err);
                                showErrorMessage(err);
                            })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                })
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '폼을 모두 입력해주세요.',
                    confirmButtonColor: Style.color2,
                    confirmButtonText: '확인',
                });
            }
        };

        const handleModifyButtonClick = (e) => {
            // button이 관리페이지의 정보 수정 버튼일 시...
            setModify(true)
            console.log(e.target.name);
            const changeContent = {...contents[parseInt(e.target.getAttribute("name"))]};
            if (changeContent['a_hasCar'] === "자차") {
                changeContent['a_hasCar'] = true
            } else {
                changeContent['a_hasCar'] = false
            }
            if (changeContent['a_status'] === "재직") {
                changeContent['a_status'] = true
            } else {
                changeContent['a_status'] = false
            }

            if (changeContent['a_receiveDate'] != null) {
                let date = changeContent['a_receiveDate'].replaceAll('/', '-');
                changeContent['a_receiveDate'] = date;
            }
            setCurrentInfo(changeContent);
            handleOpen();
            console.log(changeContent);
            console.log(currentInfo);
        }
        const handleAddButtonClick = (e) => {
            setModify(false)
            setCurrentInfo({
                a_name: "",
                a_code: "",
                a_ph: "",
                a_hasCar: "",
                a_address: "",
                a_equipment: "",
                a_receiveDate: "",
                a_status: ""
            });
            handleOpen()
        }
        return (
            <Main>
                <ListContainer width="1800px" headerContents={headerContent} contents={contents}
                               gridRatio="1fr 1fr 1fr 1fr 3fr 1fr 1fr 1fr 1fr" buttonContent="정보수정"
                               onClickFunction={handleModifyButtonClick}/>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{zIndex: 2}}
                >
                    <Box sx={style}>
                        <AgentManageInputForm handleClose={handleClose} currentInfo={currentInfo}
                                              handleInputFormChange={handleInputFormChange}
                                              handleClickSave={handleClickSave}/>
                    </Box>
                </Modal>

                <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                              backgroundColor={Style.color2} content="현장요원 추가 +" onClick={handleAddButtonClick}/>
            </Main>
        );
    }
;


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

  & > div:nth-child(1) {
    height: 960px;
    overflow: auto;
  }

  & > button { /*콜직원 추가*/
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translate(-28.5%, 0);
  }
`;

export default AgentManageTemplate;