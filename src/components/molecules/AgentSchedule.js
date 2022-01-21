/*
    작성시간: 2022/01/10 2:51 PM
    이름: 이창윤
    작성내용: 현장요원 스케쥴 정보(TimeList 컴포넌트)
     여러 개의 리스트를 띄우는 컴포넌트
*/

import React from 'react';
import TimeList from "./TimeList";


function AgentSchedule({content, width, height}) {
    return (
        <div>
            {content.map(item => {
                if (!item) {
                    return <TimeList key={item.agent_id} content={item} setCurrentTime={0} />;

                }
            })}
            {/*Array의 map함수를 통해 요원 스케쥴 데이터를 나열함.*/}
        </div>
    );
}

export default AgentSchedule;