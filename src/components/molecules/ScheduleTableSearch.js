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
// import TextField from '@material-ui/core/TextField';
import SearchIcon from '@mui/icons-material/Search';

import TextField from "@mui/material/TextField";

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
                    <TableCell><SearchIcon fontSize="medium" style={{ color: '#2E3C7E' }} /></TableCell>
                    <TableCell align="left"><TextField size="small" id="index" label="No." variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell align="right"><TextField size="small" id="a_name" label="현장요원" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell align="right"><TextField size="small" id="c_name" label="시설정보" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell align="right"><TextField size="small" id="total_etc" label="특이사항" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell align="right"><TextField size="small" id="modified_info" label="변경 사항" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell align="right"><TextField size="small" id="call_check" label="통화 이력" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell align="right"><TextField size="small" id="notice" label="일정 공지" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
    );
}

export default ScheduleTableSearch;