import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Typography} from "@mui/material";

function CheckboxContainer(props) {

    return (
        <FormGroup>
            <FormControlLabel sx={{width: 100}}name={props.name}  control={<Checkbox onClick={props.clickFunction} />} label={<Typography style={{fontSize: 15, color:"gray"}}>{props.content}</Typography>}  />
        </FormGroup>
    );
}

export default CheckboxContainer;