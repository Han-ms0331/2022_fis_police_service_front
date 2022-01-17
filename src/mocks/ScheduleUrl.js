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
                authority:"user"
            })
        )
    }),
    rest.get('/messenger', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "success",
                message: "무언가 잘 못했어요. 고쳐주세요.",
                user:"원보라",
                authority:"user"
            })
        )
    }),
    rest.post('/messenger', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "success",
                message: "무언가 잘 못했어요. 고쳐주세요.",
                user:"원보라",
                authority:"user"
            })
        )
    }),
    rest.delete('/messenger', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "delete success",
                authority:"admin"
            })
        )
    })
];