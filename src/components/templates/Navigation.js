import React from 'react';
import {Link} from "react-router-dom";

function Navigation(props) {
    return (
        <div>
            <Link to={"/main"}>시설관리</Link>
            <Link to={"/schedule"}>일정관리</Link>
            <Link to={"/manage"}>관리자</Link>
            <Link to={"/"}>로그아웃</Link>
        </div>
    );
}

export default Navigation;