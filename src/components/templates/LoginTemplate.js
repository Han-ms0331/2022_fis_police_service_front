import React from 'react';
import LoginForm from "../organisms/LoginForm";
import {useRecoilState} from "recoil";
import {isLoginedState} from "../../store/LoginStore";
/*
    날짜: 2022/01/11 10:57 오전
    작성자: 한명수
    작성내용: loginTemple, 로그인 페이지를 구성함, 로그인 api 호출
*/
function LoginTemplate(props) {
    const [isLogined, setIsLogined] = useRecoilState(isLoginedState);   //로그인 상태를 정의하기 위한 isLogined global state
    // const [loginInfo, setLoginInfo] = useState()
    return (
        <div>
            <div>
                logo
            </div>
            <LoginForm />
        </div>
    );
}

export default LoginTemplate;