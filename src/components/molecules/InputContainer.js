import React from 'react';
import CustomLabel from "../atoms/CustomLabel";
import CustomInput from "../atoms/CustomInput";

function InputContainer(props) {
    return (
        <div style={{display: "flex", alignItems: "center", marginBottom: "20px"}} >
            <CustomLabel content={props.labelContent} disabled={props.disabled}/>
            <CustomInput name={props.inputName} type={props.inputType} width={props.width} rows={props.rows}
                         contents={props.contents} setValueFunction={props.setValueFunction} disabled={props.disabled}
            />
        </div>);
}

export default InputContainer;