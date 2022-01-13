import {atom, selector} from "recoil";
/*
    날짜: 2022/01/11 10:59 오전
    작성자: 한명수
    작성내용: 로그인 상태를 관리하기 위한 isLogined atom
*/
export const isLoginedState = atom({
    key: 'isLoginedState',
    default: false,
});

export const isLoginedChangedState = selector({
    key: 'isLoginedChangedState',
    get: ({get}) =>{
        const isLogined = get(isLoginedState);
        console.log(isLogined);
        if(isLogined){
            return true
        }
        return false;
    }
})