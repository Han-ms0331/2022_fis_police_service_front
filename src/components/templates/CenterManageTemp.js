import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SearchForm from "../organisms/SearchForm";
import ListContainer from "../organisms/ListContainer";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CenterManageInputForm from "../organisms/CenterManageInputForm";
import CustomButton from "../atoms/CustomButton";
import {center} from "../../store/dummy-data/center";
import axios from "axios";
import {Style} from "../../Style";
import NetworkConfig from "../../configures/NetworkConfig";
import Swal from "sweetalert2";
import '../atoms/swal.css'
import CustomSpinner from "../atoms/CustomSpinner";


function CenterManageTemp(props) {
    const headerContent = ["시설이름", "참여여부", "전화번호", "시설주소"]

    //form이 열리고 닫히고에 관련된 state 정의
    const [open, setOpen] = useState(false);

    //검색 창에 검색어에 대한 상태 정의
    const [searchInput, setSearchInput] = useState({
        c_name: "",
        c_address: "",
        c_ph: ""
    })

    //검색했을 때 오는 내용을 저장하는 contents에 대한 상태 정의
    const [contents, setContents] = useState([])

    //선택한 시설에 대한 정보들을 관리할 상태 정의
    const [currentInfo, setCurrentInfo] = useState({
        center_id: "",
        c_name: "",
        c_ph: "",
        c_address: ""
    })

    //정보 수정 버튼 눌렀을 때는 true로, 시설 추가 눌렀을 때는 false로 set하는 modify 상태에 대한 정의
    const [modify, setModify] = useState();
    const [loading,setLoading] = useState(false);

    // 여기서 부터 함수 정의
    // 검색 버튼 눌렀을 때 list를 보여주는 함수 정의
    async function apiGetCall(c_name, c_address, c_ph) {
        await axios.get(`http://${NetworkConfig.networkAddress}:8080/center/search?c_name=${c_name}&c_address=${c_address}&c_ph=${c_ph}`, {withCredentials: true})
            .then((res) => {
                let tmp = [];
                res.data.data.forEach((list) => {
                    tmp.push({
                        center_id: list.center_id,
                        c_name: list.c_name,
                        participation: list.participation,
                        c_ph: list.c_ph,
                        c_address: list.c_address
                    })
                })
                setContents(tmp);
                setLoading(false);
                // console.log(tmp);
                // console.log(contents);
            })
            .catch((err) => {
                Swal.fire({
                    icon: "warning",
                    title: "서버오류입니다.",
                    text: "잠시 후 재시도해주세요.",
                    confirmButtonText: "확인",
                    confirmButtonColor: Style.color2
                })
            })
    }


    const showList = async (e) => {
        e.preventDefault();
        const {c_name, c_address, c_ph} = searchInput;
        if (c_name == "" && c_address == "" && c_ph == "") {
            Swal.fire({
                icon: 'info',
                title: '검색어를 입력해주세요.',
                confirmButtonColor: Style.color2,
                confirmButtonText: '확인',
            })
        } else {
            apiGetCall(c_name, c_address, c_ph);
            setLoading(true);
        }

    }
// form이 보이고 안보이고에 대한 함수 정의
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

// 검색 창에 검색어가 바뀌면, 바뀐 검색어를 위에서 정의한 searchInput이라는 상태에 저장하는 함수 정의
    const handleSearchInputChange = (e) => {
        const {value, name} = e.target;
        setSearchInput({
            ...searchInput,
            [name]: value
        });
        console.log(searchInput);
    }

// inputForm의 입력창에 글씨가 바뀌면, 위에서 정의한 currentInfo 상태에 입력창에 적힌 글씨를 저장하는 함수 정의
    const handleInputFormChange = (e) => {
        // console.log(e);
        const {value, name} = e.target;
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        });
        console.log(currentInfo);
    }

// 정보 수정 버튼을 누르면 inputForm의 input으로 시설아이디, 시설이름, 전화번호, 시설주소 가져오는 함수
    const handleModifyButtonClick = (e) => {
        setModify(true);
        console.log(e.target.getAttribute("name"))
        setCurrentInfo(contents[e.target.getAttribute("name")])
        handleOpen();
    }

// 시설 추가 버튼을 누르면 일어나는 일에 대한 함수. 시설을 선택한 것이 아니므로 currentInfo의 정보를 모두 null로 set함
    const handleAddButtonClick = (e) => {
        setModify(false);
        setCurrentInfo({
            center_id: "",
            c_name: "",
            c_ph: "",
            c_address: ""
        });
        handleOpen();
    }

