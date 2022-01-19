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
    // const backgroundColor = 'rgba(255, 212, 0, 0.5)';
    const backgroundColor = '#F0EDCC';
    const backgroundColor2 = 'white';
    return (
        <div>
            <ScheduleTable headerColor={backgroundColor} bodyColor={backgroundColor2} rows={resultRows}/>
            {/*테이블 헤더 색깔 여기에 넣으면 됩니다.*/}
        </div>
    );
};

export default ScheduleBody;