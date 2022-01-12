import React from 'react';

function CustomLabel(props) {
    return (
        <>
            <div style={{width: "100px", height: "50px", textAlign: "right", marginRight: "10px", display: props.disabled}}>{props.content}</div>
        </>
    );
}

export default CustomLabel;