import React from 'react';
import CustomLabel from "../atoms/CustomLabel";
import CustomInput from "../atoms/CustomInput";

function InputContainer(props) {
    return (
        <div style={{display: "flex", alignItems: "flex-start"}}>
            <CustomLabel content={props.labelContent} fontSize={props.fontSize} width={"auto"}/>
            <CustomInput name={props.inputName} type={props.inputType} width={props.width}
                         rows={props.rows}
                         contents={props.contents} setValueFunction={props.setValueFunction}
                         defaultValue={props.defaultValue} value={props.value}
            />
        </div>);
}

export default InputContainer;