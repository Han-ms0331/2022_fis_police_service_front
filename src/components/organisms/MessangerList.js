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
const ws = new WebSocket("ws://" + "54.175.8.114:8080" + "/messenger/websocket");
function send() {
    ws.send("name"+" : "+"msg");
}
function wsOpen(){

    wsEvt();
}

function wsEvt() {
    ws.onopen = function(data){
        //소켓이 열리면 초기화 세팅하기
    }

    ws.onmessage = function(data) {
        let msg = data.data;
        console.log(msg);
    }

    document.addEventListener("keypress", function(e){
        if(e.keyCode == 13){ //enter press
            send();
        }
    });
}

const MessangerList = () => {

    const [messages, setMessages] = useState([]);

    const getData = () => {
        const ws = new WebSocket(`ws://${NetworkConfig.networkAddress}/messenger/websocket`);
        ws.onmessage = (data) => {
            setMessages(data.data);
        }
    };


    useEffect(() => { //최초 렌더링시 서버로부터 데이터를 받아온다.
        getData();
        console.log(messages);
    }, []);

    const handleDone = () => { // 수정완료버튼을 눌렀을 경우...
        console.log("수정완료!")
    }
    return (
        <Main>
            <Message header={"test"} agent={"test user"} content={"메시지 내용"}
                     handleDone={handleDone}/>
            {messages.map((msg, idx) => {
                console.log(msg);
                // return <Message key={idx} header={msg.time} agent={msg.user} content={msg.message}
                    //                 handleDone={handleDone}/>
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