import React from 'react';
import styled from 'styled-components';
import Navigation from "../templates/Navigation";
import {Redirect} from "react-router-dom";

function ManagePage(props) {
    return (
        props.isLogined?    //props로 받은 islogined state에 따라 보여주는 창이 달라짐
            (
        <Main>
                    <Navigation/>
                    manage
        </Main>
    )   :
            <Redirect to={"/"} />
    )
}
const Main = styled.div`
    display: grid;
  grid-template-columns: 3% 97%;
  height: 100vh;
`;
export default ManagePage;