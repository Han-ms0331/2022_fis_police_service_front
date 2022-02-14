import React from 'react';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {TableSortLabel} from "@mui/material";
import PropTypes from "prop-types";

ScheduleTableHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function ScheduleTableHeader(props) { // 테이블 헤더 컴포넌트 (전체 선택용 체크박스 기능)
    const { classes, order, orderBy, onRequestSort, rowCount,
        isSearch, onCheckedAllFiltered, checkedList, rows, onCheckedAll, headerFontColor } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        { id: 'index', numeric: false, disablePadding: true, label: 'No.', sortLabel: false },
        { id: 'a_code', numeric: true, disablePadding: false, label: '현장요원', sortLabel: true },
        { id: 'c_name', numeric: true, disablePadding: false, label: '시설정보', sortLabel: true },
        { id: 'accept', numeric: true, disablePadding: false, label: '수락/거절', sortLabel: true },
        { id: 'total_etc', numeric: true, disablePadding: false, label: '특이사항', sortLabel: true },
        { id: 'modified_info', numeric: true, disablePadding: false, label: '변경 사항', sortLabel: true },
        { id: 'call_check', numeric: true, disablePadding: false, label: '통화 이력', sortLabel: true },
        // { id: 'notice', numeric: true, disablePadding: false, label: '일정 공지' },
        { id: 'edit', numeric: true, disablePadding: false, label: '', sortLabel: false },
    ];
    // 테이블 헤더 정보

    const columnWidth = ['5%', '8%', '22%', '8%',  '21%', '21%', '8%', '5%'];


    return (
        <TableHead className={classes.header}>
            <TableRow>
                <TableCell style={{ width:'2%'}} padding="checkbox">
                     {/*검색창에 무언가 입력되어있는 상태라면 전체 선택용 체크박스가 검색된 결과의 리스트들만 모두 선택함*/}
                        <input
                            style={{zoom: 2.0, width: '15px'}}
                            type="checkbox"
                            onChange = {(e) => {
                                if(isSearch()) {
                                    return onCheckedAllFiltered(e.target.checked)
                                }
                                else {
                                    return onCheckedAll(e.target.checked)
                                }
                            }}
                            checked={
                                checkedList.length === 0
                                    ? false
                                    : checkedList.length === rows.length
                            }
                        />
                        {/*검색을 안할 경우 전체 선택용 체크박스가 리스트들을 모두 전체 선택함*/}
                </TableCell>
                {headCells.map((headCell, index) => ( // 테이블 헤더 정보 mapping
                    <TableCell
                        style={{ width: columnWidth[index], color: headerFontColor, fontSize: '14pt', fontWeight: 'bold' }}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        // align='center'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.sortLabel ? // SortLabel true이면 정렬 버튼 활성화 false이면 그냥 텍스트
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                classes={{ root: classes.root, active: classes.active, icon: classes.icon}}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                style={{ color: '#fff', alignContent: 'center' }}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                                ) : null}
                            </TableSortLabel>
                            :
                            headCell.label
                        }

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default ScheduleTableHeader;