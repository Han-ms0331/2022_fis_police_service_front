import React from 'react';
import CustomLabel from "../atoms/CustomLabel";
import CustomInput from "../atoms/CustomInput";

function InputContainer(props) {
    return (
        <div style={{display: "flex",  flexDirection:props.flexDirection, alignItems:"flex-start"}} >
            <CustomLabel content={props.labelContent} fontSize={props.fontSize} />
            <CustomInput name={props.inputName} type={props.inputType} width={props.width} height={props.height} rows={props.rows}
                         contents={props.contents} setValueFunction={props.setValueFunction}
            />
        </div>);
}

export default InputContainer;