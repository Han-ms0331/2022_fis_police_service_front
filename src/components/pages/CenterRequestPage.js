import React, {useState} from 'react';
import Navigation from "../templates/Navigation";
import styled from "styled-components";
import CenterRequestTemplate from "../templates/CenterRequestTemplate";

function CenterRequestPage(props) {
    return (
        <Main>
            <Navigation/>
            <CenterRequestTemplate />
        </Main>    );
}

export default CenterRequestPage;



const Main = styled.div`
  display: grid;
  grid-template-columns: 67px 1600px auto;
  height: 100vh;
`;
