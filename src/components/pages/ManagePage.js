import React from 'react';
import Navigation from "../templates/Navigation";
import Grid from "@material-ui/core/Grid";

function ManagePage(props) {
    return (
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
    );
}

export default ManagePage;