import React from 'react';
import List from "../molecules/List";
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";

function ListContainer(props) {
    const handleClick = (e) => {
        // button이 mainbodytemplate의 선택버튼일 시 시설 정보를 전역상태로 관리...?

        // button이 관리페이지의 정보 수정 버튼일 시...

    }

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
                             buttonContent={props.buttonContent} onClickFunction={handleClick}/>
            })}
        </div>
    );
}

export default ListContainer;
