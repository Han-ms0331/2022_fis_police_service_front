/*
    작성시간: 2022/01/10 2:55 PM
    이름: 이창윤
    작성내용: 현장요원 스케줄의 리스트들을 모두 띄우는 컨테이너
*/

import React from 'react';
import AgentSchedule from "../molecules/AgentSchedule";
import styled from "styled-components";
import {Style} from "../../Style";
import question from "../media/question.png";
import {ClipLoader} from "react-spinners";

function AgentContainer({content= null, width=266, height=400, loading}) {
    // content - 요원 정보가 담긴 배열을 받음. width와 height으로 컨테이너 크기 조절..
    return (
        <Container style={{ overflowY: 'auto', margin: '0 0 20px 20px' }} width={width} height={height}>
            <center>
                <div style={{ fontSize: 20, margin: 8 }}>주변 현장요원</div>
                {
                    loading ?
                        <div style={{ marginTop: 145 }} >
                            <ClipLoader color="rgba(46, 60, 126,0.3)" />
                        </div>
                        :
                        content === null ?
                    <div style={{ marginTop: 110 }}>
                        <p style={{ fontSize: 20, fontWeight: 300, color: 'grey' }}>날짜를 선택해 주세요!</p>
                        <img style={{ width: 70, height: 70 }} src={question} alt={'?'} />
                    </div>
                    :
                    <AgentSchedule content={content} width={width} height={height} />
                }
            </center>
        </Container>
    );
}

const Container = styled.div`
  border: 2px solid ${Style.color2};
  padding: 5px;
  background-color: ${Style.color1};
  border-radius: 10px;
  margin: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
export default AgentContainer;