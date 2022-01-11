import React from 'react';
import styled from 'styled-components';
import MessangerList from "./MessangerList";

/*
날짜: 2022/01/11 11:28 AM
작성자: 정도식
작성내용: 수정요청사항을 담는 컨테이너
*/
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
  margin: 10px 0;
  border-radius: 10px;
  padding: 3px 7px;
`;
const Header = styled.div`
color: #6D5A00;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  padding: 20px;
`

export default MessangerContainer;