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
    { id: 'No', numeric: false, disablePadding: true, label: 'No.' },
    { id: 'agent', numeric: true, disablePadding: false, label: '현장요원' },
    { id: 'center', numeric: true, disablePadding: false, label: '시설정보' },
    { id: 'etc', numeric: true, disablePadding: false, label: '특이사항' },
    { id: 'change', numeric: true, disablePadding: false, label: '변경 사항' },
    { id: 'call', numeric: true, disablePadding: false, label: '통화 이력' },
    { id: 'notice', numeric: true, disablePadding: false, label: '일정 공지' },
    { id: 'edit', numeric: true, disablePadding: false, label: '' },
];

// 테이블 헤더 정보

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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

export default function ScheduleTable({ rows }) {
    const keywordProps = useRecoilValue(searchKeyword); // RecoilValue로 atom에 저장되었던 검색 키워드 값을 불러옴...
    let count = rows.length;

    useEffect( () => {
        setPage(0);
    }, [keywordProps]);

    const isSearch = () => { // 사용자가 검색창에 키워드를 입력한 상태인지 검사하는 함수
        for (let value in keywordProps) {
            if(keywordProps[value] !== ""){
                return true;
            }
        }
        return false;
    }


    const ScheduleList = (row, index) => { // Schedule List를 띄워주는 함수
        const isItemSelected = isSelected(row.No);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.schedule_id}
                selected={isItemSelected}
            >
                <TableCell padding="checkbox">
                    <input
                        key={row.No}
                        type="checkbox"
                        onChange={(e) => onCheckedElement(e.target.checked, row)}
                        checked={checkedList.includes(row)}
                    />
                </TableCell>
                <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.a_name}
                </TableCell>
                <TableCell align="right">{row.a_code}</TableCell>
                <TableCell align="right"><pre>{row.c_name}</pre></TableCell>
                <TableCell align="right"><pre>{row.total_etc}</pre></TableCell>
                <TableCell align="right"><pre>{row.modified_info}</pre></TableCell>
                <TableCell align="right"><pre>{row.call_check}</pre></TableCell>
                <TableCell align="right"><pre>{row.call_check_info}</pre></TableCell>
                <TableCell align="right">
                    <TransitionsModal />
                </TableCell>
            </TableRow>
        );
    }

    const showList = () => { // 정렬 기능과 함께 Schedule List 여러 개를 띄워주는 함수
        return (
            stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(ScheduleList)
        );
    }

    const handleFilter = (el) => { // 검색 키워드 필터링해주는 함수
        return el.a_name.includes(keywordProps.a_name) &&
            el.a_code.includes(keywordProps.a_code) &&
            el.c_name.includes(keywordProps.c_name) &&
            el.total_etc.includes(keywordProps.total_etc) &&
            el.modified_info.includes(keywordProps.modified_info) &&
            el.call_check.includes(keywordProps.call_check) &&
            el.call_check_info.includes(keywordProps.call_check_info)
            ;
    }

    const filteredShowList = () => { // 정렬 기능과 함께 검색결과 List를 여러 개 보여주는 함수

        count = rows.filter(handleFilter).length; // 사용자가 검색했을 때 전체 rows의 개수를 검색된 결과의 rows 개수로 바꿔줌
        return (
            stableSort(rows, getComparator(order, orderBy))
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

                rows.forEach((list) => checkedListArray.push(list));

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

                rows.filter(handleFilter).forEach((list) => checkedListArray.push(list));

                setCheckedList(checkedListArray);
            } else {
                setCheckedList([]);
            }
        },
        [rows.filter(handleFilter)]
    );

    function EnhancedTableHead(props) { // 테이블 헤더 컴포넌트 (전체 선택용 체크박스 기능)
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead style={{backgroundColor:'rgba(255, 212, 0, 0.5)'}}>
                <TableRow>
                    <TableCell padding="checkbox">
                        {isSearch() ? // 검색창에 무언가 입력되어있는 상태라면 전체 선택용 체크박스가 검색된 결과의 리스트들만 모두 선택함
                            <input
                                type="checkbox"
                                onChange = {(e) => onCheckedAllFiltered(e.target.checked)}
                                checked={
                                    checkedList.length === 0
                                        ? false
                                        : checkedList.length === rows.filter(handleFilter).length
                                }
                            />
                            : // 검색을 안할 경우 전체 선택용 체크박스가 리스트들을 모두 전체 선택함
                            <input
                                type="checkbox"
                                onChange = {(e) => onCheckedAll(e.target.checked)}
                                checked={
                                    checkedList.length === 0
                                        ? false
                                        : checkedList.length === rows.length
                                }
                            />
                        }
                    </TableCell>
                    {headCells.map((headCell) => ( // 테이블 헤더 정보 mapping
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
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

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
            <Paper className={classes.paper}>
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
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {isSearch() // 검색 상태라면 검색결과를 보여주고 아니라면 리스트 전체를 보여줌.
                                ?
                                filteredShowList()
                                :
                                showList()
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div>
                        <div style={{margin: '25px'}}>
                            <CustomButton
                                type="normal"
                                content="일정공지"
                                backgroundColor='rgba(255, 212, 0, 0.5)'
                                color='black'
                                onClick={ async() => {   //서버로부터 데이터를 받아와 setRows 스테이트에 데이터들을 저장하는 함수
                                    await axios.post('/schedule/announce')
                                        .then((res) => {
                                            console.log(res.data);
                                        })
                                    }
                                }
                            />
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
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
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}
