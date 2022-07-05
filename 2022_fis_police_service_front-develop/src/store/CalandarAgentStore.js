import {atom} from "recoil";

export const user_id = atom({
    key: 'user_id',
    default: true,
});

export const u_nickname = atom({
    key: 'u_nickname',
    default: ""
})

export const u_name = atom({
    key: 'u_name',
    default: ""
})

export const u_auth = atom({
    key: 'u_auth',
    default: ""
})

export const today_call_num = atom({
    key: 'today_call_num',
    default: ""
})

export const participation_num = atom({
    key:'SelectedCenterList',
    default: ""
})

export const reject_num = atom({
    key:'TotalCallCount',
    default: ""
})

export const hold_num = atom({
    key:'hold_num',
    default: ""
})

export const none_num = atom({
    key:'none_num',
    default: ""
})






