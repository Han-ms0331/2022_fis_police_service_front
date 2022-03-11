import React from 'react';
import {Style} from "../../Style";
import styled from 'styled-components';
import HopeTable from "../organisms/HopeTable";

function HopeBodyTemplate(props) {
    const backgroundColor = Style.color2;
    const backgroundColor2 = Style.color1;
    const backgroundColor3 = Style.color2;
    const fontColor = 'white';

    return (
        <Container>
            <HopeTable />
        </Container>
    );
}

export default HopeBodyTemplate;


const Container = styled.div`
margin: 50px 30px 0 5px;
  height: 100%;
`;
