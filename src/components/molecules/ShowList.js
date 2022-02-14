/*
    작성시간: 2022/02/04 4:43 PM
    이름: 이창윤
    작성내용: Table Body에 해당하는 스케줄 정보 여러 줄을 띄우는 컴포넌트
*/

import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TransitionsModal from "../organisms/TransitionModal";

// MUI 정렬 기능 함수
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function ShowList(props) {
    const {rows, order, orderBy, page, rowsPerPage, onCheckedElement,
        checkedList, headerColor, buttonColor} = props;
    if (rows.length === 0) {
        return (
            <TableRow>
                <TableCell style={{ padding: 30 }} align='center' colSpan={9}>
                    <div style={{fontSize: 25}}>검색 결과가 없습니다.</div>
                </TableCell>
            </TableRow>
        )
    }

    const ScheduleList = (row, index) => { // Schedule List 한 줄을 띄워주는 함수
        // const isItemSelected = isSelected(row.No);
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.schedule_id}
            >
                <TableCell style={{ width:'2%'}} padding="checkbox">
                    <input
                        key={row.schedule_id}
                        type="checkbox"
                        onChange={(e) => onCheckedElement(e.target.checked, row)}
                        checked={checkedList.includes(row)}
                        style={{zoom: 2.0, width: '15px'}}
                    />
                </TableCell>
                <TableCell style={{ width:'5%', color: headerColor, fontSize: '15pt', padding: '0px 0px' }} component="th" id={labelId} scope="row" padding="none">
                    {page*rowsPerPage + (index+1)}
                </TableCell>
                <TableCell style={{ width:'8%', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right">{row.a_name}</TableCell>
                <TableCell style={{ width:'22%', color: headerColor, fontSize: '15pt', padding: '10px 16px' }} align="right">
                    <div>{row.c_name}</div>
                    <div style={{fontSize: '13pt'}}>{row.c_address}</div>
                    <div style={{fontSize: '13pt'}}>{row.c_ph}</div>
                    <div style={{fontSize: '13pt'}}>{row.visit_time}</div>
                    <div style={{fontSize: '13pt'}}>{row.estimate_num}명</div>
                </TableCell>
                <TableCell style={{ width:'8%', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div>{row.accept==="TBD"?"미확인":row.accept==="accept"?"수락":"거절"}</div></TableCell>
                <TableCell style={{ width:'21%', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div>{row.total_etc}</div></TableCell>
                <TableCell style={{ width:'21%', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div style={{  margin: 10, padding: '10px 0', overflowY: 'auto', maxHeight: 150 }}>{row.modified_info}</div></TableCell>
                <TableCell style={{ width:'8%', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div>{row.call_check}</div></TableCell>
                {/*<TableCell style={{ width:'500px', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div>일정공지여부</div></TableCell>*/}
                <TableCell style={{ width:'5%', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right">
                    <TransitionsModal defaultInput={row} backgroundColor={buttonColor} />
                </TableCell>
            </TableRow>
        );
    }

    return (
        stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(ScheduleList)
    );
}

export default ShowList;