import {atom} from "recoil";
/*
    날짜: 2022/01/11 10:59 오전
    작성자: 한명수
    작성내용: 로그인 상태를 관리하기 위한 isLogined atom
*/
export const isLoginedState = atom({
    key: 'isLoginedState',
    default: true,
});

export const userAuthority = atom({
    key: 'userAuthority',
    default: "",
});

