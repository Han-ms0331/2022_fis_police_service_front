import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";
import React from "react";
import styled from "styled-components";

export const Message = (props) => {
    return (
        <>
            <Header>{props.header}</Header>
            <Content>
                <p>{props.agent}(<CallEndOutlinedIcon/>):</p>
                <p>{props.content}</p>
                <div>
                    <CustomButton type="normal" backgroundColor={Style.color2} border="1.5px solid #eee"
                                  borderRadius="7px" content="수정완료" color="#fff" fontSize="14px" padding="0px"
                                  margin="7px 0" onClick={props.handleDone}>수정완료</CustomButton>
                </div>
            </Content>
        </>
    );
}

const Header = styled.div`
  font-size: 16px;
  //background: #f7e98b;
  background: #eee;
  padding: 3px 7px;
`;

const Content = styled.div`
  //background: #fff9d6;
  background: #f7f7f7;
  padding: 7px;
  margin-bottom: 10px;

  & > p {
    margin: 0;
    font-size: 17px;
    text-align: unset;
  }

  & > div {
    text-align: center;

    & > button {
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  & svg {
    font-size: 17px;
  }
`;
