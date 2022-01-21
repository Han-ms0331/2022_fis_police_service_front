/*
    작성시간: 2022/01/13 1:31 PM
    이름: 이창윤
    작성내용: ScheduleTable 전체를 포함하는 컴포넌트, 검색 기능,
    체크박스 선택 및 일정공지 기능, 테이블 정렬 기능
    수정 기능
*/

import React, {useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from "@mui/material/TableHead";
import ScheduleTableSearch from "../molecules/ScheduleTableSearch";
import {useRecoilValue} from "recoil";
import {searchKeyword} from "../../store/ScheduleSearchKeyword";
import TransitionsModal from "./TransitionModal";
import CustomButton from "../atoms/CustomButton";
import CheckboxContainer from "../molecules/CheckboxContainer";
import {FormControlLabel, lighten, Switch, TableSortLabel} from "@mui/material";
import axios from "axios";


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

// MUI 정렬 기능

const headCells = [
    { id: 'index', numeric: false, disablePadding: true, label: 'No.' },
    { id: 'a_code', numeric: true, disablePadding: false, label: '현장요원' },
    { id: 'c_name', numeric: true, disablePadding: false, label: '시설정보' },
    { id: 'total_etc', numeric: true, disablePadding: false, label: '특이사항' },
    { id: 'modified_info', numeric: true, disablePadding: false, label: '변경 사항' },
    { id: 'call_check', numeric: true, disablePadding: false, label: '통화 이력' },
    { id: 'notice', numeric: true, disablePadding: false, label: '일정 공지' },
    { id: 'edit', numeric: true, disablePadding: false, label: '' },
];

// 테이블 헤더 정보

const useStyles = makeStyles((theme) => ({
    header: props => (
        {
            backgroundColor: props.headerbackgroundColor, // 테이블 헤더 색깔
        }
    ),
    body: props => (
        {
            backgroundColor: props.bodybackgroundColor, // 테이블 바디 색깔

        }
    ),
    root: {
        width: '100%',
    },
    icon: {
        color: 'inherit !important'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


export default function ScheduleTable({ rows, headerColor, bodyColor, buttonColor, headerFontColor }) {
    const keywordProps = useRecoilValue(searchKeyword); // RecoilValue로 atom에 저장되었던 검색 키워드 값을 불러옴...
    const tmp = [rows];
    let count = tmp.length;

    useEffect( () => {
        setPage(0);
    }, [keywordProps, tmp]); // 검색창에 키워드 입력하거나, 캘린더에서 다른 날짜를 선택했을 때, Page를 0으로 이동시킨다.

    const isSearch = () => { // 사용자가 검색창에 키워드를 입력한 상태인지 검사하는 함수
        for (let value in keywordProps) {
            if(keywordProps[value] !== ""){
                return true;
            }
        }
        return false;
    }

    const columnWidth = ['150px', '500px', '900px', '900px', '1100px', '500px', '500px', '150px'];

    const ScheduleList = (row, index) => { // Schedule List를 띄워주는 함수
        // const isItemSelected = isSelected(row.No);
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
            <TableRow
                hover
                role="checkbox"
                // aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.schedule_id}
                // selected={isItemSelected}
            >
                <TableCell padding="checkbox">
                    <input
                        key={row.schedule_id}
                        type="checkbox"
                        onChange={(e) => onCheckedElement(e.target.checked, row)}
                        checked={checkedList.includes(row)}
                        style={{zoom: 2.0, width: '15px'}}
                    />
                </TableCell>
                <TableCell style={{ width:'150px', color: headerColor, fontSize: '15pt', padding: '0px 0px' }} component="th" id={labelId} scope="row" padding="none">
                    {page*rowsPerPage + (index+1)}
                </TableCell>
                <TableCell style={{ width:'500px', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right">{row.a_name}</TableCell>
                <TableCell style={{ width:'900px', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right">
                    <details style={{padding:"10px 0"}}>
                    <summary>{row.c_name}</summary>
                    <div style={{fontSize: '13pt'}}>{row.c_address}</div>
                    <div style={{fontSize: '13pt'}}>{row.c_ph}</div>
                    <div style={{fontSize: '13pt'}}>{row.visit_time}</div>
                    <div style={{fontSize: '13pt'}}>{row.estimate_num}명</div>
                    </details>
                </TableCell>
                <TableCell style={{ width:'900px', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div>{row.total_etc}</div></TableCell>
                <TableCell style={{ width:'1100px', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div style={{  margin: 10, padding: '10px 0', overflowY: 'auto', maxHeight: 150 }}>{row.modified_info}</div></TableCell>
                <TableCell style={{ width:'500px', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div>{row.call_check}</div></TableCell>
                <TableCell style={{ width:'500px', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right"><div>일정공지여부</div></TableCell>
                <TableCell style={{ width:'150px', color: headerColor, fontSize: '15pt', padding: '1px 16px' }} align="right">
                    <TransitionsModal defaultInput={row} backgroundColor={buttonColor} />
                </TableCell>
            </TableRow>
        );
    }

    const showList = () => { // 정렬 기능과 함께 Schedule List 여러 개를 띄워주는 함수
        console.log(tmp);
        return (
            stableSort(tmp, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(ScheduleList)
        );
    }

    const handleFilter = (el) => { // 검색 키워드 필터링해주는 함수
        if (el.a_code === undefined) {
            return false
        }
        return typeof el.a_name ? el.a_name.includes(keywordProps.a_name) : false && // No 검색 필터 구현해야함
            el.a_code ? el.a_code.includes(keywordProps.a_code) : false &&
            el.c_name ? el.c_name.includes(keywordProps.c_name) : false &&
            // c_name, c_address, c_ph, visit_time, estimate_num 통합 검색 ?
            el.total_etc ? el.total_etc.includes(keywordProps.total_etc) : false &&
            el.modified_info ? el.modified_info.includes(keywordProps.modified_info) : false &&
            el.call_check ? el.call_check.includes(keywordProps.call_check) : false &&
            el.call_check_info ? el.call_check_info.includes(keywordProps.call_check_info) : false
            // 일정공지여부 실제 데이터 들어오면 구현
            ;
    }

    const filteredShowList = () => { // 정렬 기능과 함께 검색결과 List를 여러 개 보여주는 함수

        count = tmp.filter(handleFilter).length; // 사용자가 검색했을 때 전체 rows의 개수를 검색된 결과의 rows 개수로 바꿔줌
        return (
            stableSort(tmp, getComparator(order, orderBy))
                .filter(handleFilter)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(ScheduleList)
        );
    }

    const [checkedList, setCheckedList] = useState([]); // 체크박스가 선택된 리스트들의 정보를 담는 State

    const onCheckedAll = useCallback( // List 체크박스 전체 선택 기능
        (checked) => {
            if (checked) {
                const checkedListArray = [];

                tmp.forEach((list) => checkedListArray.push(list));

                setCheckedList(checkedListArray);
            } else {
                setCheckedList([]);
            }
        },
        []
    );

    const onCheckedElement = useCallback( // List 체크박스 하나씩 선택하는 기능
        (checked, list) => {
            if (checked) {
                setCheckedList([...checkedList, list]);
            } else {
                setCheckedList(checkedList.filter((el) => el !== list));
            }
        },
        [checkedList]
    );

    const onCheckedAllFiltered = useCallback( // 검색 결과 List 체크박스 전체 선택 기능
        (checked) => {
            if (checked) {
                const checkedListArray = [];

                tmp.filter(handleFilter).forEach((list) => checkedListArray.push(list));

                setCheckedList(checkedListArray);
            } else {
                setCheckedList([]);
            }
        },
        [tmp.filter(handleFilter)]
    );

    function EnhancedTableHead(props) { // 테이블 헤더 컴포넌트 (전체 선택용 체크박스 기능)
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead className={classes.header}>
                <TableRow>
                    <TableCell padding="checkbox">
                        {isSearch() ? // 검색창에 무언가 입력되어있는 상태라면 전체 선택용 체크박스가 검색된 결과의 리스트들만 모두 선택함
                            <input
                                style={{zoom: 2.0, width: '15px'}}
                                type="checkbox"
                                onChange = {(e) => onCheckedAllFiltered(e.target.checked)}
                                checked={
                                    checkedList.length === 0
                                        ? false
                                        : checkedList.length === tmp.filter(handleFilter).length
                                }
                            />
                            : // 검색을 안할 경우 전체 선택용 체크박스가 리스트들을 모두 전체 선택함
                            <input
                                style={{zoom: 2.0, width: '15px'}}
                                type="checkbox"
                                onChange = {(e) => onCheckedAll(e.target.checked)}
                                checked={
                                    checkedList.length === 0
                                        ? false
                                        : checkedList.length === tmp.length
                                }
                            />
                        }
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
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const colorVariable = { headerbackgroundColor: headerColor, bodybackgroundColor: bodyColor, activeColor: bodyColor };
    const classes = useStyles(colorVariable);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    // MUI에 있는 체크박스 선택 기능 함수들 - 사용하지 않음

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // 페이지 변경 함수, 페이지 하나 당 row 개수 변경 함수

    const handleChangeDense = (event) => { // 간격 붙이는 DensePadding 기능
        setDense(event.target.checked);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root} style={{margin: '15px'}}>
            <Paper className={classes.paper} style={{backgroundColor: 'white'}}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <ScheduleTableSearch />
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick} // 사용하지 않는 기능
                            onRequestSort={handleRequestSort}
                            rowCount={tmp.length}
                        />
                        <TableBody style={{ backgroundColor: bodyColor }} className={classes.body}>
                            {isSearch() // 검색 상태라면 검색결과를 보여주고 아니라면 리스트 전체를 보여줌.
                                ?
                                filteredShowList()
                                :
                                showList()
                            }
                            {/*{emptyRows > 0 && (*/}
                            {/*    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>*/}
                            {/*        <TableCell colSpan={6} />*/}
                            {/*    </TableRow>*/}
                            {/*)}*/}
                        </TableBody>
                    </Table>
                    <div>
                        {/*<div style={{margin: '25px'}}>*/}
                        {/*    <CustomButton*/}
                        {/*        type="normal"*/}
                        {/*        content="일정공지"*/}
                        {/*        backgroundColor={buttonColor}*/}
                        {/*        color='white'*/}
                        {/*        onClick={ async() => {   //서버로부터 데이터를 받아와 setRows 스테이트에 데이터들을 저장하는 함수*/}
                        {/*                console.log(checkedList);*/}
                        {/*                await axios.post('/schedule/announce', {*/}
                        {/*                    checkedList*/}
                        {/*                })*/}
                        {/*                    .then((res) => console.log(res.data))*/}
                        {/*            }*/}
                        {/*        }*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </TableContainer>

            </Paper>
        </div>
    );
}
