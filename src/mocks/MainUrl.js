import {rest} from "msw";
/*
    날짜: 2022/01/17 1:52 오후
    작성자: 한명수
    작성내용: main page에서 필요한 mainhandler작성
*/
export const mainHandlers = [
    rest.get('/main', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "success",
                name: "Han",
                authority:"admin"
            })
        )
    })
];