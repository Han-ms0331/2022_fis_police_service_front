import React, {useState} from 'react';
import LoginForm from "../organisms/LoginForm";
import axios from "axios";
import {useRecoilState} from "recoil";
import {isLoginedState, userAuthority} from "../../store/LoginStore";
import NetworkConfig from "../../configures/NetworkConfig";
import Swal from 'sweetalert2'
import {Style} from "../../Style";

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
    const [authority, setAuthority] = useRecoilState(userAuthority);
    const [loading, setLoading] = useState(null);

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

    const onLogin = async (e) => {   //서버와 로그인 통신을 하는 부분
        e.preventDefault();
        setLoading(true);
        await axios.post(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/login`, loginInfo, {withCredentials: true})       //http가 보안 취약하다고 하는거 무시, withCredential:true는 모든 api에 추가 get은 url바로뒤에 ,찍고 post patch는 body뒤에
            .then((res) => {
                setAuthority(res.data.u_auth); // user 권한을 설정x
                if (res.data.sc === "success") {   //로그인 결과가 실패가 아니라면
                    setIsLogined(true);     //setIsLogined를 true로 바꾸고
                    localStorage.setItem("login-state", "true");    //localStorage에 login-state를 true로 저장함
                } else if (res.data.sc === "idFail") {
                    // alert("존재하지않는 아이디 입니다. 다시 시도해 주세요")
                    Swal.fire({
                        icon: 'error',
                        title: '존재하지않는 아이디 입니다.',
                        text: '다시 시도해 주세요.',
                        confirmButtonColor: Style.color2,
                        confirmButtonText: '확인',
                    })

                } else if (res.data.sc === "pwdFail") {
                    // alert("비밀번호를 확인해 주세요.")
                    Swal.fire({
                        icon: 'error',
                        title: '비밀번호를 확인해주세요',
                        confirmButtonColor: Style.color2,
                        confirmButtonText: '확인',
                    })
                }
                setLoading(false);
            })
    }


    return (
        <div>
            <LoginForm onClickFunction={onLogin} onChangeFunction={handleInputFormChange} loading={loading}/>
        </div>
    );
}

export default LoginTemplate;