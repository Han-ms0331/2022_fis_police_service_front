import React from 'react';
import Navigation from "../templates/Navigation";
import ScheduleBody from "../templates/ScheduleBody";
import ScheduleSidebar from "../templates/ScheduleSidebar";
import Grid from '@material-ui/core/Grid';
import './SchedulePage.css';
import {Redirect} from "react-router-dom";

const SchedulePage = (props)=>{
    return (
        props.isLogined?    //props로 받은 islogined state에 따라 보여주는 창이 달라짐

        <main className="schedulepage">
            <Grid container columns={16}>

                <Grid item xs={1}>
                <Navigation />
                </Grid>

                <Grid item xs={3}>
                <ScheduleSidebar />
                </Grid>

                <Grid item xs={8}>
                <ScheduleBody/>
                </Grid>

            </Grid>
        </main>
            :
            <Redirect to={"/"} />
    );
}

export default SchedulePage;