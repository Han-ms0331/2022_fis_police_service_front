import React, {useEffect} from 'react';
import styled from "styled-components";
import LoginForm from "../organisms/LoginForm";
import axios from "axios";
import {useRecoilState} from "recoil";
import {AuthorityState} from "../../store/AuthorityStore";

/*
    날짜: 2022/01/11 10:57 오전
    작성자: 한명수
    작성내용: loginTemple, 로그인 페이지를 구성함, 로그인 api 호출
*/

function LoginTemplate(props) {
    const onLogin = async () => {   //서버와 로그인 통신을 하는 부분
        await axios.get("/login")
            .then((res) => {
                console.log(res.data.result);
                if (res.data.result === "success")
                    localStorage.setItem("loginStatus", "true")
            })
    }


    return (
        <div>
            <LoginForm onClickFunction={onLogin}/>
        </div>
    );
}
export default LoginTemplate;