import React from 'react';
import {Button} from "@mui/material";

/*
    날짜 : 2022/01/10 11:12 AM
    작성자 : 지상은
    작성내용 : "CustomButton 함수"
             onClick 어케 함
*/


function CustomButton(props) {
//type(normal/reverse)을 props로 받아서 조건부 랜더링
    if (props.type === 'normal') {
        return (//width height color borderRadius backgroundColor content 를 필요로 함
            <Button variant="contained"
                    name={props.name}
                    type={props.submitType}
                    style={{
                        width: props.width,
                        height: props.height,
                        color: props.color,
                        borderRadius: props.borderRadius,
                        backgroundColor: props.backgroundColor,
                        border: props.border,
                        fontSize:props.fontSize,
                        boxSizing:"border-box",
                        padding:props.padding,
                        margin:props.margin,
                    }}
                    disabled={props.disabled}
                    onClick={props.onClick}
            >{props.content}
                </Button>
        )
    } else if (props.type === 'reverse')
        return (//width height color borderRadius backgroundColor content + border 값을 추가로 필요로 함
            <Button variant="outlined"
                    name={props.name}
                    style={{
                        width: props.width,
                        height: props.height,
                        color: props.color,
                        border: props.border,
                        borderRadius: props.borderRadius,
                        backgroundColor: props.backgroundColor,
                        fontSize:props.fontSize,
                        boxSizing:"border-box",
                        padding:props.padding,
                        margin:props.margin,
                        fontWeight: props.fontWeight,
                    }}
                    disabled={props.disabled}
                    onClick={props.onClick}
            >
                <div>
                    {props.content}
                </div>
            </Button>);
}

export default CustomButton;