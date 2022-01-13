import React from 'react';
import LoginTemplate from "../templates/LoginTemplate";
import {Container, Grid} from "@mui/material";

function ThisLoginPage(props) {
    return (
        <div>
            <Container maxWidth={"sm"}>
                <LoginTemplate setIsLogined={props.setIsLogined}/>
            </Container>
        </div>
    );
}

export default ThisLoginPage;