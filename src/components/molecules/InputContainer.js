import React from 'react';
import CustomLabel from "../atoms/CustomLabel";
import CustomInput from "../atoms/CustomInput";

function InputContainer(props) {
    return (
        <div style={{display:"flex"}}>
            <CustomLabel content={props.labelContent}/>
            <CustomInput name={props.inputName} type={props.inputType} width={props.width} height={props.width}
                         contents={props.contents} setValueFunction={props.setValueFunction}
            />
        </div>);
}

export default InputContainer;