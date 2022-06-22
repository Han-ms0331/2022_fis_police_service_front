import React, {useEffect, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {ChevronRight} from "@material-ui/icons";
import CustomInput from "../atoms/CustomInput";
import {Style} from "../../Style";
import {ClipLoader} from "react-spinners";
import ScheduleCalendarBody from "../organisms/ScheduleCalendarBody";
import axios from "axios";

/*
    날짜: 2022/06/22 1:48 PM
    작성자: 한명수
    작성내용: 월별 현장요원 스케쥴 확인하는 페이지
*/

function ScheduleMonthTemplate(props) {
    const today = new Date();
    const [defaultMonth, setDefaultMonth] = useState("");   //현재 선택된 달을 담는 상태
    const [defaultYear, setDefaultYear] = useState("")      //현재 선택된 연도를 담는 상태
    const [date, setDate] = useState([]);                   //한달 스케쥴이 담기는 배열
    const [isLoading, setIsLoading] = useState(false);      //로딩 관련 상태
    const [searchInfo,setSearchInfo] = useState({           //검색 정보를 담는 상태
        year: "",
        month: "",
        agent_code:""
    })
    const [isSearch, setIsSearch] = useState(false);        //검색이 됐는지 안됐는지 확인하는 상태




    useEffect(()=>{     //처음 랜더링 될 때 현재 날짜 기준 오늘 날짜로 세팅
        const month = (today.getMonth() + 1);
        const year = (today.getFullYear());
        setDefaultMonth(month);
        setDefaultYear(year);
    },[])

    const onSubmit = async () =>{       //검색 버튼이 눌렸을때 작동하는 함수, 데이터를 패칭해오는 함수
        setSearchInfo({     //검색 정보를 현재 선택된 달과 연도로 고정
            ...searchInfo,
            year: defaultYear,
            month: defaultMonth,
        })
        const month = defaultYear + "-" + ("00" + defaultMonth).slice(-2);  //api 스팩에 맞게 날짜 포맷을 변경

        //데이터 패칭
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/agent/${month}?keyword=${searchInfo.agent_code}`, {withCredentials: true})
            .then((res) => {
                setIsLoading(true)
                calendarMaker(res.data.data);       //달력 제작 함수로 데이터를 넘김
            }).then(()=>{
                setIsLoading(false)
                setIsSearch(true);      //검색 상태를 참으로 만든다
            })
    }

    /*
        날짜: 2022/06/20 2:36 PM
        작성자: 한명수
        작성내용: 달력을 출력할 데이터를 만드는 함수(7월은 31일까지, 6월은 30일까지 등) + 받아온 스케쥴을 각 날짜에 맞게 넣어줌
    */
    const calendarMaker = (data) => {
        const firstDay = new Date(defaultYear, defaultMonth-1, 1).getDay();     //각 달의 첫 요일 계산
        const lastDate = new Date(defaultYear, defaultMonth, 0).getDate();      //각 달의 마지막 날짜 계산(30 31 등)
        let buffer =Array(42).fill([])      //텅빈 42칸 배열 생성, 42칸인 이유는 달력은 매주 7일 * 최대 6주까지 생길 수 있기 때문
        let count = 0;  //날짜 카운터

        date.map((o, i) => {        //받아온 데이터와 계산된 날짜를 이용하여 달력을 만듬
            if (i >= firstDay && count < lastDate) {    //해당 달의 첫 요일부터 1 2 3 일로 출력을 시작함
                if (data.length !== 0) {        //현재 날짜에 해당하는 스케줄이 한개이상 있는 경우
                    data.map((schedule) => {
                        const name = schedule.a_code + " " + schedule.a_name        //현장요원 이름을 저장하는 포맷
                        const compDate = defaultYear + "-" + ("00" + defaultMonth).slice(-2) + "-" + ("00" + i).slice(-2)
                        let dateSche;   //현재 인덱스에 해당하는 스케줄을 담기위한 버퍼
                        schedule.scheduleList.map((sche) => {   //현재 날짜와 인덱스를 비교해서 맞는 데이터를 버퍼에 담음
                            if (sche.date === compDate) {
                                dateSche = sche.scheduleList;
                            }
                        })
                        buffer[i] = [       //텅빈 버퍼배열 날짜와 현장요원이름, 스케줄을 저장
                            ...buffer[i],
                            {
                                date: count + 1,    //날짜는 현재 카운터 + 1
                                name: name,
                                scheduleList: dateSche
                            },
                        ];
                    });
                } else
                    buffer[i] = [{date: count + 1}]     //현재 날짜에 해당하는 스캐줄이 없을경우 날짜만 저장하고 지나감
                count++;    //다음 날짜에 작업
            } else
                buffer[i] = [];     //해당하는 달의 날짜가 아닌경우 빈 배열을 저장함
        });
        setDate(buffer);        //스케줄 배열상태에 버퍼를 저장함
    }




    const onClickLeft=()=>{     //달 검색에서 왼쪽 화살표를 누르면 한달 적어짐
        if(defaultMonth !== 1)
        setDefaultMonth(defaultMonth-1)
        else{                                   //1월에서 왼쪽 화살표를 누르면 12월로 넘어가면서 연도가 1년 줄어듬
            setDefaultMonth(12)
            setDefaultYear(defaultYear-1);
        }
    }

    const onClickRight=()=>{        //달 검색에서 오른쪽 화살표를 누르면 다음달로 넘어감
        if(defaultMonth !== 12)
            setDefaultMonth(defaultMonth+1)
        else{                           //12월에서 오른쪽 화살표를 누르면 1월이 되면서 연도가 1년 늘어남
            setDefaultMonth(1)
            setDefaultYear(defaultYear + 1);
        }
    }

    const onChange =(e) =>{         //현장요원 코드 입력하면 검색정보 상태에 저장함
        const {name, value} = e.target
        setSearchInfo({
            ...searchInfo,
            agent_code: value
        })
    }

    return (
        <div style={{width: "95vw", display: "table", marginLeft: "auto", marginRight: "auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: props.width,
                height: props.height,
                margin: "20px 0px"
            }}>
                {isSearch ?     //검색상태에 따라 현재 달을 랜더링하거나 랜더링하지 않음
                    <h1 style={{margin: "0px 20px", fontSize: "70px"}}>{searchInfo.month}월</h1>
                    :
                    null
                }
                <div style={{marginRight: "20px"}}>
                    <TextField id="outlined-basic" label="현장요원 코드" variant="outlined"
                               name="agent_code" style={{width: "250px"}} size="small" onChange={onChange}/>
                </div>
                <div>
                    {defaultYear}년
                </div>
                <IconButton aria-label={"before"} onClick={onClickLeft}>
                    <ChevronLeftIcon/>
                </IconButton>
                <div>
                    {defaultMonth}월
                </div>
                <IconButton aria-label={"next"} onClick={onClickRight}>
                    <ChevronRight/>
                </IconButton>

                <div>
                    <Button variant="contained"
                            name={props.name}
                            type="submit"
                            style={{
                                width: "120px",
                                height: "42px",
                                backgroundColor: `${Style.color2}`,
                                color: `${Style.color1}`,
                                borderRadius: "10px"
                            }}
                            onClick={onSubmit}
                    >{props.loading ? <ClipLoader color='#495ec4'/> : '검색'}</Button>
                </div>
            </div>
            {isSearch ?     //검색 상태에 따라 메시지와 달력을 다르게 출력함
                <ScheduleCalendarBody date={date}/>
                :
                <div>조회를 원하시는 달과 현장요원 코드를 검색해 주세요</div>
            }
        </div>
    );
}

export default ScheduleMonthTemplate;