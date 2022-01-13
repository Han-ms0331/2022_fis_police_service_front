import React from 'react';
import styled from 'styled-components';
import logo from '../media/logo.png'
import { BiUser } from "react-icons/bi";
import {RiLockPasswordLine} from "react-icons/ri"
import {Link} from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
// import {Button, Container} from "@mui/material";
import {Box} from "@material-ui/core";

/*
    날짜: 2022/01/11 10:44 오전
    작성자: 한명수
    작성내용:  아이디와 비밀번호입력창, 로그인 버튼이 있는 폼
*/
/*
날짜: 2022/01/12 5:40 PM
작성자: 정도식
작성내용: 로그인폼 1차 디자인
*/
const LoginForm = (props) => {
    return (
        <Main>
                <img src={logo}/>
            {BiUser}
            <Container>
                <InputRow>
                    <div className="icon"><BiUser/></div>
                    <input id="username" type="text" placeholder="아이디"/>
                </InputRow>
                <InputRow>
                    <div className="icon"><RiLockPasswordLine/></div>
                    <input id="password" type="password" placeholder="비밀번호"/>
                </InputRow>
                <button>로그인</button>
            </Container>
        </Main>
    );
}
const Main = styled.div`
    & img{ /*fis logo*/
      position: fixed;
      transform: translate(-50%, -50%);
      left: 49.5%;
      top: 19%;
      width: 200px;
    }
  & button{
    height: 40px;
    box-sizing: border-box;
    border: none;
    border-radius: 6px;
    font-size: 20px;
    cursor: pointer;
    background: #fff;
    color: #fff;
    background: #FFD400;
    }
    & button:hover {
      transform: scale(1.02);
    }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 330px;
  height: 330px;
  border: 1px solid #dadada;
  box-shadow: 1.5px 2px #dadada;
  border-radius: 20px;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  font-size: 20px;
  padding: 20px;
  background-color: rgba(255,255,255,0.13);
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 9fr;
    border: 1px solid #dadada;
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  & .icon{
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
// function LoginForm(props) {
//     const {onClickFunction} = props;
//
//     return (
//         <div>
//             <Container maxWidth={"sm"}>
//                 <span>아이디 :</span>
//                 <input/>
//             </Container>
//             <br/>
//             <br/>
//             <Container maxWidth={"sm"}>
//                 <span>비밀번호 :</span>
//                 <input/>
//             </Container>
//             <br/>
//             <br/>
//             <br/>
//             <Container maxWidth={"sm"}>
//                 <Link to={"/main"} style={{textDecoration: 'none'}}>
//                     <CustomButton width={"10vw"} height={"3vh"} backgroundColor={"#FFD400"} type={"normal"} content={"로그인"} onClick={onClickFunction}/>
//                 </Link>
//             </Container>
//         </div>
//     );
// }

