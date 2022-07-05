import React from 'react';
import {Style} from "../../Style";

function CustomLabel(props) {
    return (
        <>
            <div style={{
                width: "125px",
                padding: "5px 0px",
                fontSize:props.fontSize,
                fontFamily: Style.font,
            }}>{props.content}</div>
        </>
    );
}

export default CustomLabel;