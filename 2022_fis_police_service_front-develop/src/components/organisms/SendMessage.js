import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";

/*
날짜: 2022/01/21 1:35 PM
작성자: 정도식
작성내용:
수정요청사항을 서버에 보냄
 */

const SendMessage = ({setMsgsent,msgsent}) => {
    const [curmsg, setCurmsg] = useState('');
    let ws;

    function openSocket() {
        ws = new WebSocket(`ws://${process.env.REACT_APP_IP_ADDRESS}:8080/messenger/websocket`);
        wsEvt();
    }

    function wsEvt() {
        ws.onopen = function (data) {
            //소켓이 열리면 초기화 세팅하기
            console.log("web socket opened");
            ws.send(curmsg);
        }
        ws.onmessage = function (data) {
            console.log(data.data);
        }
    }

    const handleSend = (e) => { /*보내기 버튼을 눌렀을 때 실행되는 함수*/
        e.preventDefault();
        openSocket();
        e.target.reset();
    }

    const resize = (e) => { /*textarea에서 다음줄로 넘어가면 input창의 크기를 조절해주는 함수*/
        e.target.style.height = "1px";
        e.target.style.height = (20 + e.target.scrollHeight) + "px";
    }
    const handleChange = (e) => { /*메시지를 설정하는 함수*/
        setCurmsg(e.target.value);
    }
    const numFormat = (time)=>{
        let temp=time;
        if(String(time).length==1 && time<10){
            temp = "0"+temp;
        }
        return temp;
    }
    const time = numFormat(new Date().getHours()) +' : '+numFormat(new Date().getMinutes()); // 수정요청사항을 보내는 시간

    return (
        <Main>
            <Header>{time}</Header>
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