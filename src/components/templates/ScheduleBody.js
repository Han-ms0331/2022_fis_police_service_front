import React, {useState} from 'react';
import {Button} from "@mui/material";
import ScheduleModifyInputForm from "../organisms/ScheduleModifyInputForm";
import ScheduleTable from "../organisms/ScheduleTable";
import {useRecoilValue} from "recoil";
import {dateSelectedRows} from "../../store/DateSelectedRowsStore";
import {Style} from "../../Style";

/*
날짜: 2022/01/10 3:49 PM
작성자: 정도식
작성내용: 스케줄 바디에 해당하는 부분
*/


const ScheduleBody = () => {
    const resultRows = useRecoilValue(dateSelectedRows);
    // const backgroundColor = 'rgba(255, 212, 0, 0.5)';
    const backgroundColor = Style.color2;
    const backgroundColor2 = Style.color1;
    const backgroundColor3 = Style.color2;
    const fontColor = 'white';
    const fontColor2 = 'black';
    return (
        <div>
            <ScheduleTable headerColor={backgroundColor} headerFontColor={fontColor} bodyColor={backgroundColor2} buttonColor={backgroundColor3} rows={resultRows}/>
            {/*테이블 헤더 색깔 여기에 넣으면 됩니다.*/}
        </div>
    );
};

export default ScheduleBody;