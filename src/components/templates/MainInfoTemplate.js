import React from 'react';
import {Container} from "@mui/material";
import CenterInfo from "../organisms/CenterInfo";
import InfoContainer from "../organisms/InfoContainer";

function MainInfoTemplate(props) {
    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", height:"100vh"}}>
            <Container fixed>
                <CenterInfo />
            </Container>
            <Container fixed>
                <InfoContainer />
            </Container>
            <Container fixed>
                <CenterInfo />
            </Container>
        </div>
    );
}

export default MainInfoTemplate;