/*
    작성시간: 2022/01/13 1:46 PM
    이름: 이창윤
    작성내용: ScheduleTable에서 검색 기능을 하는 컴포넌트, Recoil Atom 변경
    검색 버튼 없이 키워드 입력 시 바로 결과가 나옴. 검색 버튼은 삭제할 예정
*/

import  React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import {useRecoilState} from "recoil";
import {searchKeyword} from "../../store/ScheduleSearchKeyword";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";


function ScheduleTableSearch() {


    const [keyword, setKeyword] = useRecoilState(searchKeyword) // atom의 default값을 default 설정
    const handleChange = (event) => { // 검색창에 무언가 입력하면 키워드를 담아줌.
        const target = event.target.value;
        setKeyword((prev) => ({...prev, [event.target.id]: target}));
    }

    const columnWidth =   ['5%', '8%', '22%', '8%',  '21%', '21%', '8%', '5%'];
    return (
            <TableHead>
                <TableRow>
                    <TableCell style={{ width:'2%'}} ><SearchIcon fontSize="large" style={{ color: '#2E3C7E' }} /></TableCell>
                    <TableCell style={{ width: columnWidth[0] }} align="left"></TableCell>
                    <TableCell style={{ width: columnWidth[1] }} align="right"><TextField value={keyword.a_name || ''} size="small" id="a_name" label="현장요원" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell style={{ width: columnWidth[2] }} align="right"><TextField value={keyword.c_name || ''} size="small" id="c_name" label="시설정보" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell style={{ width: columnWidth[3] }} align="right"><TextField value={keyword.accept || ''} size="small" id="accept" label="수락/거절" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell style={{ width: columnWidth[4] }} align="right"><TextField value={keyword.total_etc || ''} size="small" id="total_etc" label="특이사항" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell style={{ width: columnWidth[5] }} align="right"><TextField value={keyword.modified_info || ''} size="small" id="modified_info" label="변경 사항" variant="outlined" onChange={handleChange}/></TableCell>
                    <TableCell style={{ width: columnWidth[6] }} align="right"><TextField value={keyword.call_check || ''} size="small" id="call_check" label="통화 이력" variant="outlined" onChange={handleChange}/></TableCell>
                    {/*<TableCell align="right"><TextField size="small" id="notice" label="일정 공지" variant="outlined" onChange={handleChange}/></TableCell>*/}
                    <TableCell style={{ width: columnWidth[7] }} />
                </TableRow>
            </TableHead>
    );
}

export default ScheduleTableSearch;