// inputForm에서 저장버튼 눌렀을 때에 대한 함수 정의
    const handleClickSave = async () => {
        const emptyOrNot = () => {
            let a = 1;
            for (const key in currentInfo) {
                if (key === 'center_id') {
                    continue;
                }
                if (currentInfo[key] === "") {
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

        if (emptyOrNot() === false && modify === true) { // 수정
            await axios.patch(`http://${NetworkConfig.networkAddress}:8080/center`, currentInfo, {withCredentials: true})
                .then(() => {
                        const {c_name, c_address, c_ph} = searchInput;
                        apiGetCall(c_name, c_address, c_ph);
                        Swal.fire({
                            icon: 'success',
                            title: '수정되었습니다.',
                            confirmButtonColor: Style.color2,
                            confirmButtonText: '확인',
                        })
                        handleClose();
                    }
                ).catch((err) => {
                    Swal.fire({
                        icon: 'warning',
                        title: '서버오류입니다.',
                        text: '잠시 후 재시도해주세요.',
                        confirmButtonColor: Style.color2,
                        confirmButtonText: '확인',
                    })
                })
        } else if (emptyOrNot() === false && modify === false) { // 추가
            await axios.post(`http://${NetworkConfig.networkAddress}:8080/center`, currentInfo, {withCredentials: true})
                .then(() => {
                        const {c_name, c_address, c_ph} = searchInput;
                        apiGetCall(c_name, c_address, c_ph);
                        Swal.fire({
                            icon: 'success',
                            title: '추가되었습니다.',
                            confirmButtonColor: Style.color2,
                            confirmButtonText: '확인',
                        })
                        handleClose();
                    }
                ).catch((err) => {
                    Swal.fire({
                        icon: 'warning',
                        title: '서버오류입니다.',
                        text: '잠시 후 재시도해주세요.',
                        confirmButtonColor: Style.color2,
                        confirmButtonText: '확인',
                    })
                })
        } else {
            Swal.fire({
                icon: 'warning',
                title: '폼을 모두 입력해주세요.',
                confirmButtonColor: Style.color2,
                confirmButtonText: '확인',
            })
        }

    }

    return (
        <Main>
            <div style={{margin: "20px 0px 30px 0px"}}>
                <SearchForm onSubmitFunction={showList} setSearch={handleSearchInputChange} width="100%"
                            height="100%"/> {/*시설정보를 검색하는 부분*/}
            </div>
            {loading===true?<CustomSpinner/>: <ListContainer headerContents={headerContent} contents={contents} width="1800px"
                                                             gridRatio="1fr 1fr 1fr 2fr 1fr" buttonContent="정보수정"
                                                             onClickFunction={handleModifyButtonClick}/>}

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{zIndex: 2}}
            >
                <Box sx={style}>
                    <CenterManageInputForm handleClose={handleClose} handleClickSave={handleClickSave}
                                           handleInputFormChange={handleInputFormChange} currentInfo={currentInfo}/>
                </Box>
            </Modal>
            <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                          backgroundColor={Style.color2} content="시설 추가 +" onClick={handleAddButtonClick}/>
        </Main>
    );
}

export default CenterManageTemp;

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
  margin-top: -20px;

  & > div:nth-child(2) {
    margin-top: 5px;
    height: 880px;
    overflow: auto;
  }

  & > button { /*콜직원 추가*/
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translate(-28.5%, 0);
  }
`;


/*
    날짜 : 2022/01/13 11:40 AM
    작성자 : 신은수
    작성내용 : headerContent(list의 header 내용)는 CenterManageTemp에서 선언하여 listContainer에 props로 넘겨줌.
    contents는 api 요청해서 받아온 걸 listContainer에 prop로 넘겨줌..?
    일단은 api요청을 못하는 상태이므로 CenterManageTemp에서 선언하여 listContainer에 prop로 넘겨줌.

 */

/*
    날짜 : 2022/01/16 11:11 PM
    작성자 : 신은수
    작성내용 :
    inputForm에 대한 정보를 원래 inputForm에서 state로 관리를 하려고 했고,
    searchForm에 대한 정보도 searchForm에서 state로 관리 하려고 했음.
    ->but, inputForm과 searchForm의 정보를 form의 상위 컴포넌트인 centerManageTemp에서 state로 관리하는 것이 낫겠다는
    판단이 들어 centerManageTemp에서 searchInput이라는 상태와 currentInfo라는 상태를 정의함.
    inputForm에 currentInfo를 props로 전달한다.

 */