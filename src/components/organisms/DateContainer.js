import React from 'react';
import styled from 'styled-components';

const DateContainer = ({date}) => {
    const localDateString = date.toLocaleString().split(' ');
    const enWeekday = date.toDateString().split((' '))[0];
    const koWeekday = {'Mon':'월요일','Tue':'화요일','Wed':'수요일','Thu':'목요일','Fri':'금요일','Sat':'토요일','Sun':'일요일',}
    const weekday = koWeekday[enWeekday];
    let [year,month,day]=localDateString;
    year=year.slice(0,-1); month = month.slice(0,-1); day = day.slice(0,-1);
    const selectedDate = year+'년 '+month+'월 '+day+'일 '+weekday
    return (
        <Container>
            <SelectedDate>
                <Header>선택날짜</Header>
                <p style={{fontWeight:"400"}}>{selectedDate}</p>
                <Header>스케쥴 개수</Header>
                <p style={{fontWeight:"400"}}>269건</p>

            </SelectedDate>

            </Container>
            );
};



// styled-components

const Container = styled.div`
background: #F8EFBA;
margin: 10px 0;
  border-radius: 10px;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
`

const SelectedDate = styled.div`
    padding: 20px 0 10px 0;
`;

const Header = styled.div`
color: #6D5A00;
`


const Announcement = styled.div`

`;


export default DateContainer;