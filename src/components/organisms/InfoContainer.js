import React from 'react';
import CallInfoList from "../molecules/CallInfoList";
import ApplyInfoList from "../molecules/ApplyInfoList";

/*
    날짜: 2022/01/14 10:54 오전
    작성자: 한명수
    작성내용:   style
*/
/*
    날짜: 2022/01/14 10:49 오전
    작성자: 한명수
    작성내용:   InfoContainer 작성,
*/
function InfoContainer(props) {
    const {type} = props    //props로 넘어온 type에따라 다른 랜더링
    if (type === "call") {
        return (
            <div style={style}>
                {props.content.map(o => <CallInfoList u_name={props.u_name} content={o}/>)}
            </div>
        );

    }
else if (type=== "apply")
    {
        return (
            <div style={style}>
                {props.content.map(o => <ApplyInfoList u_name={props.u_name} content={o}/>)}
            </div>
        );
    }
}
const style={
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    border: "2px solid #6D5A00",
    borderRadius: "15px",
    padding: "1vw",
    textAlign: "center",
    height: "25vh",
    overflow: "auto",

}
export default InfoContainer;