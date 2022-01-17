import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SearchForm from "../organisms/SearchForm";
import ListContainer from "../organisms/ListContainer";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CenterManageInputForm from "../organisms/CenterManageInputForm";
import CustomButton from "../atoms/CustomButton";


function CenterManageTemp(props) {
    const [open, setOpen] = React.useState(false);
    const [searchInput, setSearchInput] = useState({
        centerName: "",
        centerAddress: "",
        centerPhone: "",
    })
    const [currentInfo, setCurrentInfo] = useState({
        centerId: "",
        centerName: "",
        centerPhone: "",
        centerAddress: ""
    })


    const showList = () => {
        //검색버튼 눌렀을 때 api 요청
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSearchInputChange = (e) => {
        // console.log(e);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setSearchInput({
            ...searchInput, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
        console.log(searchInput);
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


    // useEffect(() => {
    //     console.log(currentInfo);
    // }, [currentInfo])

    const handleModifyButtonClick = (e) => {
        //inputForm의 input으로 시설아이디, 시설이름, 전화번호, 시설주소 가져오기 => 1월 14일 오늘 구현하기.
        console.log(e.target.name);
        setCurrentInfo(contents[parseInt(e.target.name)])
        handleOpen();
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

    let headerContent = [
        "시설아이디", "시설이름", "참여여부", "전화번호", "시설주소"
    ]

    let contents = [
        {
            centerId: "test1",
            centerName: "동그라미유치원",
            participation: "참여",
            centerPhone: "010-2105-7345",
            centerAddress: "서울시 노원구 동일로 215길 48"
        }
        ,
        {
            centerId: "test2",
            centerName: "하이유치원",
            participation: "참여",
            centerPhone: "010-2105-7345",
            centerAddress: "서울시 노원구 동일로 215길 48"
        }
    ]


    const handleClickSave = () => {
        //api 수정 요청 보냄,,?
        //input state 에 적혀있는 것으로 수정,,,?

        console.log("hi");

        handleClose();
    }
    return (
        <Main>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{marginBottom: "30px"}}>
                <SearchForm onSubmitFunction={showList} setSearch={handleSearchInputChange} width="100%" height="100%"/>
            </div>
            <ListContainer headerContents={headerContent} contents={contents} width="1500px" height="100vh"
                           gridRatio="1fr 1fr 1fr 1fr 3fr 1fr" buttonContent="정보수정"
                           onClickFunction={handleModifyButtonClick}/>


            <div style={{
                position: "fixed",
                bottom: "50px",
                left: "50%",
                transform: "translate(-50%,0)"
            }}>
                <CustomButton type="normal" width="150px" height="35px" borderRadius="3px" color="#222"
                              backgroundColor="#FFD400" content="시설 추가" onClick={handleAddButtonClick}/>
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
& >button{
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%,0);
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
    날짜 : 2022/01/14 10:11 AM
    작성자 : 신은수
    작성내용 : inputForm 상위 컴포넌트에서 width랑 height를 inputForm에 props로 줘서 inputForm의 가장 상위? div에서
            props로 받아온 width와 height를 width와 height로 두고싶었는데
            생각보다 별로여서..?,

            inputForm안에 있는 InputContainer의 크기가 커지면 그것을 감싸고 있는 div도 커지게 하고 싶어서
            props width랑 height를 줄 필요가 없게 됨.

 */