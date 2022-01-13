import React from 'react';
import {Container} from "@mui/material";

function CenterInfo(props) {
    return (
        <div>
            <Container maxWidth={"sm"} >
                <div style={{border:"2px solid #6D5A00", borderRadius:"15px", padding:"1vw", textAlign:"center"}}>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>시설이름:</div>   <div>test3</div></div>
                    <br/>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>시설주소:</div>   <div>서울시 노원구 동이로 215길 48</div></div>
                    <br/>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", justifyContent:"center"}}><div>전화번호:</div>   <div>02-413-7346</div></div>
                </div>
            </Container>
        </div>
    );
}

export default CenterInfo;