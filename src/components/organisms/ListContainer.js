import React from 'react';
import List from "../molecules/List";
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";

function ListContainer(props) {
    const handleClick = (e) => {

    }

    let contents = [{
        centerId: "test1",
        centerAddress: "서울시 노원구 동일로 215길 48",
        centerPhone: "010-2105-7345",
        participation: "참여",
        visit: "완료"
    }
        , {
            centerId: "test2",
            centerAddress: "서울시 광진구 동일로 215길 48",
            centerPhone: "010-2105-6207",
            participation: "참여",
            visit: "완료"
        }]
    let headerContent = [
        "시설명", "주소", "전화번호", "연락기록", "방문여부"
    ]
    return (

        <div style={{
            width: props.width,
            height: props.height,
        }}>
            <List type="list" type="listHeader" width="100%" height="100%" content={headerContent}
                  gridRatio={props.gridRatio}/>
            {contents.map((content) => {
                return <List key={Object.values(content)[0]} type="list" width="100%" height="100%" content={content}
                             gridRatio={props.gridRatio}
                             onClickFunction={handleClick}/>
            })}
        </div>
    );
}

export default ListContainer;
