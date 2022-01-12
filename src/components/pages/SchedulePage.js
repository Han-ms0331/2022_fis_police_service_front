import React from 'react';
import Navigation from "../templates/Navigation";
import ScheduleBody from "../templates/ScheduleBody";
import ScheduleSidebar from "../templates/ScheduleSidebar";
import Grid from '@material-ui/core/Grid';
import './SchedulePage.css';
import {Redirect} from "react-router-dom";

const SchedulePage = (props)=>{
    let isLogined;      //로그인 상태에 따라 랜더링을 결정하는 변수
    if (localStorage.getItem("loginStatus") === "true") //localstorage에서 loginStatus가 true일때 isLogined를 true로 바꿔줌
        isLogined= true;
    else
        isLogined = false;
    return (
        isLogined ?     //isLogined가 false면 redirect를 시킴

        <main className="schedulepage">
            <Grid container columns={16}>

                <Grid item xs={1}>
                <Navigation />
                </Grid>

                <Grid item xs={3}>
                <ScheduleSidebar />
                </Grid>

                <Grid item xs={12}>
                <ScheduleBody/>
                </Grid>

            </Grid>
        </main>
            :
            <Redirect to={"/"} />
    );
}

export default SchedulePage;