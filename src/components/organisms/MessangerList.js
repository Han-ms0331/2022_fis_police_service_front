import React, {useState} from 'react';
import styled from 'styled-components';
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined';
import axios from "axios";
import CustomButton from "../atoms/CustomButton";
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
        <Main>
            <Header>10:34오전</Header>
            <Content>
                <p>원보라(<CallEndOutlinedIcon/>):</p>
                <p>무언가 잘못했어요. 고쳐주세요.</p>
                <div>
                <CustomButton type="normal" backgroundColor="#f7e98b" border= "1.5px solid #c9b034" borderRadius="7px" content="수정완료" color="#222" fontSize="14px" padding="0px" margin="7px 0"onClick={()=>data()}>수정완료</CustomButton>
                </div>
            </Content>
        </Main>
    );
};
//style
const Main = styled.div`
padding: 0 0 10px 0;
`;

const Header = styled.div`
  font-size: 16px;
  background: #f7e98b;
  padding: 3px 7px;
`;

const Content = styled.div`
    background: #fff9d6;
    padding:  7px;
  &>p{
    margin: 0;
    font-size: 17px;
    text-align: unset;
  }
  &>div{
    text-align: center;
    &>button{
      transform: scale(1.1);
      cursor: pointer;
    }
  }
  & svg{
    font-size: 17px;
  }
`;


export default MessangerList;