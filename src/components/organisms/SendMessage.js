import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";
import {Style} from "../../Style";
import NetworkConfig from "../../configures/NetworkConfig";

const SendMessage = () => {
    let ws;
    const [message, setMessage] = useState('안녕');

    function openWebSocket() {
        ws = new WebSocket(`ws://${NetworkConfig.networkAddress}/messenger/websocket`);
        ws.onopen = (e) => {
            console.log("연결완료");
            console.log(ws);
            ws.send("hi server");
        }
        ws.onmessage = (data) => {
            console.log("서버에서 받은 데이터" + data.data);
        }
    }

    const handleSend = (e) => { /*보내기 버튼을 눌렀을 때 실행되는 함수*/
        e.preventDefault();
        console.log(`${message} message sent`);
        openWebSocket();
        e.target.reset();
    }

    const resize = (e) => { /*textarea에서 다음줄로 넘어가면 input창의 크기를 조절해주는 함수*/
        e.target.style.height = "1px";
        e.target.style.height = (20 + e.target.scrollHeight) + "px";
    }
    const handleChange = (e) => { /*메시지를 설정하는 함수*/
        setMessage(e.target.value); /*리렌더링이 일어남*/
    }

    // useEffect(()=>{
    //     console.log(message);
    // },[message]);

    return (
        <Main>
            <Header>10:34 오전</Header>
            <Content onSubmit={handleSend}>
                <textarea placeholder="요청 사항을 입력하세요..." type="text" onKeyUp={resize} onKeyDown={resize}
                          onChange={handleChange}/>
                <CustomButton type="normal" submitType="submit" backgroundColor={Style.color2} border="1.5px solid #eee"
                              borderRadius="7px" content="보내기" color="#fff" fontSize="14px" padding="0px"
                              margin="7px 0"/>
            </Content>
        </Main>
    );
};

//style
const Main = styled.div`
  padding: 0 0 10px 0;
`;

const Header = styled.div`
  text-align: unset;
  font-size: 16px;
  //background: #f7e98b;
  background: #eee;
  padding: 3px 7px;
  height: 15px;
`;

const Content = styled.form`
  //background: #fff9d6;
  background: #f7f7f7;
  padding: 7px;
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  & > textarea { /*수정 요청사항*/
    //background: #fff9d6;
    background: #f7f7f7;
    border: none;
    font-size: 17px;
    width: 100%;
    overflow-y: hidden;
    margin-bottom: 30px;
    resize: none;
  }

  & > button { /*보내기 버튼*/
    position: absolute;
    bottom: 3px;
    right: 3px;
  }
`;
export default SendMessage;