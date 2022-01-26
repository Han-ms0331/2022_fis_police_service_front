import React, {useEffect, useState} from 'react';
import MapView from "../organisms/MapView";
import SearchForm from "../organisms/SearchForm";
import ListContainer from "../organisms/ListContainer";
import axios from "axios";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    SelectedCenterCallList,
    SelectedCenterId,
    SelectedCenterInfo, SelectedCenterList, SelectedCenterListInfo,
    SelectedCenterScheduleList
} from "../../store/SelectedCenterStore";
import CustomCalendar from "../atoms/CustomCalendar";
import AgentContainer from "../organisms/AgentContainer";
import styled from "styled-components";
import {searchKeyword} from "../../store/ScheduleSearchKeyword";
import {dateSelectedRows} from "../../store/DateSelectedRowsStore";
import {ClickedAgentInfo, SelectedAgentInfo} from "../../store/SelectedAgentStore";
import NetworkConfig from "../../configures/NetworkConfig";
import {Style} from "../../Style";
import {SelectedDateState} from "../../store/SelectedDateStore";
import Swal from "sweetalert2";

function MainBodyTemplate(props) {
    const {isSelected, setIsSelected} = props;
    const [currentInfo, setCurrentInfo] = useState({        //검색창에 입력된 내용을 담는 state
        c_name: "",
        c_address: "",
        c_ph: ""
    });
    const [centerList, setCenterList] = useState([])    //검색 결과로 나온 시설들의 리스트를 담는 state
    const [centerLocation, setCenterLocation] = useState([]);   //선택된 시설의 위 경도 정보
    const [selectedCenterId, setSelectedCenterId] = useRecoilState(SelectedCenterId);
    const [selectedCenterInfo, setSelectedCenterInfo] = useRecoilState(SelectedCenterInfo);
    const [selectedCenterCallList, setSelectedCenterCallList] = useRecoilState(SelectedCenterCallList);
    const [selectedCenterScheduleList, setSelectedCenterScheduleList] = useRecoilState(SelectedCenterScheduleList);
    const [selectedCenterList, setSelectedCenterList] = useRecoilState(SelectedCenterList);
    const [selectedAgentInfo, setSelectedAgentInfo] = useRecoilState(SelectedAgentInfo);
    const setClickedAgent = useSetRecoilState(ClickedAgentInfo);

    const [loading, setLoading] = useState(true);
    const [date, setDate] = useRecoilState(SelectedDateState);
    const [searchInput, setSearchInput] = useRecoilState(searchKeyword);
    const visit_date = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;


    const onData = async () => {   //서버로부터 데이터를 받아와 setRows 스테이트에 데이터들을 저장하는 함수
        setLoading(true);
        await axios.get(`http://${NetworkConfig.networkAddress}:8080/center/${selectedCenterId}/date?date=${visit_date}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setSelectedAgentInfo(() => res.data.data);
                setLoading(false);
            }).catch((err)=>{
                console.log(err)
            })
    }

    useEffect(() => {
        if (selectedCenterId !== ""){
            onData(); // 날짜를 선택한 경우에 함수 실행
        }
    }, [date])

    useEffect(() => {
        setSelectedAgentInfo([]);
    }, [selectedCenterInfo])

    const headerContent = ["시설명", "주소", "전화번호", "연락기록", "방문여부"]     //리스트 헤더

    /*
        날짜: 2022/01/18 5:02 오후
        작성자: 한명수
        작성내용: 검색 결과로 나온 시설 리스트중 하나를 선택했을 때 작동하는 함수
    */
    const onSelect = async (e) => {
        await axios.get(`http://${NetworkConfig.networkAddress}:8080/center/select?center_id=${centerList[e.target.getAttribute('name')].center_id}`,{withCredentials:true})
            .then((res) => {
                console.log(res.data.data);
                setSelectedCenterId(res.data.data.center_id)//현재 선택된 시설의 아이디 전역으로 저장
                setSelectedCenterInfo({ //centerInfo에 들어갈 내용 저장(이름, 주소, 전화번호)
                    center_id: res.data.data.center_id,
                    c_name: res.data.data.c_name,
                    c_address: res.data.data.c_address,
                    c_ph: res.data.data.c_ph,
                    c_people: res.data.data.c_people
                })
                setSelectedCenterCallList(res.data.data.callList)//callList에서 뜰 리스트 저장
                setSelectedCenterScheduleList(res.data.data.scheduleList)//scheduleList에서 뜰 내용 저장
                setCenterLocation([res.data.data.c_latitude, res.data.data.c_longitude]);
                setSelectedCenterList(res.data.data.ceterList);
                setClickedAgent({});
                setIsSelected(true);
            })
    }
    /*
        날짜: 2022/01/18 5:02 오후
        작성자: 한명수
        작성내용: 검색창에 입력을 할 때 작동하는 함수
    */
    const handleSearchInputChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출{
        setCurrentInfo({
            ...currentInfo, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    };
    /*
        날짜: 2022/01/18 5:01 오후
        작성자: 한명수
        작성내용: 시설을 검색하였을때 작동하는 함수
    */
    const onSearch = async (e) => {
        console.log(currentInfo);
        e.preventDefault();
        if (currentInfo.c_name == "" && currentInfo.c_address == "" && currentInfo.c_ph == "") {
            Swal.fire({
                title: '검색어를 입력하세요.',
                icon: 'info',
                confirmButtonText: '확인',
                confirmButtonColor: Style.color2,
            })
        } else {
            await axios.get(`http://${NetworkConfig.networkAddress}:8080/center/search?c_name=${currentInfo.c_name}&c_address=${currentInfo.c_address} &c_ph=${currentInfo.c_ph}`, {withCredentials: true})
                .then((res) => {
                    console.log(res.data.data)
                    setCenterList(res.data.data);
                    setIsSelected(false);
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

    }


    return (
        <Main>
            <div style={{width: "100%", margin: "30px 0px 40px 75px"}}>
                <SearchForm onSubmitFunction={onSearch} setSearch={handleSearchInputChange}/>
            </div>
            {isSelected ?
                <Container>
                    <Left>
                        <CustomCalendar className="calendar" setDate={setDate}/>
                        <AgentContainer content={selectedAgentInfo} loading={loading}/>
                    </Left>
                    <Right>
                        <MapView thisCenter={onSearch} thisCenterInfo={selectedCenterInfo}
                                 thisCenterLocation={centerLocation}/>
                    </Right>
                </Container>
                :
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ListContainer width="1500px" height="1000px" headerContents={headerContent} contents={centerList}
                                   gridRatio="1fr 3fr 2fr 1fr 1fr 1fr" buttonContent="선택"
                                   onClickFunction={onSelect}/>
                </div>
            }
        </Main>


    );
}

const Main = styled.div`
  border-right: 2px solid #eee;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 320px auto;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -28px;

  & > div {
    margin-left: 20px;
    margin-bottom: 20px;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MainBodyTemplate;