import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function CustomInput(props) {

    let element
    if (props.type === "text") {
        element = <TextField sx={{width: props.width}}
                             name={props.name} hiddenLabel type={props.type}
                             fullWidth
                             multiline
                             size="small"
                             rows={props.rows}
                             defaultValue={props.defaultValue} placeholder={props.placeholder}
                             onChange={props.setValueFunction}
                             id="outlined-basic"
                             variant="outlined"/>

    } else if (props.type === "number") {
        element = <TextField name={props.name} type={props.type} sx={{width: props.width}} size="small"
                             defaultValue={props.defaultValue} onChange={props.setValueFunction}/>
    } else if (props.type === "time") {
        element = <TextField name={props.name} type={props.type} style={{width: props.width}} size="small"
                             defaultValue={props.defaultValue} onChange={props.setValueFunction}/>
    } else if (props.type === "date") {
        element = <TextField name={props.name} type="date" style={{width: props.width}} size="small"
                             defaultValue={props.defaultValue} onChange={props.setValueFunction}/>
    } else if (props.type === "select") {

        element = <FormControl style={{width: props.width}} size="small">
            {/*<InputLabel id="demo-simple-select-label">{props.labelContent}</InputLabel>*/}
            <Select
                name={props.name}
                value={props.value}
                defaultValue={props.defaultValue}
                onChange={props.setValueFunction}
            >
                {props.contents.map((content) => {
                    return <MenuItem key={content.show} value={content.value}>{content.show}</MenuItem>;
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

