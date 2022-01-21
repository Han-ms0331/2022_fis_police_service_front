import {rest} from "msw";

/*
    날짜: 2022/01/17 1:52 오후
    작성자: 한명수
    작성내용: 테스트용 핸들러 작성
*/

export const manageHandlers = [
    rest.post('/manage/center', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "success",
            })
        )
    }),
    rest.patch('/manage/center', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "success",
            })
        )
    }),

    rest.get('/user', async (req, res, ctx) => {
        return res(
            ctx.json({
                    datas: [
                        {
                            u_id: "1",
                            u_nickname: "한명수",
                            u_name: "fis1",
                            u_pwd: "1234",
                            u_ph: "010-1234-1234",
                            u_sDate: "2021/11/11",
                            u_auth: "관리자",
                            average_call: 50,
                            today_call_num: 50
                        },
                        {
                            u_id: "2",
                            u_nickname: "정도식",
                            u_name: "fis2",
                            u_pwd: "1234",
                            u_ph: "010-1234-1234",
                            u_sDate: "2021/11/11",
                            u_auth: "일반직원",
                            average_call: 30,
                            today_call_num: 70
                        },
                    ],
                    result: "success"

                }
            )
        )
    }),
    rest.post('/user', async (req, res, ctx) => {
        return res(
            ctx.json({
                    result: "success",
                }
            )
        )
    }),
    rest.patch('/user', async (req, res, ctx) => {
        return res(
            ctx.json({
                    result: "success",
                }
            )
        )
    }),
    rest.get('/agent', async (req, res, ctx) => {
        return res(
            ctx.json({
                    a_data: [
                        {
                            a_id: "1",
                            a_name: "한명수",
                            a_code: "안양1",
                            a_ph: "010-1234-1234",
                            a_hasCar:"자차",
                            a_address: "경기도 부천시 범안로 130-27 힐스테이트 ",
                            a_equipment: "001",
                            a_receiveDate: "2021/11/13",
                            a_status: "재직",
                        },
                        {
                            a_id: "4",
                            a_name: "신은수",
                            a_code: "안양2",
                            a_ph: "010-1234-1234",
                            a_hasCar:"자차",
                            a_address: "경기도 부천시 범안로 130-27 힐스테이트",
                            a_equipment: "002",
                            a_receiveDate: "2021/11/13",
                            a_status: "재직",
                        },
                        {
                            a_id: "3",
                            a_name: "이창윤",
                            a_code: "안양3",
                            a_ph: "010-1234-1234",
                            a_hasCar:"도보",
                            a_address: "경기도 부천시 범안로 130-27 힐스테이트",
                            a_equipment: "004",
                            a_receiveDate: "2021/11/15",
                            a_status: "퇴사",
                        },
                    ],
                    result: "success"
                }
            )
        )
    }),
    rest.post('/agent', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "success",
            },)
        )
    }),
    rest.patch('/agent', async (req, res, ctx) => {
        return res(
            ctx.json({
                result: "success",
            },)
        )
    }),
];