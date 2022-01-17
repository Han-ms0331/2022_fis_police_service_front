import {rest} from "msw";

/*
    날짜: 2022/01/17 1:52 오후
    작성자: 한명수
    작성내용: 테스트용 핸들러 작성
*/

export const manageHandlers = [
    rest.get('/user', async (req, res, ctx) => {
        return res(
            ctx.json({
                    u_id: "1",
                    u_nickname: "ss",
                    u_name: "bob",
                    u_pwd: "1234",
                    u_ph: "010-1234-1234",
                    u_sDate: "11/11",
                    u_auth: "m"
                },
                {
                    u_id: "2",
                    u_nickname: "s3",
                    u_name: "cathy",
                    u_pwd: "1234",
                    u_ph: "010-1234-1234",
                    u_sDate: "11/11",
                    u_auth: "m"
                },
            )
        )
    }),
    rest.post('/user', async (req, res, ctx) => {
        return res(
            ctx.json({
                u_id: "3",
                u_nickname: "s4",
                u_name: "daniel",
                u_pwd: "1234",
                u_ph: "010-1234-1234",
                u_sDate: "11/11",
                u_auth: "m"
            },)
        )
    }),
    rest.patch('/user', async (req, res, ctx) => {
        return res(
            ctx.json({
                u_id: "4",
                u_nickname: "s5",
                u_name: "ann",
                u_pwd: "1234",
                u_ph: "010-1234-1234",
                u_sDate: "11/11",
                u_auth: "m"
            },)
        )
    }),
    rest.get('/agent', async (req, res, ctx) => {
        return res(
            ctx.json({
                    a_id: "3",
                    a_name: "daniel",
                    a_code: "123",
                    a_ph: "010-1234-1234",
                    a_address: "범안로 130-27",
                    a_equipment: null,
                    a_receiveDate: null,
                    a_status: null,
                },
                {
                    a_id: "4",
                    a_name: "kathy",
                    a_code: "123",
                    a_ph: "010-1234-1234",
                    a_address: "범안로 130-27",
                    a_equipment: null,
                    a_receiveDate: null,
                    a_status: null,
                },
                {
                    a_id: "3",
                    a_name: "moon",
                    a_code: "123",
                    a_ph: "010-1234-1234",
                    a_address: "범안로 130-27",
                    a_equipment: null,
                    a_receiveDate: null,
                    a_status: null,
                },
            )
        )
    }),
    rest.post('/agent', async (req, res, ctx) => {
        return res(
            ctx.json({
                a_id: "3",
                a_name: "nerdy",
                a_code: "123",
                a_ph: "010-1234-1234",
                a_address: "범안로 130-27",
                a_equipment: null,
                a_receiveDate: null,
                a_status: null,
            },)
        )
    }),
    rest.patch('/agent', async (req, res, ctx) => {
        return res(
            ctx.json({
                a_id: "3",
                a_name: "lucas",
                a_code: "123",
                a_ph: "010-1234-1234",
                a_address: "범안로 130-27",
                a_equipment: null,
                a_receiveDate: null,
                a_status: null,
            },)
        )
    }),
];