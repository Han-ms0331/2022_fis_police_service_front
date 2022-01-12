import React from 'react';
import Navigation from "../templates/Navigation";
import Grid from "@material-ui/core/Grid";
import {Redirect} from "react-router-dom";



function MainPage(props) {
    let isLogined;      //로그인 상태에 따라 랜더링을 결정하는 변수
    if (localStorage.getItem("loginStatus") === "true") //localstorage에서 loginStatus가 true일때 isLogined를 true로 바꿔줌
        isLogined= true;
    else
        isLogined = false;
    return (
        isLogined ?     //isLogined가 false면 redirect를 시킴
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