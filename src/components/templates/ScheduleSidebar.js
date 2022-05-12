import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CustomCalendar from "../atoms/CustomCalendar";
import DateContainer from "../organisms/DateContainer";
import MessangerContainer from "../organisms/MessangerContainer";
import {Style} from "../../Style";
import axios from "axios";
import {useRecoilState, useSetRecoilState} from "recoil";
import {searchKeyword} from "../../store/ScheduleSearchKeyword";
import {dateSelectedRows} from "../../store/DateSelectedRowsStore";
import NetworkConfig from "../../configures/NetworkConfig";
import Swal from "sweetalert2";
import {isLoginedState} from "../../store/LoginStore";
import {SelectedDateScheduleStore} from "../../store/SelectedDateScheduleStore";

/*
날짜: 2022/01/11 3:59 PM
작성자: 정도식
작성내용: collapsible sidebar 구현
*/
/*
날짜: 2022/01/12 3:01 PM
작성자: 정도식
작성내용: sidebar css grid로 변경
*/
/*
날짜: 2022/01/18 10:27 AM
작성자: 정도식
작성내용: 해당 날짜에 검색되는 스케줄 개수 띄우기
*/
/*
    작성시간: 2022/01/25 10:37 AM
    이름: 이창윤
    작성내용: 날짜 선택 시 스케줄 데이터를 불러오는 함수 작성
        - onData in useEffect
*/

const ScheduleSidebar = ({ setLoading }) => {
    const [date, setDate] = useRecoilState(SelectedDateScheduleStore);
    const setSearchInput = useSetRecoilState(searchKeyword);
    const visit_date = `${date.getFullYear()}-${date.getMonth()+1<10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate()<10 ? `0${date.getDate()}` : date.getDate()}`;
    const setRows = useSetRecoilState(dateSelectedRows); // 날짜를 선택하기 전인 경우이므로 맨 처음 여기서 default로 dateSelectedRows에 오늘 날짜의 Rows를 설정해줘야한다. -> onChange에 넣지말고 useEffect?
    const setIsLogined = useSetRecoilState(isLoginedState)

    const onData = async () => {   //서버로부터 데이터를 받아와 setRows 스테이트에 데이터들을 저장하는 함수
        setLoading(true);
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/schedule?date=${visit_date}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data.data)
                let datas = res.data.data;
                setRows(datas);
                setLoading(false);
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
                    setIsLogined(false);
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

    useEffect(() => {
        onData(); // 날짜를 선택한 경우에 함수 실행
        setSearchInput({ // 검색창 초기화
            schedule_id: "",              // 스케쥴 id
            a_code: "",                // 현장요원 코드
            a_name: "",                // 현장요원 이름
            center_id: "",             // 센터 id
            c_name: "",                // 센터 이름
            c_address: "",       // 센터 주소
            c_ph: "",                     // 센터 전화번호
            estimate_num: 0,               // 예상 인원
            visit_date: "",        // 방분 날짜
            visit_time: "",               // 방문 시간
            center_etc: "",                    // 센터 특이사항
            agent_etc: "",                     // 현장요원 특이사항
            modified_info: "",                  // 변경사항
            total_etc: "",                      // 스케쥴 특이사항
            call_check: "",                     // 최근 통화 상태
            call_check_info: "",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
        },);
    }, [date])

    return (
        <Container>
            <Items>
            <CustomCalendar className="calendar" setDate={setDate} />
            <DateContainer date={date}/>
            <MessangerContainer/>
            </Items>
        </Container>
    );
};

// style
const Container = styled.div`
  //padding: 0 2px;
  position: relative;
  transition: 1s ease-out;

  & .icon {    /*화살표 아이콘*/
    color: #999999;
    font-size: 29px;
    position: absolute;
    top: 50%;
    right: -16px;
    z-index: 5;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 16px;
    cursor: pointer;
  }
`;

const Items = styled.div` //sidebar를 담는 컨테이너
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 45px;
  &> div{
    margin-top: 20px;
  }
`;



export default ScheduleSidebar;