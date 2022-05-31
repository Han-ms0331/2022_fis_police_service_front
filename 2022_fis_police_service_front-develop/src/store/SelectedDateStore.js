import {atom} from "recoil";

/*
    날짜: 2022/01/24 1:19 오후
    작성자: 한명수
    작성내용: 선택된 날짜 저장하는 state
*/
export const SelectedDateState = atom({      //선택된 시설의 아이디
    key: 'SelectedDateState',
    default: new Date()
})