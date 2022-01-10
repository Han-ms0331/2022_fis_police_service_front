import React from 'react';
import styled from 'styled-components';

const DateContainer = ({date}) => {
    console.log((date));
    return (
        <Container>
            <SelectedDate>
                <Header>선택날짜</Header>
                <Header>스케쥴 개수</Header>
            </SelectedDate>

            </Container>
            );
};



// styled-components

const Container = styled.div`
height: 15vh;
background: #F8EFBA;
margin: 10px;
  border-radius: 10px;
  text-align: center;
`
const SelectedDate = styled.div`
`;

const Header = styled.div`
color: #6D5A00;
`


const Announcement = styled.div`

`;


export default DateContainer;