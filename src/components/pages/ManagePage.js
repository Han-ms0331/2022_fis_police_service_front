import React from 'react';
import Navigation from "../templates/Navigation";
import Grid from "@material-ui/core/Grid";
import {Redirect} from "react-router-dom";

function ManagePage(props) {
    let isLogined;
    if (localStorage.getItem("loginStatus") === "true")
        isLogined= true;
    else
        isLogined = false;
    return (
        isLogined?    //props로 받은 islogined state에 따라 보여주는 창이 달라짐
            (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={1}>
                    <Navigation/>
                </Grid>
                <Grid item xs={11}>
                    manage
                </Grid>
            </Grid>
        </div>
    )
            :
            <Redirect to={"/"} />
    )
}

export default ManagePage;