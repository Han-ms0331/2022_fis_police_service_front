import React from 'react';
import {Link} from "react-router-dom";
import CustomButton from "../atoms/CustomButton";
import {Button, Container} from "@mui/material";
import {Box} from "@material-ui/core";

/*
    날짜: 2022/01/11 10:44 오전
    작성자: 한명수
    작성내용:  아이디와 비밀번호입력창, 로그인 버튼이 있는 폼
*/
function LoginForm(props) {
    const {onClickFunction} = props;

    return (
        <div>
            <Container maxWidth={"sm"}>
                <span>아이디 :</span>
                <input/>
            </Container>
            <br/>
            <br/>
            <Container maxWidth={"sm"}>
                <span>비밀번호 :</span>
                <input/>
            </Container>
            <br/>
            <br/>
            <br/>
            <Container maxWidth={"sm"}>
                <Link to={"/main"} style={{textDecoration: 'none'}}>
                    <CustomButton width={"10vw"} height={"3vh"} backgroundColor={"#FFD400"} type={"normal"} content={"로그인"} onClick={onClickFunction}/>
                </Link>
            </Container>
        </div>
    );
}

export default LoginForm;