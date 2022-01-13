import React from 'react';
import {Container} from "@mui/material";
import CenterInfo from "../molecules/CenterInfo";

function MainInfoTemplate(props) {
    return (
        <div>
            <Container fixed>
                <CenterInfo />
            </Container>
        </div>
    );
}

export default MainInfoTemplate;