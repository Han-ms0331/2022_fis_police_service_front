/*
    작성시간: 2022/01/13 1:31 PM
    이름: 이창윤
    작성내용: ScheduleTable 전체를 포함하는 컴포넌트, 검색 기능,
    체크박스 선택 및 일정공지 기능, 테이블 정렬 기능
    수정 기능
*/

import React, {useCallback, useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ScheduleTableSearch from "../molecules/ScheduleTableSearch";
import {useRecoilState, useRecoilValue} from "recoil";
import {searchKeyword} from "../../store/ScheduleSearchKeyword";
import ClipLoader from "react-spinners/ClipLoader";
import ScheduleTableHeader from "../molecules/ScheduleTableHeader";
import {viewResultRows} from "../../store/DateSelectedRowsStore";
import ShowList from "../molecules/ShowList";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";
import {SelectedDateState} from "../../store/SelectedDateStore";
import {SelectedDateScheduleStore} from "../../store/SelectedDateScheduleStore";
import Swal from "sweetalert2";
import {Style} from "../../Style";

const Spinner = () => {
    return <ClipLoader height="32" width="160" color="#2E3C7E" radius="8"/>;
};

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

// 테이블 Style 정의

export default function ScheduleTable(props) {
    const {headerColor, bodyColor, buttonColor, headerFontColor, loading} = props;
    const rows = useRecoilValue(viewResultRows);
    const keywordProps = useRecoilValue(searchKeyword); // RecoilValue로 atom에 저장되었던 검색 키워드 값을 불러옴...
    let count = rows.length;
    const [date, setDate] = useRecoilState(SelectedDateScheduleStore);


    useEffect(() => {
        setCheckedList([]);
        setPage(0);
    }, [keywordProps, rows]); // 검색창에 키워드 입력하거나, 캘린더에서 다른 날짜를 선택했을 때, 체크박스 초기화하고 Page를 0으로 이동시킨다.

    const isSearch = () => { // 사용자가 검색창에 키워드를 입력한 상태인지 검사하는 함수
        for (let value in keywordProps) {
            if (keywordProps[value] !== "") {
                return true;
            }
        }
        return false;
    }

    /*
        작성시간: 2022/02/04 3:03 PM
        이름: 이창윤
        작성내용: 체크박스 기능 (추후 카카오톡 일정공지 기능이 구현되면 필요함)
    */

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

                rows.forEach((list) => checkedListArray.push(list));

                setCheckedList(checkedListArray);
            } else {
                setCheckedList([]);
            }
        },
        [rows]
    )

    const colorVariable = {headerbackgroundColor: headerColor, bodybackgroundColor: bodyColor, activeColor: bodyColor};
    const classes = useStyles(colorVariable);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('visit_time');
    // default 방문 시간 기준 오름차순 정렬
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // 페이지 변경 함수, 페이지 하나 당 row 개수 변경 함수


    return (
        <div className={classes.root} style={{margin: '15px'}}>
            <Paper className={classes.paper} style={{backgroundColor: 'white'}}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <ScheduleTableSearch/>
                        <ScheduleTableHeader
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            isSearch={isSearch}
                            onCheckedAllFiltered={onCheckedAllFiltered}
                            checkedList={checkedList}
                            rows={rows}
                            onCheckedAll={onCheckedAll}
                            headerFontColor={headerFontColor}
                        />
                        <TableBody style={{backgroundColor: bodyColor}} className={classes.body}>
                            {loading ?
                                <TableRow>
                                    <TableCell style={{padding: 30}} align='center' colSpan={9}>
                                        <Spinner/>
                                    </TableCell>
                                </TableRow>
                                :
                                <ShowList
                                    rows={rows}
                                    order={order}
                                    orderBy={orderBy}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onCheckedElement={onCheckedElement}
                                    checkedList={checkedList}
                                    headerColor={headerColor}
                                    buttonColor={buttonColor}
                                />
                            }
                        </TableBody>
                    </Table>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div style={{margin: "0px 20px 0px 20px"}}>
                            <CustomButton
                                type="normal"
                                content="엑셀파일 다운로드"
                                backgroundColor={buttonColor}
                                color='white'
                                onClick={async () => {
                                    let month, day, tmp;
                                    if ((date.getMonth() + 1) / 10 < 1) {
                                        month = `0${date.getMonth() + 1}`
                                    } else {
                                        month = `${date.getMonth() + 1}`
                                    }
                                    if (date.getDate() / 10 < 1) {
                                        day = `0${date.getDate()}`
                                    } else {
                                        day = `${date.getDate()}`
                                    }

                                    tmp = `${date.getFullYear()}-${month}-${day}`

                                    await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/excel/download?date=${tmp}`, {withCredentials: true, responseType: 'blob'})
                                        .then((res) => {
                                            const url = window.URL.createObjectURL(new Blob([res.data]));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', '스케쥴목록.xlsx');
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                }
                                }

                            />
                        </div>
                        <TablePagination
                            size='large'
                            rowsPerPageOptions={[{value: 10, label: '10개 보기'}, {value: 25, label: '25개 보기'}]}
                            component="div"
                            count={count}
                            showFirstButton={true}
                            showLastButton={true}
                            labelDisplayedRows={({from, to, count}) => {
                                return `총 ${count !== -1 ? count : `more than ${to}`}개 결과 중 ${from}–${to}`
                            }}
                            labelRowsPerPage="페이지당 줄 개수: "
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
