import React from 'react';
import styled from 'styled-components';
import logo from '../media/logo.png'
import {BiUser} from "react-icons/bi";
import {RiLockPasswordLine} from "react-icons/ri"
import {Link} from "react-router-dom";
import CustomButton from "../atoms/CustomButton";

/*
    날짜: 2022/01/11 10:44 오전
    작성자: 한명수
    작성내용:  아이디와 비밀번호입력창, 로그인 버튼이 있는 폼
*/
/*
날짜: 2022/01/14 10:34 AM
작성자: 정도식
작성내용: 로그인폼 2차 디자인
*/
const LoginForm = (props) => {
    return (
        <Main>
            <Container>
                <img src={logo}/>
                <div className="inputContainer">
                    <InputRow>
                        <div className="icon"><BiUser/></div>
                        <input id="username" type="text" placeholder="아이디"/>
                    </InputRow>
                    <InputRow>
                        <div className="icon"><RiLockPasswordLine/></div>
                        <input id="password" type="password" placeholder="비밀번호"/>
                    </InputRow>
                    <Link to={"/main"}><CustomButton type="normal" width="100%" height="40px" borderRadius="6px"
                                                     color="#fff" backgroundColor="#FFD400" content="로그인"
                                                     onClick={props.onClickFunction}/></Link>
                </div>
            </Container>
        </Main>
    );
}
const Main = styled.div`
  & img { /*fis logo*/
    position: relative;
    width: 200px;
    margin: 50px 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  height: 550px;
  border: 1px solid #dadada;
  box-shadow: 1.5px 2px #dadada;
  border-radius: 20px;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  font-size: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.13);

  & a {
    text-decoration: none;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 9fr;
  border: 1px solid #dadada;
  margin-bottom: 20px;
  width: 280px;
  height: 40px;
  border-radius: 6px;

  & .icon {
    justify-self: center;
    align-self: center;
    width: 20px;
    height: 20px;
    color: #8a8a8a;
  }

  & input {
    width: 98%;
    justify-self: start;
    color: #222;
    cursor: pointer;
    box-sizing: content-box;
    border: none;
  }
`;
export default LoginForm;

