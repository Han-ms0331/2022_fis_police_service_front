import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import BigCustomCalendar from "../organisms/BigCustomCalendar";
import {Button, TextField} from "@mui/material";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";
import axios from "axios";

function CalendarPageBodyTemplate(props) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const [monthState, setMonthState] = useState(`${year}-${month}`)
    const [agentName, setAgentName] = useState()

    const handleMonthChange = (e) => {
        setMonthState(e.target.value)
        console.log(e.target.value)
    }

    const handleNameChange = (e) => {
        setAgentName(e.target.value)
    }
    const handleClickSearchButton = (e) => {
        e.preventDefault();
        onData();
    }

    const onData = async () => {
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/agent/${monthState}?keyword=${agentName}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        onData();
    }, [])

    return (
        <Main>
            <Top onSubmit={handleClickSearchButton}>
                <TextField type="month" value={monthState} onChange={handleMonthChange} size={"small"}/>
                <TextField type={"text"} value={agentName} onChange={handleNameChange}
                           sx={{width: "300px", margin: "0px 20px"}} size={"small"}/>
                <Button variant="contained" component="label" style={styles.button}
                        onClick={handleClickSearchButton}>검색</Button>

            </Top>

            <BigCustomCalendar/>
        </Main>
    );
}

export default CalendarPageBodyTemplate;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Top = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const styles = {
    button: {
        width: "130px",
        height: "42px",
        backgroundColor: `${Style.color2}`,
        color: `${Style.color1}`,
        borderRadius: "10px"
    }
}