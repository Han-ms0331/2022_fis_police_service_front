/*
    작성시간: 2022/01/13 1:46 PM
    이름: 이창윤
    작성내용: ScheduleTable에서 검색 기능을 하는 컴포넌트, Recoil Atom 변경
    검색 버튼 없이 키워드 입력 시 바로 결과가 나옴. 검색 버튼은 삭제할 예정
*/

import React, {useState} from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import {useRecoilState, useRecoilValue} from "recoil";
import {searchKeyword} from "../../store/ScheduleSearchKeyword";


function ScheduleTableSearch() {

    const [keyword, setKeyword] = useRecoilState(searchKeyword) // atom의 default값을 default 설정
    const handleChange = (event) => { // 검색창에 무언가 입력하면 키워드를 담아줌.
        const target = event.target.value;
        console.log(event.target);
        setKeyword((prev) => ({...prev, [event.target.id]: target}));
    }

    const tmp = useRecoilValue(searchKeyword);
    return (
            <TableHead>
                <TableRow>
                        <TableCell align="center">검색:</TableCell>
                        <TableCell><input id="No" type="text" placeholder="No." onChange={handleChange}/></TableCell>
                        <TableCell align="right"><input id="agent" type="text" placeholder="현장요원" onChange={handleChange}/></TableCell>
                        <TableCell align="right"><input id="center" type="text" placeholder="시설정보" onChange={handleChange}/></TableCell>
                        <TableCell align="right"><input id="etc" type="text" placeholder="특이사항" onChange={handleChange}/></TableCell>
                        <TableCell align="right"><input id="change" type="text" placeholder="변경 사항" onChange={handleChange}/></TableCell>
                        <TableCell align="right"><input id="call" type="text" placeholder="통화 이력" onChange={handleChange}/></TableCell>
                        <TableCell align="right"><input id="notice" type="text" placeholder="일정 공지" onChange={handleChange}/></TableCell>
                        <TableCell align="right"><button onClick={() => console.log(tmp)}>검색</button></TableCell>
                </TableRow>
            </TableHead>
    );
}

export default ScheduleTableSearch;