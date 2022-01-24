import React from 'react';

function CustomLabel(props) {
    return (
        <>
            <div style={{
                width: "120px",
                padding: "5px 0px",
                fontSize:props.fontSize
            }}>{props.content}</div>
        </>
    );
}

export default CustomLabel;