/*
    작성시간: 2022/02/04 4:19 PM
    이름: 이창윤
    작성내용: dateSelectedRows라는 캘린더 날짜 선택 시 데이터를 불러오는 atom 작성
            rowCount는 dateSelectedRows의 length를 반환
            viewResultRows는 스케줄 테이블에서 사용자의 검색 여부에 따라 filter된 결과를 반환
*/

import {atom, selector} from "recoil";
import {searchKeyword} from "./ScheduleSearchKeyword";

export const dateSelectedRows = atom({
    key: 'dateSelectedRows',
    default: []
});

export const rowCount = selector({
    key:'rowCount',
    get:({get})=>{
        let list = get(dateSelectedRows);
        if(list===undefined) return 0;
        return list.length;
    }
})

export const viewResultRows = selector({
    key: 'viewResultRows',
    get:({get}) => {
        let rows = get(dateSelectedRows);
        let keywordProps = get(searchKeyword)
        const isSearch = () => { // 사용자가 검색창에 키워드를 입력한 상태인지 검사하는 함수
            for (let value in keywordProps) {
                if(keywordProps[value] !== ""){
                    return true;
                }
            }
            return false;
        }
        const handleFilter = (el) => { // 검색 키워드 필터링해주는 함수
            return (
                (el.a_name !== null ? el.a_name.includes(keywordProps.a_name) : keywordProps.a_name === "") &&
                (el.c_name !== null ?
                    (el.c_name.includes(keywordProps.c_name) ||
                        el.c_address.includes(keywordProps.c_name) ||
                        el.c_ph.includes(keywordProps.c_name)) ||
                    el.visit_time.includes(keywordProps.c_name) ||
                    (String(el.estimate_num) + '명').includes(keywordProps.c_name)
                    : keywordProps.c_name === "") &&
                // c_name, c_address, c_ph, visit_time, estimate_num 통합 검색
                // (el.accept !== null ? el.accept.includes(keywordProps.accept) : keywordProps.accept === "") &&
                (el.total_etc !== null ? el.total_etc.includes(keywordProps.total_etc) : keywordProps.total_etc === "") &&
                (el.modified_info !== null ? el.modified_info.includes(keywordProps.modified_info) : keywordProps.modified_info === "") &&
                (el.call_check !== null ? el.call_check.includes(keywordProps.call_check) : keywordProps.call_check === "")
            );
        }
        if (isSearch) {
            return rows.filter(handleFilter)
        } else {
            return rows;
        }
    }
});