import {rest} from "msw";

/*
    날짜: 2022/01/17 1:52 오후
    작성자: 한명수
    작성내용: 테스트용 핸들러 작성
*/

export const scheduleHandlers = [
    rest.get('/scheduletest', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "success",
                name: "Han",
                authority:"admin"
            })
        )
    }),
    rest.get('/messenger', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "success",
                name: "Han",
                authority:"admin"
            })
        )
    }),
    rest.post('/messenger', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "success",
                name: "Han",
                authority:"admin"
            })
        )
    }),
    rest.delete('/messenger', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "success",
                name: "Han",
                authority:"admin"
            })
        )
    })
];