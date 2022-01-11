import React from 'react';
import {Link} from "react-router-dom";
import LoginTemplate from "../templates/LoginTemplate";
import {Container, Grid} from "@mui/material";
import {Box} from "@material-ui/core";

function ThisLoginPage(props) {
    return (
        <div>
            <Container maxWidth={"sm"}>
                <LoginTemplate/>
                    <Link to={"/main"}>로그인</Link>
            </Container>
        </div>
    );
}

export default ThisLoginPage;