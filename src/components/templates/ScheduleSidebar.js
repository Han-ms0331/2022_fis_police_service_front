import React, {useState} from 'react';
import styled from "styled-components";
import CustomCalendar from "../atoms/CustomCalendar";
import DateContainer from "../organisms/DateContainer";
import MessangerContainer from "../organisms/MessangerContainer";
import {Style} from "../../Style";

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
    return (
        <Container>
            <Items>
            <CustomCalendar className="calendar" setDate={setDate}/>
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