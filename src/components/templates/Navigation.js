import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, IconButton} from "@material-ui/core";
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

function Navigation(props) {
    const [currentPage, setCurrentPage] = useState();
    return (
        <div style={{ width:"7vw",display: "grid", gridTemplateRows: "50vh 50vh", gridTemplateColumns: "6vw", borderRight:"1px solid #6D5A00"}}>
            <div className={"upper_container"}>
                <div>
                    <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/main"}>
                        <div>
                            <IconButton style={{color: "#FFD400"}}>
                                <HomeIcon fontSize={"large"}/>
                            </IconButton>
                            <div style={{textAlign: "center"}}>시설관리</div>
                        </div>
                    </Link>
                </div>
                <br/>
                <div>
                    <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/schedule"}>
                        <div>
                            <IconButton style={{color: "#FFD400"}}>
                                <EventAvailableIcon fontSize={"large"}/>
                            </IconButton>
                            <div style={{textAlign: "center"}}>일정관리</div>
                        </div>
                    </Link>
                </div>
                <br/>
                <div>
                    <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/manage"}>
                        <div>
                            <IconButton style={{color: "#FFD400"}}>
                                <PersonIcon fontSize={"large"}/>
                            </IconButton>
                            <div style={{textAlign: "center"}}>관리자</div>
                        </div>
                    </Link>
                </div>
                <br/>
            </div>
            <div className={"lowerContainer"}
                 style={{display: "grid", girdTemplateRows: "1fr", alignItems: "end", paddingBottom: "5vh"}}>
                <div>
                    <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/"}>
                        <div>
                            <IconButton style={{color: "#FFD400"}}>
                                <LogoutIcon fontSize={"large"}/>
                            </IconButton>
                            <div style={{textAlign: "center"}}>로그아웃</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navigation;