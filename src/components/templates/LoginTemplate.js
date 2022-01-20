import React, {useEffect, useState} from 'react';
import LoginForm from "../organisms/LoginForm";
import axios from "axios";
import {useRecoilState} from "recoil";
import {isLoginedState} from "../../store/LoginStore";

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

    /*
        날짜: 2022/01/19 3:43 오후
        작성자: 한명수
        작성내용: login 버튼을 눌렀을 때 작동하는 함수
    */

    const onLogin = async () => {   //서버와 로그인 통신을 하는 부분
        await axios.post("http://localhost:8080/login", loginInfo, {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                if (res.data.sc === "success") {   //로그인 결과가 실패가 아니라면
                    setIsLogined(true);     //setIsLogined를 true로 바꾸고
                    localStorage.setItem("login-state", "true");    //localStorage에 login-state를 true로 저장함
                } else if (res.data.sc === "idFail") {
                    console.log(isLogined);
                    alert("존재하지않는 아이디 입니다. 다시 시도해 주세요")
                } else if (res.data.sc === "pwdFail") {
                    alert("비밀번호를 확인해 주세요.")
                }
            })
    }


    return (
        <div>
            <LoginForm onClickFunction={onLogin} onChangeFunction={handleInputFormChange}/>
        </div>
    );
}

export default LoginTemplate;