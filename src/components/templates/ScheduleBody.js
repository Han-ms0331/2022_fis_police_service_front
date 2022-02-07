import React from 'react';
import ScheduleTable from "../organisms/ScheduleTable";
import {useRecoilValue} from "recoil";
import {dateSelectedRows} from "../../store/DateSelectedRowsStore";
import {Style} from "../../Style";
import styled from 'styled-components';
/*
날짜: 2022/01/10 3:49 PM
작성자: 정도식
작성내용: 스케줄 바디에 해당하는 부분
*/

const ScheduleBody = ({loading}) => {
    const backgroundColor = Style.color2;
    const backgroundColor2 = Style.color1;
    const backgroundColor3 = Style.color2;
    const fontColor = 'white';

    return (
        <Container>
            <ScheduleTable headerColor={backgroundColor} headerFontColor={fontColor} bodyColor={backgroundColor2}
                           buttonColor={backgroundColor3} loading={loading}/>
            {/*테이블 헤더 색깔 여기에 넣으면 됩니다.*/}
        </Container>
    );
};

const Container = styled.div`
margin: 50px 30px 0 5px;
  height: 100%;
`;
export default ScheduleBody;