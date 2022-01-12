import React, {useEffect, useState} from 'react';
import Navigation from "../templates/Navigation";
import Grid from "@material-ui/core/Grid";
import {Redirect} from "react-router-dom";



function MainPage(props) {
    let isLogined;
    if (localStorage.getItem("loginStatus") === "true")
        isLogined= true;
    else
        isLogined = false;
    return (
        isLogined ?
            (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={1}>
                    <Navigation/>
                </Grid>

                <Grid item xs={8}>
                    <div style={ {height: "100vh", borderRight: "1px solid #6D5A00"}}>
                        main body template
                    </div>
                </Grid>

                <Grid item xs={3}>
                    main info template
                </Grid>
            </Grid>
        </div>
            )
            :
            <Redirect to={"/"} />
    );
}

export default MainPage;