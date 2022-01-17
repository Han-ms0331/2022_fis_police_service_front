import {rest} from "msw";
/*
    날짜: 2022/01/17 1:52 오후
    작성자: 한명수
    작성내용: main page에서 필요한 mainhandler작성
*/
export const mainHandlers = [
    rest.get('/center/{center_id}/range?range={value}', async (req, res, ctx) => {
        return res(
            ctx.json({
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
                },
            )
        )
    }),

];