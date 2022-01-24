import {atom, selector} from "recoil";

export const dateSelectedRows = atom({
    key: 'dateSelectedRows',
    default: []
});

export const rowCount = selector({
    key:'rowCount',
    get:({get})=>{
        let list = get(dateSelectedRows);
        if(list.length===undefined) return 0;
        return list.length;
    }
})