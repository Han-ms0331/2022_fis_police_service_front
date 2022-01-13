import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import LoginTemplate from "../templates/LoginTemplate";
import {Container, Grid} from "@mui/material";

function ThisLoginPage(props) {
    return (
        <Main>
            <Container maxWidth={"sm"}>
                <LoginTemplate setIsLogined={props.setIsLogined}/>
            </Container>
        </Main>
    );
}
const Main = styled.div`
  min-width: 100vw;
`;
export default ThisLoginPage;