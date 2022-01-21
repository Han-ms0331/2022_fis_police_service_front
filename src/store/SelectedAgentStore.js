import { atom } from "recoil";

export const SelectedAgentInfo = atom({    //선택된 시설의 call list
    key: 'SelectedAgentInfo',
    default: [],
})