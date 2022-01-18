import React from 'react';
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";

const SendMessage = () => {

    const handleSend=(e)=>{
        e.preventDefault();
        console.log("sent")
    }
    return (
        <Main>
            <Header>10:34 오전</Header>
            <Content class="form" onSubmit={handleSend}>
                <input placeholder="요청 사항을 입력하세요..."/>
                <CustomButton type="normal" submitType="submit" backgroundColor="#f7e98b" border= "1.5px solid #c9b034" borderRadius="7px" content="보내기" color="#222" fontSize="14px" padding="0px" margin="7px 0"/>
            </Content>
        </Main>
    );
};

//style
const Main = styled.div`
padding: 0 0 10px 0;
`;

const Header = styled.div`
  text-align: unset;
  font-size: 16px;
  background: #f7e98b;
  padding: 3px 7px;
  height: 15px;
`;
const Content = styled.form`
    background: #fff9d6;
    padding: 7px;
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  &>input{
    background: #fff9d6;
    border: none;
    font-size: 17px;
    width: 100%;
  }
  &>button{
    position: absolute;
    bottom: 3px;
    right: 3px;
  }
`;
export default SendMessage;