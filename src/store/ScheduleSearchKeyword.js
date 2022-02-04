/*
    작성시간: 2022/01/13 1:28 PM
    이름: 이창윤
    작성내용: 검색 키워드 정보들을 담아 놓는 Recoil Atom
    ScheduleTableSearch에서 atom value를 변경하고,
    ScheduleTable에서 atom value를 불러 오는 데 사용될 파일..
*/

import {atom} from "recoil";

export const searchKeyword = atom({
    key: 'searchKeyword',
    default: {},
});
