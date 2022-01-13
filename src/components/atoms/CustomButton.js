import React from 'react';
import {Button} from "@mui/material";
// import {Button} from "@material-ui/core";


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
                    style={{
                        width: props.width,
                        height: props.height,
                        color: props.color,
                        borderRadius: props.borderRadius,
                        backgroundColor: props.backgroundColor,
                        border: props.border,
                        fontSize:props.fontSize

                    }}
                    onClick={props.onClick}
            >{props.content}</Button>
        )
    } else if (props.type === 'reverse')
        return (//width height color borderRadius backgroundColor content + border 값을 추가로 필요로 함
            <Button variant="outlined"
                    style={{
                        width: props.width,
                        height: props.height,
                        color: props.color,
                        border: props.border,
                        borderRadius: props.borderRadius,
                        backgroundColor: props.backgroundColor,
                        fontSize:props.fontSize
                    }}
                    onClick={props.onClick}
            >{props.content}</Button>);
}

export default CustomButton;