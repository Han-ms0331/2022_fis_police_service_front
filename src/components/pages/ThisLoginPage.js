import React from 'react';
import styled from "styled-components";
import LoginTemplate from "../templates/LoginTemplate";
import {Container} from "@mui/material";

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