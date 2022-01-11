import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CheckboxContainer(props) {
    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox  />} label={props.content} />
        </FormGroup>
    );
}

export default CheckboxContainer;