import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navigation from "../templates/Navigation";
import {Redirect} from "react-router-dom";


function MainPage(props) {
    return (
        props.isLogined?    //props로 받은 islogined state에 따라 보여주는 창이 달라짐
            (
        <Main>
                    <Navigation/>
            <div style={ {height: "100vh", borderRight: "1px solid #6D5A00"}}>
                        main body template
                    </div>
                <div>
                    main info template
                </div>
        </Main>
            )
            :
            <Redirect to={"/"} />
    );
}
const Main = styled.div`
  display: grid;
  grid-template-columns: 3% 60% 37%;
  height: 100vh;
`;
export default MainPage;