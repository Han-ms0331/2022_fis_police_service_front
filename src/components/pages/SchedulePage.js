import React from 'react';
import Navigation from "../templates/Navigation";
import ScheduleBody from "../templates/ScheduleBody";
import ScheduleSidebar from "../templates/ScheduleSidebar";
import Grid from '@material-ui/core/Grid';
import './SchedulePage.css';

const SchedulePage = (props)=>{
    return (
        <main className="schedulepage">
            <Grid container spacing={1}>
                <Grid item xs={1}>
                <Navigation />
                </Grid>
                <Grid item xs={2}>
                <ScheduleSidebar />
                </Grid>
                <Grid item xs={9}>
            <ScheduleBody/>
                </Grid>

            </Grid>
        </main>
    );
}

export default SchedulePage;