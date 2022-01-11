import React from 'react';
import Navigation from "../templates/Navigation";
import ScheduleBody from "../templates/ScheduleBody";
import ScheduleSidebar from "../templates/ScheduleSidebar";
import Grid from '@material-ui/core/Grid';
import './SchedulePage.css';

const SchedulePage = (props)=>{
    return (
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
    );
}

export default SchedulePage;