import React from 'react';
import styled from 'styled-components';
import logo from '../media/logo.png'
import {BiUser} from "react-icons/bi";
import {RiLockPasswordLine} from "react-icons/ri"
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";
import {ClipLoader} from "react-spinners";

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
                <img src={logo}/> {/*회사로고*/}
                <form onSubmit={props.onClickFunction} className="inputContainer">
                    <InputRow> {/*아이디*/}
                        <div className="icon"><BiUser/></div>
                        <input name="u_nickname" id="username" type="text" placeholder="아이디" onChange={props.onChangeFunction}/>
                    </InputRow>
                    <InputRow> {/*비밀번호*/}
                        <div className="icon"><RiLockPasswordLine/></div>
                        <input name="u_pwd" id="password" type="password" placeholder="비밀번호" onChange={props.onChangeFunction}/>
                    </InputRow>
                    <CustomButton type="normal" width="100%" height="40px" backgroundColor={Style.color2}
                    color={Style.color1} borderRadius={"10px"} content={props.loading ? <ClipLoader color='#495ec4' /> : "로그인"} submitType={"submit"}/>
                </form>
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
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  font-size: 20px;
  padding: 20px;
  background-color: ${Style.color1};

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
  background-color: #fff;

  & .icon {
    justify-self: center;
    align-self: center;
    width: 20px;
    height: 20px;
    color: #8a8a8a;
  }

  & input {
    width: 94.5%;
    justify-self: start;
    color: #222;
    box-sizing: content-box;
    border: none;
    border-left: 1px solid #dadada;
    padding-left: 10px;
  }
`;
export default LoginForm;

