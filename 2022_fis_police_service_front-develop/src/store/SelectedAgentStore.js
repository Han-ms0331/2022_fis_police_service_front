import { atom } from "recoil";

export const SelectedAgentInfo = atom({
    key: 'SelectedAgentInfo',
    default: [],
})

export const ClickedAgentInfo = atom({
    key: 'ClickedAgentInfo',
    default: {},
})