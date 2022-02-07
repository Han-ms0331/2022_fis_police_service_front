import React, {useEffect, useState,useRef} from 'react';
import styled from 'styled-components';
import axios from "axios";
import {Style} from "../../Style";
import {Message} from "../molecules/Message";
import NetworkConfig from "../../configures/NetworkConfig";
/*
날짜: 2022/01/11 11:27 AM
작성자: 정도식
작성내용: 각각의 수정요청 사항 1차 뷰
*/
/*
날짜: 2022/01/21 3:14 PM
작성자: 정도식
작성내용:
message msw 작업 완료
*/
const MessangerList = () => { //관리자 페이지에 뜨는 메시지 리스트
    let ws;
    const containerRef = useRef();
    const [messages,setMessages]=useState([]); //렌더링될 때 빈 배열로 초기화됨.

    function openSocket() { // 처음 렌더링 될 때 소켓을 연다.
        ws = new WebSocket(`ws://${process.env.REACT_APP_IP_ADDRESS}:8080/messenger/websocket`);
        wsEvt();
    }

    function wsEvt() {
        ws.onopen = function (data) {
            //소켓이 열리면 초기화 세팅하기
            console.log("socket opened");
        }
        ws.onmessage = (data) => {
            let receivedData = data.data;
            console.log(receivedData)
            receivedData=receivedData.split(" ");
            const msg = receivedData.slice(0,receivedData.length-3).join(' ');
            const [time,agent,id] = [receivedData[receivedData.length-3],receivedData[receivedData.length-2],receivedData[receivedData.length-1]];
            const insertMsg = {msg,time,agent,id}; //삽입해야하는 데이터
            setMessages((prevmsg)=>[...prevmsg,insertMsg]);
        }

        ws.onerror = (err)=>{
            console.log(`err:${err}`);
        }

        ws.onclose = (data) =>{
            console.log("websocket closed");
        }
    }

    function getTime(stringTime){
        let month = stringTime.substr(5,2);
        if (month[0]==='0') month = month.slice(1,); // 앞에 0이 있을 경우 삭제
        const day = stringTime.substr(8,2);
        const hour = stringTime.substr(11,2);
        const minutes = stringTime.substr(14,2);
        // console.log(hour,minutes);
        return month+"월 "+day+"일 "+hour+"시 "+minutes+"분";
    }// 시간 형태를 바꿔주는 함수

    useEffect(()=>{ //최초 렌더링시 웹 소켓 연결
        openSocket();
        // console.log("웹소켓 연결시도")
    },[]);

    useEffect(()=>{ // 메시지가 왔을 때 스크롤을 최하단으로 움직임
        containerRef.current.scrollTop=containerRef.current.scrollHeight;
    },[messages]);

    const handleDone = async (id) => { // 수정완료버튼을 눌렀을 경우...
        const deleteId = parseInt(id); // 형변환
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/message/${deleteId}`, {withCredentials: true})
            .then((res) => {
                const newMessages = messages.filter((el,idx)=>{ //지우고 남은 메시지들
                    return el.id!==id;
                })
                setMessages(newMessages); //지우고 남은 메시지들로 교환
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <Main ref={containerRef}>
            {messages.map((el, idx) => {
                // console.log(msg);
                return <Message key={idx} header={getTime(el.time)} agent={el.agent} content={el.msg}
                                    handleDone={()=>handleDone(el.id)}/>
                }
            )}
        </Main>
    );
};

//style
const Main = styled.div`
  padding: 0 0 10px 0;
  color: ${Style.color2};
  height: 350px;
  overflow: auto;
`;

export default MessangerList;