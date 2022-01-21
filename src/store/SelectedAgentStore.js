import { atom } from "recoil";

export const SelectedAgentInfo = atom({    //선택된 시설의 call list
    key: 'SelectedAgentInfo',
    default: [],
})

export const ClickedAgentInfo = atom({    //선택된 시설의 call list
    key: 'ClickedAgentInfo',
    default: {},
})