import {atom} from "recoil";


/*
    날짜: 2022/01/18 5:48 오후
    작성자: 한명수
    작성내용: 선택된 시설의 정보들을 전역으로 관리하기 위한 store
*/
export const SelectedCenterId = atom({      //선택된 시설의 아이디
    key: 'SelectedCenterId',
    default: ""
})

export const SelectedCenterInfo = atom({    //선택된 시설의 call list
    key: 'SelectedCenterInfo',
    default: []
})

export const SelectedCenterCallList = atom({    //선택된 시설의 call list
    key: 'SelectedCenterCallList',
    default: []
})

export const SelectedCenterScheduleList = atom({    //선택된 시설의 schedule list
    key: 'SelectedCenterScheduleList',
    default: []
})

export const SelectedCenterList=atom({
    key:'SelectedCenterList',
    default: []
})

export const CenterList=atom({
    key:'CenterList',
    default: []
})

export const CenterLocation=atom({
    key:'CenterLocation',
    default: []
})



