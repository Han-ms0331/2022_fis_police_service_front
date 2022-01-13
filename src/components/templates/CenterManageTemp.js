import React, {useState} from 'react';
import SearchForm from "../organisms/SearchForm";
import ListContainer from "../organisms/ListContainer";

function CenterManageTemp(props) {
    const [input, setInput] = useState({
        centerName: "",
        centerAddress: "",
        centerPhone: "",
    })

    const onChange = (e) => {
        // console.log(e);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInput({
            ...input, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
        console.log(input);
    }

    const showList = () => {
        //api 요청
    }

    const handleModifyButtonClick = (e) => {
        // button이 관리페이지의 정보 수정 버튼일 시...

        console.dir(e)




    }


    let headerContent = [
        "시설아이디", "시설이름", "참여여부", "전화번호", "시설주소"
    ]

    let contents = [{
        centerId: "test1",
        centerName: "동그라미유치원",
        participation: "참여",
        centerPhone: "010-2105-7345",
        centerAddress: "서울시 노원구 동일로 215길 48"
    }
        , {
            centerId: "test2",
            centerName: "하이유치원",
            participation: "참여",
            centerPhone: "010-2105-7345",
            centerAddress: "서울시 노원구 동일로 215길 48"
        }]

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: props.width,
            height: props.height
        }}>
            <div style={{marginBottom: "30px"}}>
                <SearchForm onSubmitFunction={showList} setSearch={onChange} width="100%" height="100%"/>
            </div>
            <ListContainer style={{width: "100%", height: "100%"}} headerContents={headerContent} contents={contents}
                           gridRatio="1fr 1fr 1fr 1fr 3fr 1fr" buttonContent="정보수정" clickFunction={handleModifyButtonClick}/>
        </div>
    );
}

export default CenterManageTemp;

/*
    날짜 : 2022/01/13 11:40 AM
    작성자 : 신은수
    작성내용 : headerContent(list의 header 내용)는 CenterManageTemp에서 선언하여 listContainer에 props로 넘겨줌.
    contents는 api 요청해서 받아온 걸 listContainer에 prop로 넘겨줌..?
    일단은 api요청을 못하는 상태이므로 CenterManageTemp에서 선언하여 listContainer에 prop로 넘겨줌.

    width, height 문제...
 */