import React, {useState} from 'react';
import styled from 'styled-components';
import MessangerList from "./MessangerList";
import SendMessage from "./SendMessage";
import {Style} from "../../Style";
import {useRecoilValue} from "recoil";
import {userAuthority} from "../../store/LoginStore";

/*
날짜: 2022/01/11 11:28 AM
작성자: 정도식
작성내용: 수정요청사항을 담는 컨테이너
*/

const MessangerContainer = () => {
    const authority = useRecoilValue(userAuthority);
    return (
        <>
            <Announcement>
                <Header>수정 요청 사항</Header>
                {authority==="ADMIN"?<MessangerList/>:<SendMessage/>}
            </Announcement>
        </>
    );
};
const Announcement = styled.div`
  //background: #F8EFBA;
  background: ${Style.color1};
  width: 262px;
  margin: 10px 0;
  border-radius: 10px;
  padding: 3px 7px;
  border:2px solid ${Style.color2};
`;
const Header = styled.div`
  color: #6D5A00;
  text-align: center;
  font-size: 21px;
  font-weight: 600;
  padding: 20px;
`

export default MessangerContainer;