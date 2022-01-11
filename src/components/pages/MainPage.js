import React from 'react';
import Navigation from "../templates/Navigation";
import Grid from "@material-ui/core/Grid";
import ScheduleSidebar from "../templates/ScheduleSidebar";
import ScheduleBody from "../templates/ScheduleBody";
import {Container} from "@mui/material";

function MainPage(props) {
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={1}>
                    <Container maxWidth={"sm"}>
                        <Navigation/>
                    </Container>
                </Grid>
                <Grid item xs={8}>
                    <div style={{height: "100vh", borderRight: "1px solid #6D5A00"}}>
                        main body template
                    </div>
                </Grid>

                <Grid item xs={3}>
                    main info template
                </Grid>
            </Grid>
        </div>
    );
}

export default MainPage;