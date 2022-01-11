import React from 'react';
import styled from 'styled-components';
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined';
/*
날짜: 2022/01/11 11:27 AM
작성자: 정도식
작성내용: 각각의 수정요청 사항 1차 뷰
*/
const MessangerList = () => {
    return (
        <div>
            <Header>10:34오전</Header>
            <Content>
                <p>원보라(<CallEndOutlinedIcon/>):</p>
                <p>무언가 잘못했어요. 고쳐주세요.</p>
                <div>
                <Button>수정완료</Button>
                </div>
            </Content>
        </div>
    );
};

const Header = styled.div`
text-align: unset;
  font-size: 0.7rem;
  background: #f7e98b;
  padding: 3px 7px;
`;

const Content = styled.div`
    background: #fff9d6;
    padding: 0px 5px;
  &>p{
    margin: 2px;
    font-size: 0.9rem;
    text-align: unset;
  }
  &>div{
    text-align: center;
    text-align: center;
  }
`;

const Button =  styled.button`
  background:#f7e98b;
  border: 1.5px solid #c9b034;
  border-radius: 7px;
  font-size: 0.7rem;
  text-align: center;
  margin: 5px;
  //padding: 5px;
  &:hover{
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export default MessangerList;