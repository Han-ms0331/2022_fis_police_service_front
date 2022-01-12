import React from 'react';

function CustomLabel(props) {
    return (
        <>
            <div style={{
                width: "100px",
                height: "50px",
                lineHeight: "50px",
                textAlign: "right",
                marginRight: "10px",
            }}>{props.content}</div>
        </>
    );
}

export default CustomLabel;