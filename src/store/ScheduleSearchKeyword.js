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
    default: {
        schedule_id: "",              // 스케쥴 id
        a_code: "",                // 현장요원 코드
        a_name: "",                // 현장요원 이름
        center_id: "",             // 센터 id
        c_name: "",                // 센터 이름
        c_address: "",       // 센터 주소
        c_ph: "",                     // 센터 전화번호
        estimate_num: 0,               // 예상 인원
        visit_date: "",        // 방분 날짜
        visit_time: "",               // 방문 시간
        center_etc: "",                    // 센터 특이사항
        agent_etc: "",                     // 현장요원 특이사항
        modified_info: "",                  // 변경사항
        total_etc: "",                      // 스케쥴 특이사항
        call_check: "",                     // 최근 통화 상태
        call_check_info: "",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
    },
});
