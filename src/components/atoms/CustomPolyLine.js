import React from 'react';
import {Polyline} from "react-kakao-maps-sdk";

/*
    날짜 : 2022/01/12 4:48 PM
    작성자 : 지상은
    작성내용 : 선택된 요원의 동선 표시
*/

function CustomPolyLine(props) {
    return (
        <Polyline
            path={props.path} // CustomMap에서 다음과 같이 배열로 주어져야함
            strokeWeight={6} // 선의 두께 입니다
            strokeColor="#cf3530" // 선의 색깔입니다
            strokeOpacity={0.9} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            display={props.drag} // 드래그 시 폴리라인 고정
        />
    );
}

export default CustomPolyLine;
