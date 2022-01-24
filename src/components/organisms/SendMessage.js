import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";

const SendMessage = () => {
    var ws;
    const [message,setMessage] = useState('안녕');

    function openWebSocket() {
        ws = new WebSocket('ws://192.168.0.178:8080/chating'); //웹소켓으로 연결
       console.log("객체 생성 완료")
        console.log(ws)
        // wsEvt();
        ws.onopen=()=>{
            console.log("연결완료");
        }
        ws.onerror=(e)=>{
            console.log(e);
        }
    }
    function wsEvt() {
        ws.onopen= (e) =>{
            console.log("연결됨")
            console.log(e)
        }
        ws.onmessage = (data) =>{
            console.log(data);
            let msg = data.data;
            // if(msg != null && msg.trim() != ''){
            // console.log(msg);
            // }
        }
        ws.onclose=(e)=>{
            console.log("closed");
        }
    }
    useEffect(()=>{openWebSocket()},[]);


    const handleSend=(e)=>{ /*보내기 버튼을 눌렀을 때 실행되는 함수*/
        e.preventDefault();
        console.log("sent");
        e.target.reset();
    }

    const resize = (e)=>{ /*textarea에서 다음줄로 넘어가면 input창의 크기를 조절해주는 함수*/
        e.target.style.height="1px";
        e.target.style.height=(20+e.target.scrollHeight)+"px";
    }

    const handleChange= (e)=>{ /*메시지를 설정하는 함수*/
        setMessage(e.target.value); /*리렌더링이 일어남*/
    }

    // useEffect(()=>{
    //     console.log(message);
    // },[message]);

    return (
        <Main>
            <Header>10:34 오전</Header>
            <Content onSubmit={handleSend}>
            <textarea placeholder="요청 사항을 입력하세요..." type="text" onKeyUp={resize} onKeyDown={resize} onChange={handleChange}/>
                <CustomButton type="normal" submitType="submit" backgroundColor="#f7e98b" border= "1.5px solid #c9b034" borderRadius="7px" content="보내기" color="#222" fontSize="14px" padding="0px" margin="7px 0"/>
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
  background: #f7e98b;
  padding: 3px 7px;
  height: 15px;
`;

const Content = styled.form`
    background: #fff9d6;
    padding: 7px;
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  
  &>textarea{ /*수정 요청사항*/
    background: #fff9d6;
    border: none;
    font-size: 17px;
    width: 100%;
    overflow-y: hidden;
    margin-bottom: 30px;
  }
  &>button{ /*보내기 버튼*/
    position: absolute;
    bottom: 3px;
    right: 3px;
  }
`;
export default SendMessage;