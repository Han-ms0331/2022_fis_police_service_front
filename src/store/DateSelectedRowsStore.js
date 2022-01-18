
import {atom} from "recoil";

export const dateSelectedRows = atom({
    key: 'dateSelectedRows',
    default: [
        {
            schedule_id: 16,              // 스케쥴 id
            a_code: "111",                // 현장요원 코드
            a_name: "김철수",                // 현장요원 이름
            center_id: "123",             // 센터 id
            c_name: "동그라미 유치원",                // 센터 이름
            c_address: "경기도 성남시 분당구 불정로 6",       // 센터 주소
            c_ph: "031-123-456",                     // 센터 전화번호
            estimate_num: 123,               // 예상 인원
            visit_date: "2022-01-14",        // 방분 날짜
            visit_time: "14:40:31",               // 방문 시간
            center_etc: "점심시간에 걸리지 않게 약속 잡아달라하심",                    // 센터 특이사항
            agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",                     // 현장요원 특이사항
            modified_info: "시간 조정\n >10:00-11:00",                  // 변경사항
            total_etc: "신청서 완료",                      // 스케쥴 특이사항
            call_check: "통화완료",                     // 최근 통화 상태
            call_check_info: "dd",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
        },
        {
            schedule_id: 17,              // 스케쥴 id
            a_code: "111",                // 현장요원 코드
            a_name: "김철수",                // 현장요원 이름
            center_id: "123",             // 센터 id
            c_name: "동그라미 유치원",                // 센터 이름
            c_address: "경기도 성남시 분당구 불정로 6",       // 센터 주소
            c_ph: "031-123-456",                     // 센터 전화번호
            estimate_num: 123,               // 예상 인원
            visit_date: "2022-01-14",        // 방분 날짜
            visit_time: "14:40:31",               // 방문 시간
            center_etc: "점심시간에 걸리지 않게 약속 잡아달라하심",                    // 센터 특이사항
            agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",                     // 현장요원 특이사항
            modified_info: "시간 조정\n >10:00-11:00",                  // 변경사항
            total_etc: "신청서 완료",                      // 스케쥴 특이사항
            call_check: "통화완료",                     // 최근 통화 상태
            call_check_info: "dd",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
        },
    ],
});
