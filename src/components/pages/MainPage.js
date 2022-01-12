import React, {useEffect, useState} from 'react';
import Navigation from "../templates/Navigation";
import Grid from "@material-ui/core/Grid";
import {Redirect} from "react-router-dom";
import SearchForm from "../organisms/SearchForm";



function MainPage(props) {
    return (

        // props.isLogined?    //props로 받은 islogined state에 따라 보여주는 창이 달라짐
        //     (
        // <div>
        //     <Grid container spacing={1}>
        //         <Grid item xs={1}>
        //             <Navigation/>
        //         </Grid>
        //
        //         <Grid item xs={8}>
        //             <div style={ {height: "100vh", borderRight: "1px solid #6D5A00"}}>
        //                 main body template
        //             </div>
        //         </Grid>
        //
        //         <Grid item xs={3}>
        //             main info template
        //         </Grid>
        //     </Grid>
        // </div>
        //     )
        //     :
        //     <Redirect to={"/"} />
        <SearchForm />
    );
}

export default MainPage;