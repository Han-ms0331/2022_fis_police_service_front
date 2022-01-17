import React, {useState} from 'react';
import styled from 'styled-components';
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined';
import axios from "axios";
/*
날짜: 2022/01/11 11:27 AM
작성자: 정도식
작성내용: 각각의 수정요청 사항 1차 뷰
*/
const MessangerList = () => {
    const [message,setMessage]=useState('')
    const data = async () =>{
        await axios.get("/messenger").then((res)=>{
            setMessage(res.data.message)
        })
    }

    return (
        <div>
            <Header>10:34오전</Header>
        <h2>{message}</h2>
            <Content>
                <p>원보라(<CallEndOutlinedIcon/>):</p>
                <p>무언가 잘못했어요. 고쳐주세요.</p>
                <div>
                <Button onClick={()=>data()}>수정완료</Button>
                </div>
            </Content>
        </div>
    );
};

const Header = styled.div`
text-align: unset;
  font-size: 16px;
  background: #f7e98b;
  padding: 3px 7px;
`;

const Content = styled.div`
    background: #fff9d6;
    padding: 0px 5px;
  &>p{
    margin: 0;
    font-size: 17px;
    text-align: unset;
  }
  &>div{
    text-align: center;
  }
  & svg{
    font-size: 17px;
  }
`;

const Button =  styled.button`
  background:#f7e98b;
  border: 1.5px solid #c9b034;
  border-radius: 7px;
  font-size: 15px;
  text-align: center;
  margin: 9px;
  &:hover{
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export default MessangerList;