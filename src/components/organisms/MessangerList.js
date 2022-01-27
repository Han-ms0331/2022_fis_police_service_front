import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined';
import axios from "axios";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";
import {useRecoilValue} from "recoil";
import {Messages} from "../../store/Message";
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

const MessangerList = () => {
    let ws;
    const [messages, setMessages] = useState([]);
    const getData = () =>{
        openSocket();
    }
    function openSocket() {
        ws = new WebSocket(`ws://localhost:8080/messenger/websocket`);
        wsEvt();
        ws.addEventListener('error', (event) =>{
            console.log(event);
        })
    }
    function getTime(stringTime){
        console.log(stringTime);
        let month = stringTime.substr(5,2);
        if (month[0]==='0') month = month.slice(1,); // 앞에 0이 있을 경우 삭제
        const day = stringTime.substr(8,2);
        const hour = stringTime.substr(11,2);
        const minutes = stringTime.substr(14,2);
        // console.log(hour,minutes);
        return month+"월 "+day+"일 "+hour+"시 "+minutes+"분";
    }

    function wsEvt() {
        console.log("socket opened");
        ws.onopen = function (data) {
            //소켓이 열리면 초기화 세팅하기
        }
        ws.onmessage = function (data) {

            let receivedData = data.data;
            receivedData=receivedData.split(" ");
            // console.log(receivedData);
            let [message,time,agent] = receivedData;
            setMessages([...messages,{message,time,agent}]);
        }

    }

    useEffect(()=>{ //최초 렌더링시
        getData();
    },[]);
    // useEffect(()=>{
    //     console.log(messages)
    // },[messages]);

    const handleDone = (time) => { // 수정완료버튼을 눌렀을 경우...
        const newMessages = messages.filter((el,idx)=>{
            return el.time!==time;
        })
        setMessages(newMessages);
        // console.log(time);
    }
    return (
        <Main>
            {messages.map((msg, idx) => {
                console.log(msg);
                return <Message key={idx} header={getTime(msg.time)} agent={msg.agent} content={msg.message}
                                    handleDone={()=>handleDone(msg.time)}/>
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