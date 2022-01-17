import {rest} from "msw";

export const handlers = [
    rest.get('/test', async(req, res, ctx)=>{
        return res(
            ctx.json({
                result: "success",
                name: "Han",
                authority:"admin"
            })
        )
    })
];