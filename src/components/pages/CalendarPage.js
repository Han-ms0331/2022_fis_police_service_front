import React from 'react';
import Navigation from "../templates/Navigation";
import {TabsUnstyled} from "@mui/base";
import UserManageTemplate from "../templates/UserManageTemplate";
import AgentManageTemplate from "../templates/AgentManageTemplate";
import CenterManageTemp from "../templates/CenterManageTemp";
import styled from "styled-components";
import CalendarPageBodyTemplate from "../templates/CalendarPageBodyTemplate";

function CalendarPage(props) {
    return (
        <Main>
            <Navigation/>
            <CalendarPageBodyTemplate />
        </Main>
    );
}

export default CalendarPage;


const Main = styled.div`
  display: grid;
  grid-template-columns: 67px auto;
  height: 100vh;
  border-radius: 10px;
  background-color: white;
`;

