import {rest} from "msw";
/*
    날짜: 2022/01/17 1:52 오후
    작성자: 한명수
    작성내용: main page에서 필요한 mainhandler작성
*/
export const mainHandlers = [
    rest.get('/main', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "success",
                name: "Han",
                authority: "admin"
            })
        )
    }),
    rest.get('/main/center/search?c_name={value}&c_address={value} &c_ph={value}', async (req, res, ctx) => {
        return res(
            ctx.json({
                lists: [
                    {
                        center_id: "1",
                        c_name: "동그라미 유치원",
                        participation: "참여",
                        c_ph: "010-2105-7346",
                        c_address: "서울시 노원구 동일로 215길 48",
                    },
                    {
                        center_id: "2",
                        c_name: "딩동댕 유치원",
                        participation: "참여",
                        c_ph: "010-2105-7346",
                        c_address: "서울시 광진구 동일로 215길 48",
                    }
                ],
                result: "success"
            })
        )
    }),
    rest.get('/main/center/select?center_id={value}', async (req, res, ctx) => {
        return res(
            ctx.json({
                id:"10",
                c_sido: null,
                c_sigungu: null,
                c_name: "111",
                c_type: null,
                c_status: null,
                c_address: "분당구 불정로 6",
                c_zipcode: null,
                c_faxNum: null,
                c_people: null,
                c_hpAddress: null,
                c_latitude: 123.0,
                c_longitude: null,
                participation: null,
                visited: null,
                callList: [
                    {
                        u_name: "한명수",
                        in_out: "인",
                        dateTime: "2022-01-13",
                        participation: "참여",
                        c_manager: "홍길동",
                        m_ph: "010-1234-1234",
                        m_email: "fisolution@hotmail.com",
                        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
                        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
                    },
                    {
                        u_name: "한명수",
                        in_out: "인",
                        dateTime: "2022-01-13",
                        participation: "참여",
                        c_manager: "홍길동",
                        m_ph: "010-1234-1234",
                        m_email: "fisolution@google.com",
                        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심",
                        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
                    },
                    {
                        u_name: "한명수",
                        in_out: "인",
                        dateTime: "2022-01-13",
                        participation: "참여",
                        c_manager: "홍길동",
                        m_ph: "010-1234-1234",
                        m_email: "fisolution@coolmail.com",
                        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심",
                        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
                    }
                ],
                scheduleList: [
                    {
                        id: 16,
                        user: {
                            user_id: 13,
                            user_name : 111
                        },
                        user_id: 13,
                        agent: {
                            agent_id: 7,
                            agent_name: "asd"
                        },
                        receipt_date: "2022-01-18T13:34:46.626173",
                        visit_date: "2021-01-18",
                        estimate_num: 123,
                        center_etc: "111",
                        agent_etc: "111",
                        total_etc: null
                    }
                ]
            })
        )
    }),
    rest.get('/center/{center_id}/range?range={value}', async (req, res, ctx) => {
        return res(
            ctx.json({
                    cdata: [
                        {
                            c_id: "1",
                            c_address: "분당구 불정로 6",
                            c_ph: "010-1234-5678",
                            participation: "null",
                            visited: "null",
                            distance: "0.0",
                            c_latitude: "33.450705",
                            c_longitude: "126.570677",
                        },
                        {
                            c_id: "2",
                            c_address: "f",
                            c_ph: "",
                            participation: null,
                            visited: null,
                            distance: "",
                            c_latitude: "33.450492180670004",
                            c_longitude: "126.5716140938378",
                        },
                        {
                            c_id: "3",
                            c_address: "g",
                            c_ph: "",
                            participation: null,
                            visited: null,
                            distance: "",
                            c_latitude: "33.44997113581058",
                            c_longitude: "126.57215980066594",
                        },
                        {
                            c_id: "4",
                            c_address: "h",
                            c_ph: "",
                            participation: null,
                            visited: null,
                            distance: "",
                            c_latitude: "33.452069734399245",
                            c_longitude: "126.57284861031886",
                        },
                        {
                            c_id: "5",
                            c_address: "j",
                            c_ph: "",
                            participation: null,
                            visited: null,
                            distance: "",
                            c_latitude: "33.46273767046406",
                            c_longitude: "126.55046492951271",
                        },
                        {
                            c_id: "6",
                            c_address: "k",
                            c_ph: "",
                            participation: null,
                            visited: null,
                            distance: "",
                            c_latitude: "33.470245538298876",
                            c_longitude: "126.5727164298056",
                        },
                        {
                            c_id: "7",
                            c_address: "t",
                            c_ph: "",
                            participation: null,
                            visited: null,
                            distance: "",
                            c_latitude: "33.46494524738042",
                            c_longitude: "126.60570252290822",
                        },
                        {
                            c_id: "8",
                            c_address: "h",
                            c_ph: "",
                            participation: null,
                            visited: null,
                            distance: "",
                            c_latitude: "33.42466652636361",
                            c_longitude: "126.55392992730667",
                        },],
                    result: "success"
                }
            )
        )
    }),
    rest.post('/call', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "success"
            })
        )
    }),
    rest.get('/mail/send', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "success"
            })
        )
    }),
    rest.post('/schedule', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "success"
            })
        )
    }),

];