import {rest} from "msw";

/*
    날짜: 2022/01/17 1:52 오후
    작성자: 한명수
    작성내용: 테스트용 핸들러 작성
*/

export const manageHandlers = [
    rest.get('/main/center/search?c_name={value}&c_address={value}&c_ph={value}', async (req, res, ctx) => {
        return res(
            ctx.json({
                lists: [
                    {
                        center_id: "1",
                        center_name: "동그라미 유치원",
                        participation: "참여",
                        c_ph: "031-123-456",
                        c_address: "경기도 안양시 동안구 동안로 111"
                    },
                    {
                        center_id: "2",
                        center_name: "딩동댕 유치원",
                        participation: "보류",
                        c_ph: "031-123-456",
                        c_address: "경기도 안양시 동안구 동안로 111"
                    }
                ],
                result: "success"
                }

            )
        )
    }),
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

];