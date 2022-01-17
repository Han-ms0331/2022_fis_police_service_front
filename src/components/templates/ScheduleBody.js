import React, {useState} from 'react';
import {Button} from "@mui/material";
import ScheduleModifyInputForm from "../organisms/ScheduleModifyInputForm";
import ScheduleTable from "../organisms/ScheduleTable";
import {useRecoilValue} from "recoil";
import {dateSelectedRows} from "../../store/DateSelectedRowsStore";

/*
날짜: 2022/01/10 3:49 PM
작성자: 정도식
작성내용: 스케줄 바디에 해당하는 부분
*/
const ScheduleBody = () => {
    const resultRows = useRecoilValue(dateSelectedRows);
    return (
        <div>
            <ScheduleTable rows={resultRows}/>
        </div>
    );
};

export default ScheduleBody;