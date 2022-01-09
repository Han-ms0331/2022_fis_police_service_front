import React from 'react';
import {Link} from "react-router-dom";

function ThisLoginPage(props) {
    return (
        <div>
            <Link to={"/main"}>로그인</Link>
            <span>This is Login Page</span>
        </div>
    );
}

export default ThisLoginPage;