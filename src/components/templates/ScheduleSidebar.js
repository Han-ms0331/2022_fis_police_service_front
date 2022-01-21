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
const ScheduleSidebar = () => {
    const [date, setDate] = useState(new Date());
    const [searchInput, setSearchInput] = useRecoilState(searchKeyword);
    const visit_date = `${date.getFullYear()}-${date.getMonth()+1<10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate()<10 ? `0${date.getDate()}` : date.getDate()}`;
    const setRows = useSetRecoilState(dateSelectedRows); // 날짜를 선택하기 전인 경우이므로 맨 처음 여기서 default로 dateSelectedRows에 오늘 날짜의 Rows를 설정해줘야한다. -> onChange에 넣지말고 useEffect?

    const onData = async () => {   //서버로부터 데이터를 받아와 setRows 스테이트에 데이터들을 저장하는 함수
        await axios.get(`/schedule?date=${visit_date}`)
            .then((res) => {
                // console.log(res.data);
                setRows(res.data);
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

// 디자인 비교를 위한 변수
const [color1,color2]= [Style.color1,Style.color2];


const Container = styled.div`
  //border-right: 2px solid #eee;
  padding: 0 15px;
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

const Items = styled.div`
display: grid;
  grid-template-rows: 2fr 1fr 1fr;
  &>div {
    min-width: 0;
    align-self: center;
  }
`;
export default ScheduleSidebar;