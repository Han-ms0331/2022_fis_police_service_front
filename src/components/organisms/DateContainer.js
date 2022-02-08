import React from 'react';
import styled from 'styled-components';
import {useRecoilValue} from "recoil";
import {rowCount} from "../../store/DateSelectedRowsStore";
import {Style} from "../../Style";

const DateContainer = (props) => {
    function getSelectedDate() { // 선택날짜를 ----년-월-일-요일 형식으로 구하는 함수
        const localDateString = props.date.toLocaleString().split(' ');
        const enWeekday = props.date.toDateString().split((' '))[0];
        const koWeekday = {'Mon':'월요일','Tue':'화요일','Wed':'수요일','Thu':'목요일','Fri':'금요일','Sat':'토요일','Sun':'일요일',}
        const weekday = koWeekday[enWeekday];
        let [year,month,day]=localDateString;
        year=year.slice(0,-1); month = month.slice(0,-1); day = day.slice(0,-1);
        return year+'년 '+month+'월 '+day+'일 '+weekday
    }
    const selectedDate =getSelectedDate();
    const numOfRows = useRecoilValue(rowCount);
    return (
        <Container>
            <SelectedDate>
                <Header>선택날짜</Header>
                <p>{selectedDate}</p>
                <Header>스케쥴 개수</Header>
                <p>{numOfRows}건</p>
            </SelectedDate>
            </Container>
            );
};



// styled-components

const Container = styled.div`
//background: #F8EFBA;
background: ${Style.color1};
  width: 300px;
margin: 10px 0;
  border-radius: 10px;
  text-align: center;
  font-size: 21px;
  font-weight: 600;
  border:2px solid ${Style.color2};
`

const SelectedDate = styled.div`
    padding: 20px 0 10px 0;
    color: ${Style.color2};
  &> p{
    font-weight: 400;
  }
`;

const Header = styled.div`
color: #6D5A00;
`;

export default DateContainer;