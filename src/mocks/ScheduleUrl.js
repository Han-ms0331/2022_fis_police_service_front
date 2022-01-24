import {rest} from "msw";

/*
    날짜: 2022/01/17 1:52 오후
    작성자: 한명수
    작성내용: 테스트용 핸들러 작성
*/
const value = "22-01-14";
const schedule_id = 17;

export const scheduleHandlers = [
    rest.get('/scheduletest', async (req, res, ctx) => {
        console.log(res);
        return res(
            ctx.json({
                result: "success",
                name: "Han",
                authority: "user"
            })
        )
    }),
    rest.get('/messenger', async (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    result: "success",
                    message: "무언가 잘 못했어요. 고쳐주세요.",
                    user: "원보라",
                    authority: "user",
                    time: "10:34 오전"
                },
                {
                    result: "success",
                    message: "무언가 잘 못했어요. 고쳐주세요2.",
                    user: "현승구",
                    authority: "user",
                    time: "10:35 오전"
                },
                {
                    result: "success",
                    message: "무언가 잘 못했어요. 고쳐주세요3.",
                    user: "지상은",
                    authority: "user",
                    time: "10:36 오전"
                },

            ])
        )
    }),
    rest.post('/messenger', async (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    result: "success",
                    message: "무언가 잘 못했어요. 고쳐주세요.",
                    user: "원보라",
                    authority: "user",
                    time: "10:34 오전"
                },
                {
                    result: "success",
                    message: "무언가 잘 못했어요. 고쳐주세요2.",
                    user: "현승구",
                    authority: "user",
                    time: "10:35 오전"
                },
                {
                    result: "success",
                    message: "무언가 잘 못했어요. 고쳐주세요3.",
                    user: "지상은",
                    authority: "user",
                    time: "10:36 오전"
                },

            ])
        )
    }),
    rest.delete('/messenger', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "delete success",
                authority: "admin"
            })
        )
    }),
    rest.get(`/schedule?date=${value}`, async (req, res, ctx) => {
        console.log(req.params);
        return res(
            ctx.json([
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
                    modified_info: "개인적인 사정으로 불참",                  // 변경사항
                    total_etc: "신청서 완료",                      // 스케쥴 특이사항
                    call_check: "통화완료",                     // 최근 통화 상태
                    call_check_info: "null",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
                },
                {
                    schedule_id: 17,
                    a_code: "222",
                    a_name: "이철수",
                    center_id: "124",
                    c_name: "세모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 7",
                    c_ph: "031-789-123",
                    estimate_num: 50,
                    visit_date: "2022-01-14",
                    visit_time: "16:40:31",
                    center_etc: "ㅁㅁㅁ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "부재중",
                    call_check_info: "3",
                },
                {
                    schedule_id: 18,
                    a_code: "333",
                    a_name: "박철수",
                    center_id: "125",
                    c_name: "네모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 8",
                    c_ph: "031-456-123",
                    estimate_num: 80,
                    visit_date: "2022-01-14",
                    visit_time: "13:40:31",
                    center_etc: "ㄹㄹㄹ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "통화오류",
                    call_check_info: "없는 번호",
                },
                {
                    schedule_id: 19,              // 스케쥴 id
                    a_code: "444",                // 현장요원 코드
                    a_name: "안철수",                // 현장요원 이름
                    center_id: "123",             // 센터 id
                    c_name: "동그라미 유치원",                // 센터 이름
                    c_address: "경기도 성남시 분당구 불정로 6",       // 센터 주소
                    c_ph: "031-123-456",                     // 센터 전화번호
                    estimate_num: 123,               // 예상 인원
                    visit_date: "2022-01-14",        // 방분 날짜
                    visit_time: "14:40:31",               // 방문 시간
                    center_etc: "점심시간에 걸리지 않게 약속 잡아달라하심",                    // 센터 특이사항
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",                     // 현장요원 특이사항
                    modified_info: "개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참" +
                        "개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참" +
                        "개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참" +
                        "개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참개인적인 사정으로 불참",                  // 변경사항
                    total_etc: "신청서 완료",                      // 스케쥴 특이사항
                    call_check: "통화완료",                     // 최근 통화 상태
                    call_check_info: "null",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
                },
                {
                    schedule_id: 20,
                    a_code: "555",
                    a_name: "양철수",
                    center_id: "124",
                    c_name: "세모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 7",
                    c_ph: "031-789-123",
                    estimate_num: 50,
                    visit_date: "2022-01-14",
                    visit_time: "16:40:31",
                    center_etc: "ㅁㅁㅁ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "부재중",
                    call_check_info: "3",
                },
                {
                    schedule_id: 21,
                    a_code: "666",
                    a_name: "최철수",
                    center_id: "125",
                    c_name: "네모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 8",
                    c_ph: "031-456-123",
                    estimate_num: 80,
                    visit_date: "2022-01-14",
                    visit_time: "13:40:31",
                    center_etc: "ㄹㄹㄹ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "통화오류",
                    call_check_info: "없는 번호",
                },
                {
                    schedule_id: 22,              // 스케쥴 id
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
                    modified_info: "개인적인 사정으로 불참",                  // 변경사항
                    total_etc: "신청서 완료",                      // 스케쥴 특이사항
                    call_check: "통화완료",                     // 최근 통화 상태
                    call_check_info: "null",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
                },
                {
                    schedule_id: 23,
                    a_code: "222",
                    a_name: "이철수",
                    center_id: "124",
                    c_name: "세모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 7",
                    c_ph: "031-789-123",
                    estimate_num: 50,
                    visit_date: "2022-01-14",
                    visit_time: "16:40:31",
                    center_etc: "ㅁㅁㅁ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "부재중",
                    call_check_info: "3",
                },
                {
                    schedule_id: 24,              // 스케쥴 id
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
                    modified_info: "개인적인 사정으로 불참",                  // 변경사항
                    total_etc: "신청서 완료",                      // 스케쥴 특이사항
                    call_check: "통화완료",                     // 최근 통화 상태
                    call_check_info: "null",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
                },
                {
                    schedule_id: 25,
                    a_code: "222",
                    a_name: "이철수",
                    center_id: "124",
                    c_name: "세모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 7",
                    c_ph: "031-789-123",
                    estimate_num: 50,
                    visit_date: "2022-01-14",
                    visit_time: "16:40:31",
                    center_etc: "ㅁㅁㅁ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "부재중",
                    call_check_info: "3",
                },
                {
                    schedule_id: 26,              // 스케쥴 id
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
                    modified_info: "개인적인 사정으로 불참",                  // 변경사항
                    total_etc: "신청서 완료",                      // 스케쥴 특이사항
                    call_check: "통화완료",                     // 최근 통화 상태
                    call_check_info: "null",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
                },
                {
                    schedule_id: 27,
                    a_code: "222",
                    a_name: "이철수",
                    center_id: "124",
                    c_name: "세모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 7",
                    c_ph: "031-789-123",
                    estimate_num: 50,
                    visit_date: "2022-01-14",
                    visit_time: "16:40:31",
                    center_etc: "ㅁㅁㅁ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "부재중",
                    call_check_info: "3",
                },
                {
                    schedule_id: 28,              // 스케쥴 id
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
                    modified_info: "개인적인 사정으로 불참",                  // 변경사항
                    total_etc: "신청서 완료",                      // 스케쥴 특이사항
                    call_check: "통화완료",                     // 최근 통화 상태
                    call_check_info: "null",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
                },
                {
                    schedule_id: 29,
                    a_code: "222",
                    a_name: "이철수",
                    center_id: "124",
                    c_name: "세모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 7",
                    c_ph: "031-789-123",
                    estimate_num: 50,
                    visit_date: "2022-01-14",
                    visit_time: "16:40:31",
                    center_etc: "ㅁㅁㅁ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "부재중",
                    call_check_info: "3",
                },
                {
                    schedule_id: 30,              // 스케쥴 id
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
                    modified_info: "개인적인 사정으로 불참",                  // 변경사항
                    total_etc: "신청서 완료",                      // 스케쥴 특이사항
                    call_check: "통화완료",                     // 최근 통화 상태
                    call_check_info: "null",                 // 최근 통화 상태 정보(부재중 몇건 or 통화오류 이유)
                },
                {
                    schedule_id: 31,
                    a_code: "222",
                    a_name: "이철수",
                    center_id: "124",
                    c_name: "세모 유치원",
                    c_address: "경기도 성남시 분당구 불정로 7",
                    c_ph: "031-789-123",
                    estimate_num: 50,
                    visit_date: "2022-01-14",
                    visit_time: "16:40:31",
                    center_etc: "ㅁㅁㅁ점심시간에 걸리지 않게 약속 잡아달라하심",
                    agent_etc: "현장 요원 방문시 발열체크 및 백신패스 필수",
                    modified_info: "null",
                    total_etc: "null",
                    call_check: "부재중",
                    call_check_info: "3",
                },
            ])
        )
    }),
    rest.patch('/schedule', async (req, res, ctx) => {
        const {visit_date, visit_time, estimate_num, modified_info, call_check, total_etc} = req.body;

        return res(
            ctx.json({
                visit_date: visit_date,
                visit_time: visit_time,
                estimate_num: estimate_num,
                modified_info: modified_info,
                call_check: call_check,
                total_etc: total_etc,
            })
        )
    }),
    rest.post('/schedule/announce', async (req, res, ctx) => {
        const {checkedList} = req.body;
        return res(
            ctx.json({
                checkedList,
            })
        )
    }),
    rest.get(`/schedule?schedule_id=${schedule_id}`, async (req, res, ctx) => {
        return res(
            ctx.json({
                schedule_id: schedule_id,
            })
        )
    }),
];