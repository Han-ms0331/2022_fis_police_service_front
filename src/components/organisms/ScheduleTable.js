/*
    작성시간: 2022/01/13 1:31 PM
    이름: 이창윤
    작성내용: ScheduleTable 전체를 포함하는 컴포넌트, 검색 기능,
    체크박스 선택 및 일정공지 기능
    수정 기능
*/


import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CheckBox from "../atoms/CheckBox";
import TableHead from "@mui/material/TableHead";
import ScheduleTableSearch from "../molecules/ScheduleTableSearch";
import { useRecoilValue } from "recoil";
import {searchKeyword} from "../../store/ScheduleSearchKeyword";

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

// MUI - 테이블 Pagination 기능

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

// 데이터 생성 함수로 테스트용 더미 데이터 생성

function createData(checkbox, No, agent, center, etc, change, call, notice, edit) {
    return { checkbox, No, agent, center, etc, change, call, notice, edit };
}

const rows = [
    createData(<CheckBox />, '1', "안양 안철수", "동그라미 유치원\n[경기도 안양시 동안구 동안로 111]\n031-123-456\n9:00\n50명\n","신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '2', "안양 이철수", "B시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '3', "안양 박철수", "C시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '4', "가산 최철수", "D시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '5', "안양 윤철수", "E시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '6', "안양 김철수", "F시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '7', "구로 이철수", "G시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '8', "안양 박철수", "H시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '9', "안양 최철수", "I시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '10', "가산 윤철수", "J시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '11', "안양 김철수", "K시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '12', "안양 이철수", "L시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '13', "안양 박철수", "M시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '14', "구로 최철수", "N시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '15', "안양 윤철수", "가시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '16', "안양 김철수", "나시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '17', "안양 이철수", "다시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '18', "가산 박철수", "라시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '19', "안양 최철수", "마시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '20', "안양 윤철수", "바시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '21', "구로 김철수", "사시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '22', "안양 이철수", "ㄱ시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '23', "안양 박철수", "ㄴ시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '24', "안양 최철수", "ㄷ시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '25', "가산 윤철수", "ㄹ시설", "신청서 완료", "변경사항", "통화 완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '26', "안양 이철수", "L시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '27', "구로 이철수", "G시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),
    createData(<CheckBox />, '28', "가산 이철수", "G시설", "신청서 완료", "변경사항", "통화 미완료", "미공지", "수정버튼"),

];

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

// ScheduleTable 컴포넌트

export default function ScheduleTable() {
    const keywordProps = useRecoilValue(searchKeyword); // RecoilValue로 atom에 저장되었던 검색 키워드 값을 불러옴.

    const isSearch = () => { // 사용자가 검색창에 키워드를 입력한 상태인지 검사하는 함수
        for (let value in keywordProps) {
            if(keywordProps[value] !== ""){
                return true;
            }
        }
        return false;
    }

    const ScheduleList = (row) => ( // ScheduleList 띄워주는 함수
        <TableRow
            key={row.No}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            style={{height: 10}}
        >
            <TableCell align="center">
                <input
                    key={row.No}
                    type="checkbox"
                    onChange={(e) => onCheckedElement(e.target.checked, row)}
                    checked={checkedList.includes(row)}
                />
                {row.data}
            </TableCell>
            <TableCell component="th" scope="row">
                {row.No}
            </TableCell>
            <TableCell align="right">{row.agent}</TableCell>
            <TableCell align="right"><pre>{row.center}</pre></TableCell>
            <TableCell align="right">{row.etc}</TableCell>
            <TableCell align="right">{row.change}</TableCell>
            <TableCell align="right">{row.call}</TableCell>
            <TableCell align="right">{row.notice}</TableCell>
            <TableCell align="right"><button>수정</button></TableCell>
        </TableRow>
    )

    let count = rows.length;

    const showList = () => { // List를 여러개 보여주는 함수
        return (
            (rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // MUI - 페이지 나누는 함수
                    : rows
            ).map(ScheduleList)
        )
    }
    const handleFilter = (el) => { // 검색 키워드 필터링해주는 함수
        return el.No.includes(keywordProps.No) &&
            el.agent.includes(keywordProps.agent) &&
            el.center.includes(keywordProps.center) &&
            el.etc.includes(keywordProps.etc) &&
            el.change.includes(keywordProps.change) &&
            el.call.includes(keywordProps.call) &&
            el.notice.includes(keywordProps.notice)
            ;
    }
    const filteredShowList = () => { // 검색결과 List를 여러개 보여주는 함수

        count = rows.filter(handleFilter).length;
        return (
        (rowsPerPage > 0
                ? rows.filter(handleFilter)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows.filter(handleFilter)
        )
            .map(ScheduleList)
        )
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

    // MUI - 페이지 변경 기능

    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <ScheduleTableSearch />
                <TableHead style={{backgroundColor:'rgba(255, 212, 0, 0.5)',}}>
                    <TableRow>
                        <TableCell align="center">
                            {isSearch() ? // 검색창에 무언가 입력되어있는 상태라면 전체 선택 체크박스가 검색된 결과 리스트 모두 선택
                                <input
                                    type="checkbox"
                                    onChange = {(e) => onCheckedAllFiltered(e.target.checked)}
                                    checked={
                                        checkedList.length === 0
                                            ? false
                                            : checkedList.length === rows.filter(handleFilter).length
                                    }
                                />
                            : // 검색을 안할 경우 리스트 전체 선택
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
                        <TableCell>No.</TableCell>
                        <TableCell align="right">현장요원</TableCell>
                        <TableCell align="right">시설 정보</TableCell>
                        <TableCell align="right">특이사항</TableCell>
                        <TableCell align="right">변경 사항</TableCell>
                        <TableCell align="right">통화 이력</TableCell>
                        <TableCell align="right">일정 공지</TableCell>
                        <TableCell align="right">수정</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isSearch() // 검색 상태라면 검색결과를 보여주고 아니라면 리스트 전체를 보여줌.
                        ?
                        filteredShowList()
                        :
                        showList()
                    }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align={"center"}>
                            <button onClick={()=>console.log(checkedList)}>일정공지(임시)</button>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                            <TablePagination // MUI - Pagination 기능
                                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}