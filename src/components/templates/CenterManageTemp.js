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


function CenterManageTemp(props) {
    const [contents,setContents]=useState("")
    const headerContent = ["시설이름", "참여여부", "전화번호", "시설주소"]

    //form이 열리고 닫히고에 관련된 state 정의
    const [open, setOpen] = React.useState(false);

    //검색 창에 검색어에 대한 상태 정의
    const [searchInput, setSearchInput] = useState({
        centerName: "",
        centerAddress: "",
        centerPhone: "",
    })

    //선택한 시설에 대한 정보들을 관리할 상태 정의
    const [currentInfo, setCurrentInfo] = useState({
        centerName: "",
        centerPhone: "",
        centerAddress: ""
    })


    // 여기서 부터 함수 정의
    // 검색 버튼 눌렀을 때 list를 보여주는 함수 정의
    const showList = async () => {   //서버와 로그인 통신을 하는 부분
       await axios.get("/main/center/search?c_name={value}&c_address={value} &c_ph={value}")
            .then((res) => {
                // contents = res.data.lists
                console.log(res.data.lists)
              setContents(res.data.lists);
            })
    }

    // form이 보이고 안보이고에 대한 함수 정의
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 검색 창에 검색어가 바뀌면, 바뀐 검색어를 위에서 정의한 searchInput이라는 상태에 저장하는 함수 정의
    const handleSearchInputChange = (e) => {
        // console.log(e);
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


    // useEffect(() => {
    //     console.log(currentInfo);
    // }, [currentInfo])


    // 정보 수정 버튼을 누르면 inputForm의 input으로 시설아이디, 시설이름, 전화번호, 시설주소 가져오는 함수
    const handleModifyButtonClick = (e) => {
        // console.log(e.target.name);
        setCurrentInfo(contents[parseInt(e.target.name)])
        handleOpen();
    }

    // 시설 추가 버튼을 누르면 일어나는 일에 대한 함수. 시설을 선택한 것이 아니므로 currentInfo의 정보를 모두 null로 set함
    const handleAddButtonClick = (e) => {
        setCurrentInfo({
            centerName: "",
            centerPhone: "",
            centerAddress: ""
        });
        handleOpen();
    }

    // inputForm에서 저장버튼 눌렀을 때에 대한 함수 정의
    // const handleClickSave = () => {
    //     //api 요청 보냄.
    //     //'정보수정'일 때 api 요청이랑 '시설추가' 일 때 api 요청일 때 다른데 어떻게 처리 할 것인가.
    //     handleClose();
    // }


    const handleClickSave = async () => {   //서버와 로그인 통신을 하는 부분
        await axios.post("/manage/center")
            .then((res) => {
                console.log(res.data);
            })
        handleClose();

    }

    return (
        <Main>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div style={{marginBottom: "30px"}}>
                    <SearchForm onSubmitFunction={showList} setSearch={handleSearchInputChange} width="100%"
                                height="100%"/>
                </div>

                <ListContainer headerContents={headerContent} contents={contents} width="1800px" height="100%"
                               gridRatio="1fr 1fr 1fr 2fr 1fr" buttonContent="정보수정"
                               onClickFunction={handleModifyButtonClick}/>


                <div style={{
                    position: "fixed",
                    bottom: "50px",
                    left: "50%",
                    transform: "translate(-50%,0)"
                }}>
                    <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                                  backgroundColor={Style.color2} content="시설 추가" onClick={handleAddButtonClick}/>
                </div>


                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <CenterManageInputForm handleClose={handleClose} handleClickSave={handleClickSave}
                                               handleInputFormChange={handleInputFormChange} currentInfo={currentInfo}/>
                    </Box>

                </Modal>

            </div>
        </Main>
    );
}

export default CenterManageTemp;

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
  padding-top: 25px;

  & > button {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
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