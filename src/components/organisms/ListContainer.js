import React from 'react';
import List from "../molecules/List";
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";

function ListContainer(props) {


    return (
        <div style={{
            width: props.width,
            height: props.height,
        }}>
            <List type="list" type="listHeader" width="100%" height="100%" contents={props.headerContents}
                  gridRatio={props.gridRatio}/>
            {props.contents.map((content) => {
                return <List key={Object.values(content)[0]} type="list" width="100%" height="100%" contents={content}
                             gridRatio={props.gridRatio}
                             buttonContent={props.buttonContent} onClickFunction={props.clickFunction}/>
            })}
        </div>
    );
}

export default ListContainer;
