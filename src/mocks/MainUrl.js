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
                        c_name: "동그라미 유치원",
                        c_address: "서울시 노원구 동일로 215길 48",
                        c_ph: "010-2105-7346",
                        participation: "참여",
                    },
                    {
                        c_name: "딩동댕 유치원",
                        c_address: "서울시 광진구 동일로 215길 48",
                        c_ph: "010-2105-7346",
                        participation: "참여",
                    }
                ],
                result: "success"
            })
        )
    }),
    rest.get('/main/center/select?center_id={value}', async (req, res, ctx) => {
        return res(
            ctx.json({
                lists: [
                    //연락기록, 방문일정, 위도경도 데이터 어떻게 줄지 몰라서 못함 ㅠㅠ -신은수
                ],
                result: "success"
            })
        )
    })

];