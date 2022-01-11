import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {InputLabel} from "@mui/material";

function CustomInput(props) {
    let element
    if (props.type === "text") {
        element = <div style={{width:props.width}}>
            <TextField name={props.name} hiddenLabel type={props.type}
                       fullWidth
                       multiline
                       rows={4}
                       defaultValue={props.defaultValue} placeholder={props.placeholder}
                       onChange={props.setValueFunction}
                       id="outlined-basic"
                       variant="outlined"/>
        </div>

    } else if (props.type === "number") {
        element = <TextField name={props.name} type={props.type} style={{width: props.width, height: props.height}}
                             defaultValue={props.defaultValue} onChange={props.setValueFunction}/>
    } else if (props.type === "time") {
        element = <TextField name={props.name} type={props.type} style={{width: props.width, height: props.height}}
                             defaultValue={props.defaultValue} onChange={props.setValueFunction}/>
    } else if (props.type === "date") {
        element = <TextField type="date" style={{width: props.width, height: props.height}}
                             defaultValue={props.defaultValue} onChange={props.setValueFunction}/>
    } else if (props.type === "select") {
        // element = <FormControl
        //     style={{width: props.width, height: props.height}}>
        //     <Select
        //             id="demo-simple-select"
        //             value={value}
        //             onChange={props.setValueFunction}
        //     >
        //         {props.contents.map((content) => {
        //             return <MenuItem key={content} value={content}>{content}</MenuItem>;
        //         })}
        //     < /Select>
        // </FormControl>
        element = <FormControl style={{width: props.width, height: props.height}}>
            {/*<InputLabel id="demo-simple-select-label">{props.labelContent}</InputLabel>*/}
            <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                // value={age}
                // label="Age"
                name={props.name}
                defaultValue={"미완료"}
                onChange={props.setValueFunction}
            >
                {props.contents.map((content) => {
                    return <MenuItem key={content}  value={content}>{content}</MenuItem>;
                })}
            </Select>
        </FormControl>

    }

    return (
        <>
            {element}
        </>
    );
}

export default CustomInput;