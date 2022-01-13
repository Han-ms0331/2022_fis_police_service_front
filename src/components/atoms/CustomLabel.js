import React from 'react';

function CustomLabel(props) {
    return (
        <>
            <div style={{
                width: "100px",
                padding: "5px 0px"
           }}>{props.content}</div>
        </>
    );
}

export default CustomLabel;