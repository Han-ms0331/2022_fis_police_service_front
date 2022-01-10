import React from 'react';
import styled from 'styled-components';
import MessangerList from "./MessangerList";

const MessangerContainer = () => {
    return (
        <Announcement>
            <Header>수정 요청 사항</Header>
            <MessangerList/>
        </Announcement>
    );
};
const Announcement = styled.div`
  background: #F8EFBA;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
`;
const Header = styled.div`
color: #6D5A00;
`

export default MessangerContainer;