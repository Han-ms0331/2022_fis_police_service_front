import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import LoginForm from "../organisms/LoginForm";
import axios from "axios";
import {useRecoilState} from "recoil";
import {AuthorityState} from "../../store/AuthorityStore";
import {isLoginedState} from "../../store/LoginStore";
import {Redirect} from "react-router-dom";

/*
    날짜: 2022/01/11 10:57 오전
    작성자: 한명수
    작성내용: loginTemple, 로그인 페이지를 구성함, 로그인 api 호출
*/

function LoginTemplate(props) {
    const [loginInfo, setLoginInfo] = useState({
        u_nickname: "",
        u_pwd: ""
    });

    const [isLogined, setIsLogined] = useRecoilState(isLoginedState);

    const handleInputFormChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출{
        setLoginInfo({
            ...loginInfo, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    const onLogin = async () => {   //서버와 로그인 통신을 하는 부분

        console.log(loginInfo);
        await axios.post("http://localhost:8080/login", loginInfo, {withCredentials: true})
            .then((res) => {
                console.log(res);
                if (res.data.result !== "fail")
                    setIsLogined(true);
            })
        await axios.get("http://localhost:8080/login", {withCredentials: true})
            .then((res) => {
                console.log(res);
            })

    }


    console.log(isLogined);
    return (
        isLogined ?
            <Redirect to={'/main'}/>
            :
            <div>
                <LoginForm onClickFunction={onLogin} onChangeFunction={handleInputFormChange}/>
            </div>
    );
}

export default LoginTemplate;