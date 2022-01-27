import React from 'react';
import {Container} from "@mui/material";
import './ApplyInfoList.css'

/*
    날짜: 2022/01/13 4:07 오후
    작성자: 한명수
    작성내용:   ApplyInfoList 작성, props로 넘어온 방문일정 정보를 양식에 맞게 표시
*/

function ApplyInfoList(props) {
    const {u_name, content} = props;
    return (
        <div className={"apply_info_list"} style={{width: "100%", padding: "1vw", fontSize: "0.7vw"}}>
            <div className={"apply_recorder_container"}>
                <div>기록자</div>
                <div>{content.user.user_name}</div>
            </div>
            <div className={"apply_info_container"}>
                <div>
                    <div style={{textAlign: "start"}}>
                        <div className={"apply_field_container"}>
                            <div className={"apply_field_name"}>현장요원</div>
                            <div className={"apply_field_value"}>{content.agent.agent_id+content.agent.agent_name}</div>
                        </div>
                        <br/>
                        <div className={"apply_field_container"}>
                            <div className={"apply_field_name"}>예상 인원</div>
                            <div className={"apply_field_value"}>{content.estimate_num}</div>
                        </div>
                        <br/>
                        <div className={"apply_field_container"}>
                            <div className={"apply_field_name"}>방문 예정 날짜</div>
                            <div className={"apply_field_value"}>{content.visit_date}</div>
                        </div>
                        <br/>
                        <div className={"apply_field_container"}>
                            <div className={"apply_field_name"}>방문 예정 시간</div>
                            <div className={"apply_field_value"}>{content.visit_time}</div>
                        </div>
                        <br/>
                        <div className={"apply_field_container"}>
                            <div className={"apply_field_name"}>시설 특이사항</div>
                            <div className={"apply_field_value"}>{content.center_etc}</div>
                        </div>
                        <br/>
                        <div className={"apply_field_container"}>
                            <div className={"apply_field_name"}>현장요원 특이사항</div>
                            <div className={"apply_field_value"}>{content.agent_etc}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplyInfoList;