import React from 'react';
import CustomButton from "../atoms/CustomButton";
import styled from 'styled-components';
import {Style} from "../../Style";

function List(props) {
    let element
    if (props.type === "listHeader") {
        element = <div style={{
            width: props.width,
            height: props.height,
            display: "grid",
            gridTemplateColumns: props.gridRatio,
            alignItems: "center",
            padding: "5px 0px"
        }}>
            {
                props.contents.map((columnContent) => {
                        return <div key={columnContent}
                                    style={{display: "flex", justifyContent: "center"}}>{columnContent}</div>
                    }
                )
            }
        < /div>
    } else if (props.type === "list") {
        element = <ListElement
            key={props.keyValue}
            style={{
                width: props.width,
                height: props.height,
                gridTemplateColumns: props.gridRatio,
                backgroundColor: Object.values(props.contents).includes("퇴사")?Style.color3: Style.color1,
                opacity: Object.values(props.contents).includes("퇴사")?"0.4": "1"
            }}
            name={props.keyValue} onClick={props.onClickFunction}>
            {
                Object.values(props.contents).map((value, index) => {
                    return index === 0 ? null :
                        <div key={index} name={props.keyValue} onClick={props.onClickFunction}
                             style={{display: "flex", justifyContent: "center"}}>{value}</div>
                })
            }
            <div style={{display: "flex", justifyContent: "center"}} name={props.keyValue} onClick={props.onClickFunction}>

                <CustomButton name={props.keyValue} type="normal" width="auto" height="38px" color={Style.color1}
                              backgroundColor={Style.color2} borderRadius="10px" content={props.buttonContent}
                              onClick={props.onClickFunction}/>
            </div>

        </ListElement>
    }


    return (
        element
    );

}

export default List;


const ListElement = styled.div`
  display: grid;
  padding: 5px 0px;
  margin-bottom: 5px;
  background-color: ${Style.color1};
  align-items: center;
  border-radius: 15px;
  color: ${Style.color2};

  &:hover {
    transform: scale(1.005);
    //transition: .8s;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`