import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import '../atoms/style.css';
import axios from "axios";
import {Style} from "../../Style";
import list from "../molecules/List";
import CustomSpinner from "../atoms/CustomSpinner";
import CustomButton from "../atoms/CustomButton";



const StyleDiv = styled.div`
    padding:5px;
    background:white;
    border-radius:13px;
    border:2px solid #2E3C7E;
    
    overflow-y:auto;
    
    width:930px;
    height:325px;
    
    position:fixed;
    top:120px;
    left: 400px; 
    
   
`;

const ListElement = styled.div`
  display: grid;
  padding: 5px 0px;
  margin-bottom: 5px;
  background-color: ${Style.color1};
  align-items: center;
  border-radius: 15px;
  color: ${Style.color2};

  &:hover {
    transform: scale(1.005);
    //transition: .8s;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

const List = (props) =>{
    let element
    if (props.type === "listHeader") {
        element = <div style={{
            width: props.width,
            height: props.height,
            display: "grid",
            gridTemplateColumns: props.gridRatio,
            alignItems: "center",
            padding: "5px 0px"
        }}>
            {
                props.contents.map((columnContent) => {
                        return <div key={columnContent}
                                    style={{display: "flex", justifyContent: "center"}}>{columnContent}</div>
                    }
                )
            }
        < /div>
    } else if (props.type === "list") {
        element = <ListElement
            key={props.keyValue}
            style={{
                width: props.width,
                height: props.height,
                gridTemplateColumns: props.gridRatio,
                backgroundColor: Object.values(props.contents).includes("퇴사")?Style.color3: Style.color1,
                opacity: Object.values(props.contents).includes("퇴사")?"0.4": "1"
            }}
            name={props.keyValue} onClick={props.onClickFunction}>
            {
                Object.values(props.contents).map((value, index) => {
                    return index === 0 ? null :
                        // '확정'이면 초록, '거부'면 빨강, '참여면' 하늘, '보류'면 노랑, 그 외는 border color x
                        value === '확정' ? <div key={index} name={props.keyValue} onClick={props.onClickFunction}
                                              style={{display: "flex", justifyContent: "center", paddingTop: 5,
                                                  paddingBottom: 5, border: "3px solid #04B45F", borderRadius: 5}}>{value}</div>
                            : value === '거부' ? <div key={index} name={props.keyValue} onClick={props.onClickFunction}
                                                    style={{display: "flex", justifyContent: "center", paddingTop: 5,
                                                        paddingBottom: 5, border: "3px solid #FE2E2E", borderRadius: 5}}>{value}</div>
                                : value === '참여' ? <div key={index} name={props.keyValue} onClick={props.onClickFunction}
                                                        style={{display: "flex", justifyContent: "center", paddingTop: 5,
                                                            paddingBottom: 5, border: "3px solid #58ACFA", borderRadius: 5}}>{value}</div>
                                    : value === '보류' ? <div key={index} name={props.keyValue} onClick={props.onClickFunction}
                                                            style={{display: "flex", justifyContent: "center", paddingTop: 5,
                                                                paddingBottom: 5, border: "3px solid #F7FE2E", borderRadius: 5}}>{value}</div>
                                        : <div key={index} name={props.keyValue} onClick={props.onClickFunction}
                                               style={{display: "flex", justifyContent: "center"}}>{value}</div>
                })
            }


        </ListElement>
    }


    return (
        element
    );

}

const ListContainer = (props) => {
    return (
        props.contents === "" ? <CustomSpinner/>:
            <div style={{
                width: props.width,
                height: props.height,
                overflowX: "hidden"
            }}>
                <List type="listHeader" contents={props.headerContents}
                      gridRatio={props.gridRatio}/>
                {props.contents.map((content, index) => {
                    return (<List key={Object.values(content)[0]} type="list" contents={content}
                                  gridRatio={props.gridRatio} height="50px"
                                  buttonContent={props.buttonContent} onClickFunction={props.onClickFunction}
                                  keyValue={index}/>);
                })}
            </div>
    );
}



const handleScroll = e => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

};

const handleClick = {handleScroll};

//<strong><StyleTxt>날짜별 콜직원 통화 건수</StyleTxt></strong>
function DailyCallTemplate2(props){

    const headerTxt = ["이름", "아이디", "권한", "오늘 통화 건수", "거부 통화 건수", "참여 통화 건수", "없음 통화 건수", "보류 통화 건수"];
    const [date,setDate] = useState({u_name: "", user_id: "", participation_num: "", reject_num: "", hold_num: "", today_call_num: ""});

    return(
        <>

            <StyleDiv >
                <ListContainer width="1500px" headerContents={headerTxt} contents={props.table}
                               width={"100%"}
                               gridRatio="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" borderRadius="5px"
                               handleClick={handleClick}
                />
            </StyleDiv>

            <Located_3>
                <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                              backgroundColor={Style.color2} content="맨 위로" handleClick={handleClick}/>
            </Located_3>
        </>
    );
}

const Located_3 = styled.div`
    &> button {
        position: relative;
        left: 350%;
        transform: translate(-50%, 180%);
    }
`;

export default DailyCallTemplate2;