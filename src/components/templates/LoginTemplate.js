import React, {useEffect} from 'react';
import LoginForm from "../organisms/LoginForm";

/*
    날짜: 2022/01/11 10:57 오전
    작성자: 한명수
    작성내용: loginTemple, 로그인 페이지를 구성함, 로그인 api 호출
*/
function LoginTemplate(props) {
    const loginCall  = () =>{   //서버와 로그인 통신을 하는 부분
        return true;
    }

    const onclick = (e) => {
        if(loginCall)
        localStorage.setItem("loginStatus","true")
    }

    return (
        <div>
            <div>
                logo
            </div>
            <LoginForm onClickFunction={onclick}/>
        </div>
    );
}

export default LoginTemplate;