import React from 'react';
import List from "../molecules/List";
import CustomSpinner from "../atoms/CustomSpinner";

function ListContainer(props) {
    return (
        props.contents === "" ? <CustomSpinner/>:
        <div style={{
            width: props.width,
            height: props.height,
            overflowX: "hidden"
        }}>
            <List type="listHeader" contents={props.headerContents}
                  gridRatio={props.gridRatio}/>
            {props.contents.map((content, index) => {
                return (<List key={Object.values(content)[0]} type="list" contents={content}
                             gridRatio={props.gridRatio} height="50px"
                             buttonContent={props.buttonContent} onClickFunction={props.onClickFunction}
                             keyValue={index}/>);
            })}
        </div>
    );
}

export default ListContainer;
