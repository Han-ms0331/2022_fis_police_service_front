import React from 'react';
import "./CallInfoList.css";

/*
    날짜: 2022/01/13 11:13 오전
    작성자: 한명수
    작성내용: CallInfoList 완성
*/

function CallInfoList(props) {
    const {u_name, content} = props;

    return (
        <div className={"info_list"} style={{width: "100%", padding: "10px", fontSize: "17px"}}>
            <div className={"recorder_container"}>
                <div>기록자</div>
                <div>{content.user.user_name}</div>
            </div>
            <div className={"info_container"}>
                <div>
                    <div style={{textAlign: "start"}}>
                        <div className={"field_container"}>
                            <div className={"field_name"}>인/아웃바운드</div>
                            <div className={"field_value"}>{content.in_out==="IN" ? "인" : "아웃"}</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>연락일자</div>
                            <div className={"field_value"}>{content.dateTime.slice(0,10)}</div>
                        </div>
                        <div className={"field_container"}>
                            <div className={"field_name"}>연락시간</div>
                            <div className={"field_value"}>{content.dateTime.slice(10)}</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>시설 참여여부</div>
                            <div className={"field_value"}>{
                                content.participation ==="PARTICIPATION" ?
                                    "참여":
                                    content.participation ==="REJECT" ?
                                        "거부":"보류"
                            }</div>
                        </div>
                    </div>
                </div>
                <div >
                    <div style={{textAlign: "start"}}>
                        <div className={"field_container"}>
                            <div className={"field_name"}>담당자 이름</div>
                            <div className={"field_value"}>{content.c_manager}</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>담당자 이메일</div>
                            <div className={"field_value"}>{content.m_email}</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>담당자 전화번호</div>
                            <div className={"field_value"}>{content.m_ph}</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>시설 특이사항</div>
                            <div className={"field_value"}>{content.center_etc}</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>현장요원 특이사항</div>
                            <div className={"field_value"}>{content.agent_etc}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CallInfoList;