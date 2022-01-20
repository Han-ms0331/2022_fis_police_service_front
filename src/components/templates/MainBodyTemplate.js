import React, {useState} from 'react';
import MapView from "../organisms/MapView";
import SearchForm from "../organisms/SearchForm";
import ListContainer from "../organisms/ListContainer";
import axios from "axios";
import {useRecoilState} from "recoil";
import {
    SelectedCenterCallList,
    SelectedCenterId,
    SelectedCenterInfo,
    SelectedCenterScheduleList
} from "../../store/SelectedCenterStore";
import CustomCalendar from "../atoms/CustomCalendar";
import AgentContainer from "../organisms/AgentContainer";
import styled from "styled-components";

function MainBodyTemplate(props) {
    const {isSelected, setIsSelected} = props;
    const [currentInfo, setCurrentInfo] = useState({        //검색창에 입력된 내용을 담는 state
        centerName: "",
        centerAddress: "",
        centerPhone: ""
    });
    const [centerList, setCenterList] = useState([])    //검색 결과로 나온 시설들의 리스트를 담는 state
    const [centerLocation, setCenterLocation] = useState([]);   //선택된 시설의 위 경도 정보
    const [selectedCenterId, setSelectedCenterId] = useRecoilState(SelectedCenterId);
    const [selectedCenterInfo, setSelectedCenterInfo] = useRecoilState(SelectedCenterInfo);
    const [selectedCenterCallList, setSelectedCenterCallList] = useRecoilState(SelectedCenterCallList);
    const [selectedCenterScheduleList, setSelectedCenterScheduleList] = useRecoilState(SelectedCenterScheduleList);

    const headerContent = ["시설명", "주소", "전화번호", "연락기록", "방문여부"]     //리스트 헤더


    /*
        날짜: 2022/01/18 5:02 오후
        작성자: 한명수
        작성내용: 검색 결과로 나온 시설 리스트중 하나를 선택했을 때 작동하는 함수
    */
    const onSelect = async (e) => {
        console.log(e.target.name);
        await axios.get('/main/center/select?center_id={e.target.name}')
            .then((res) => {
                setSelectedCenterId(res.data.id)//현재 선택된 시설의 아이디 전역으로 저장
                setSelectedCenterInfo({ //centerInfo에 들어갈 내용 저장(이름, 주소, 전화번호)
                    c_name: res.data.c_name,
                    c_address: res.data.c_address,
                    c_ph: res.data.c_ph,
                    c_people: res.data.c_people
                })
                setSelectedCenterCallList(res.data.callList)//callList에서 뜰 리스트 저장
                setSelectedCenterScheduleList(res.data.scheduleList)//scheduleList에서 뜰 내용 저장
                setCenterLocation([res.data.c_latitude, res.data.c_longitude]);
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

    const onSearch = async () => {
        await axios.get('/main/center/search?c_name={value}&c_address={value} &c_ph={value}')
            .then((res) => {
                setCenterList(res.data.lists);
                setIsSelected(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>

            <div style={{width: "100%", display: "flex", justifyContent: "center", margin: "30px 0px 40px 0px"}}>
                <SearchForm onSubmitFunction={onSearch} setSearch={handleSearchInputChange}/>
            </div>

            {isSelected ?

                <Container>
                    <Left>
                        <div style={{marginBottom: "20px", marginLeft: "20px"}}>
                            <CustomCalendar/>
                        </div>
                        <div>
                            <AgentContainer/>

                        </div>
                    </Left>
                    <Right>
                        <MapView thisCenter={onSearch} thisCenterInfo={selectedCenterInfo}
                                 thisCenterLocation={centerLocation}/>
                    </Right>

                </Container>
                :
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ListContainer width="1500px"  height="1000px" headerContents={headerContent} contents={centerList}
                                   gridRatio="1fr 3fr 2fr 1fr 1fr 1fr" buttonContent="선택"
                                   onClickFunction={onSelect}/>
                </div>
            }
        </div>


    );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 270px auto;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MainBodyTemplate;