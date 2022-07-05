import React, {useEffect, useState} from 'react';
import CircleButton from "../atoms/CircleButton";
import CustomButton from "../atoms/CustomButton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ScheduleModifyInputForm from "./ScheduleModifyInputForm";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    overflow: 'auto',
    fontWeight:'bold',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 3,
    boxShadow: 24,
    margin: '0 auto',
    p: 4,

};

/*

    날짜: 2022/06/22 2:41 PM
    작성자: 한명수
    작성내용: 달력을 출력하는 부분
*/


function ScheduleCalendarBody(props) {
    const {date} = props;

    const [open, setOpen] = React.useState(false);  //modal창 관련 상태

    const day=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]   //달력 헤더에 표시되는 요일 리스트

    const [number, setNumber] = useState(null);

    console.log(date);

    const onClick = (e) =>{     //자세히보기 클릭시 작동하는 함수
        setNumber(e.target.name);
        console.log(e.target)
        console.log(date[e.target.name]);
        setOpen(true);      //모달창 오픈

    }

    const onClose = (e)=>{      //모달창의 닫기버튼 클릭시 작동하는 함수
        setOpen(false);
    }

    return (
        <div className={"calendar_day"}
             style={{height: "1100px", width: "2380px", margin: "auto" }}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
                {day.map((o) => {       //달력 요일 리스트를 활용하여 헤더 출력, 토요일과 일요일은 색깔이 다름
                        if (o === "일요일")
                            return <div style={{
                                margin: "5px 5px",
                                textAlign: "center",
                                border: "1px solid black",
                                color: "red"
                            }}>{o}</div>;
                        else if (o === "토요일")
                            return <div style={{
                                margin: "5px 5px",
                                textAlign: "center",
                                border: "1px solid black",
                                color: "blue"
                            }}>{o}</div>;
                        else
                            return <div
                                style={{margin: "5px 5px", textAlign: "center", border: "1px solid black"}}>{o}</div>;
                    }
                )}
            </div>
            <div style={{height:"100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", gridTemplateRows:"1fr 1fr 1fr 1fr 1fr 1fr"}}>
                {date.map((o,i) => {    //props 로 전달받은 스케줄이 담긴 배열을 활용하여 달력 출력
                    return <div
                        style={{height: "100%", margin: "5px 5px", textAlign: "center", border: "1px solid black"}}>{
                        o.length === 0 ?    //아무것도 표시되지 않는 날짜는 배열 길이가 0인지 아닌지로 구분
                            null
                            :
                            <div>
                                <div>{o[0].date}</div> {/*달력의 날짜 출력*/}
                                {o.map((sche) => {
                                    let scheduleTable = [[], [], [], []]   //달력에 띄울 원형버튼 리스트 초기화
                                    return (
                                        <div style={{display: "grid", gridTemplateColumns: "4fr 1fr 1fr"}}> {/*현장요원이름 + 그날의 스케줄 표시 컨테이너*/}
                                            <div>{sche.name}</div>
                                            {sche.scheduleList === undefined ?
                                                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr"}}> {/*그날의 스케줄 표시 컨테이너, scheduleList가 없으면 해당 날짜는 모두 초록색*/}
                                                    <CircleButton bgColor={"green"}/>
                                                    <CircleButton bgColor={"green"}/>
                                                    <CircleButton bgColor={"green"}/>
                                                    <CircleButton bgColor={"green"}/>
                                                </div> :
                                                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                                                    {
                                                        sche.scheduleList.map((schedule) => {   //scheduleList에 담긴 스케줄의 시간대에 따라 리스트의 각각 칸에 넣음
                                                                if (schedule.visit_time <= "10:00:00")
                                                                    scheduleTable[0].push(schedule)
                                                                else if (schedule.visit_time <= "11:00:00" && schedule.visit_time > "10:00:00")
                                                                    scheduleTable[1].push(schedule)
                                                                else if (schedule.visit_time <= "12:00:00" && schedule.visit_time > "11:00:00")
                                                                    scheduleTable[2].push(schedule)
                                                                else if (schedule.visit_time > "13:00:00")
                                                                    scheduleTable[3].push(schedule)
                                                            }
                                                        )
                                                    }
                                                    {
                                                        scheduleTable.map((v, index) => {   //원형버튼 리스트에 담겨있는것이 있으면 빨간색, 없으면 초록색으로 활용
                                                            if (v.length === 0) {
                                                                return <CircleButton bgColor={"green"}/>
                                                            } else
                                                                return <CircleButton bgColor={"red"}/>
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    );
                                })
                                }
                                <CustomButton type={"normal"} content={"자세히보기"} onClick={onClick} name={i}/> {/*달력의 자세히 보기 버튼*/}
                                <Modal
                                    open={open}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        {number !== null? date[number].map((sche) => {
                                            return (
                                                <div class="left">
                                                    이름 : {sche.name}<br/>
                                                    {
                                                        sche.scheduleList === undefined ?
                                                            <div>일정 : 일정이 잡혀있지 않습니다.<br/></div>
                                                            :
                                                                sche.scheduleList.map((s) => {
                                                                    return <div>
                                                                        일정 : {(s.visit_time).substr(0,(s.visit_time).length-6)}시 {(s.visit_time).substr(6,(s.visit_time).length-4)}분
                                                                        /
                                                                        걸리는 시간 : {s.estimate_num}분
                                                                    </div>
                                                                })
                                                    }<br/>
                                                </div>
                                            );
                                        })
                                            :
                                            null
                                        }
                                        <CustomButton type={"normal"} content={"닫기"} onClick={onClose} name={i} />
                                    </Box>

                                </Modal>
                            </div>
                    }
                    </div>;
                    }
                )}
            </div>
        </div>
    );
}

export default ScheduleCalendarBody;