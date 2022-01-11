import React,{useState} from 'react';
import styled from "styled-components";
import CustomCalendar from "../atoms/CustomCalendar";
import DateContainer from "../organisms/DateContainer";
import MessangerContainer from "../organisms/MessangerContainer";
import { GoChevronLeft,GoChevronRight } from "react-icons/go"; // 접을 때 필요한 아이콘
import Grid from "@material-ui/core/Grid";

/*
날짜: 2022/01/11 3:59 PM
작성자: 정도식
작성내용: collapsible sidebar 구현
*/
const ScheduleSidebar = () => {
    const [date,setDate] = useState(new Date());
    const [isSidebarOpen,setIsSidebarOpen] = useState(true);
    console.log((isSidebarOpen))
    return (
        <Container style={{transform:`${isSidebarOpen? 'translate(0)':'translate(-100%)'}` }}>
            <Grid container className={isSidebarOpen ? "grid-visible":"grid-invisible"}>

                <Grid item xs={12}>
                <CustomCalendar setDate={setDate}/>
                </Grid>

                <Grid item xs ={12}>
            <DateContainer date={date}/>
                </Grid>

                <Grid item xs = {12}>
            <MessangerContainer/>
                </Grid>

            </Grid>
            {isSidebarOpen?<GoChevronLeft className="icon" onClick={()=>setIsSidebarOpen(!isSidebarOpen)}/>:<GoChevronRight className="icon" onClick={()=>setIsSidebarOpen(!isSidebarOpen)}/>}
        </Container>
    );
};

const Container = styled.div `
    border-right: 2px solid #eee;
    padding: 0 15px;
    position: relative;
  transition: 1s ease-out;
  //transform: translate(-100%);
  
  & .grid-visible {
    opacity: 100;
    transition: 1s;
  }
  
  & .grid-invisible {
    opacity: 0;
    transition: 0.8s;
  }
  
  & .icon {
    color: #999999;
    font-size: 1.4rem;
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
export default ScheduleSidebar;