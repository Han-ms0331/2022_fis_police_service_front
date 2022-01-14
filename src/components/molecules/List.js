import React from 'react';
import CustomButton from "../atoms/CustomButton";

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
        element = <div style={{
            width: props.width,
            height: props.height,
            border: "1px solid #6D5A00",
            borderRadius: "15px",
            display: "grid",
            gridTemplateColumns: props.gridRatio,
            alignItems: "center",
            marginBottom: "15px",
            padding: "5px 0px"
        }}>
            {
                Object.values(props.contents).map((value) => {
                    return <div key={value} style={{display: "flex", justifyContent: "center"}}>{value}</div>
                })
            }
            <div style={{display: "flex", justifyContent: "center"}}>
                <CustomButton type="reverse" width="5vw" height="40px" color="black" border="1px solid #FFD400"
                              backgroundColor="white" borderRadius="10px" content={props.buttonContent}
                              onClick={props.onClickFunction}/>
            </div>

        </div>
    }

    return (
        element
    );
}

export default List;

