import React from 'react';
import {Container} from "@mui/material";
import "./InfoList.css";

/*
    날짜: 2022/01/13 11:13 오전
    작성자: 한명수
    작성내용: InfoList 완성
*/

function InfoList(props) {
    return (
        <div className={"info_list"} style={{width: "90%", padding: "1vw"}}>
            <div className={"recorder_container"} >
                <div>기록자</div>
                <div>원보라</div>
            </div>
            <div className={"info_container"} >
                <Container maxWidth={"sm"}>
                    <div style={{textAlign: "start"}}>
                        <div className={"field_container"}>
                            <div className={"field_name"}>인/아웃바운드</div>
                            <div className={"field_value"}>인</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>연락일자</div>
                            <div className={"field_value"}>2022-01-13</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>시설 참여여부</div>
                            <div className={"field_value"}>참여</div>
                        </div>
                    </div>
                </Container>
                <Container maxWidth={"sm"}>
                    <div style={{textAlign: "start"}}>
                        <div className={"field_container"}>
                            <div className={"field_name"}>담당자 이름</div>
                            <div className={"field_value"}>홍길동</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>담당자 이메일</div>
                            <div className={"field_value"}>서울시 노원구 동이로 215길 48</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>담당자 전화번호</div>
                            <div className={"field_value"}>010-1234-1234</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>시설 특이사항</div>
                            <div className={"field_value"}>아이들 점심시간이 겹치지 않았으면 함</div>
                        </div>
                        <br/>
                        <div className={"field_container"}>
                            <div className={"field_name"}>현장요원 특이사항</div>
                            <div className={"field_value"}>방문시 체온 측정과 백신패스 인증 필요</div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default InfoList;