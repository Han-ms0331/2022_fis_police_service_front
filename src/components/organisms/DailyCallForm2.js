import React, {useEffect, useState} from 'react'
import '../atoms/style.css'
import DailyCallTemplate2 from "../templates/DailyCallTemplate2";
import CustomCalendar from "../atoms/CustomCalendar";
import styled from 'styled-components'
import DailyCallTemplateCheck from "../templates/DailyCallTemplateCheck";
import {Style} from "../../Style";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";


const Modal = ({modalClose}) => {

    const [date,setDate] = useState("");
    const [table, setTable] = useState("");
    let visit_date;


    const onData = async () => {
    const url = `http://${process.env.REACT_APP_IP_ADDRESS}:8080/call?date=${visit_date}`;
        await axios.get(url, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
                setTable(res.data)
            })

    }


    useEffect(()=>{
        if(date !== ""){
            visit_date = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
        }
        onData();
    },[date])


    const onCloseModal = (e) => {
        console.log('e.target: ', e.target)
        console.log('e.tarcurrentTargetget: ', e.currentTarget)
        if(e.target === e.currentTarget){
            modalClose()
        }

    }

    const Located_1 = styled.div`
        padding:5px;
        position:fixed;
        top:125px;
        left:50px; 
    `;

    const HeadTxt = styled.div`
        width:100%;
        position:fixed;
        top:0;
        
        
        text-align:center;
        
        background-color:#2E3C7E;
        color:white;
        
        border-radius:10px 10px 0px 0px;
    `




    return (
        date ?
            <div className="modal__container" onClick={onCloseModal}>
                <div className="modal">
                    <HeadTxt><h2>콜직원 통화 건수 목록</h2></HeadTxt>
                    <Located_1>
                        <CustomCalendar setDate={setDate}/>
                        <DailyCallTemplate2 table={table}/>
                    </Located_1>

                    <Located_2>
                        <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                                      backgroundColor={Style.color2} content="닫기" onClick={modalClose}/>
                    </Located_2>

                </div>
            </div>
            :
            <div className="modal__container" onClick={onCloseModal}>
                <div className="modal">
                    <HeadTxt><h2>콜직원 통화 건수 목록</h2></HeadTxt>

                    <Located_1>
                        <CustomCalendar setDate={setDate}/>
                        <DailyCallTemplateCheck/>
                    </Located_1>

                    <Located_2>
                        <CustomButton type="normal" width="150px" height="45px" borderRadius="15px" color={Style.color1}
                                      backgroundColor={Style.color2} content="닫기" onClick={modalClose}/>
                    </Located_2>
                </div>
            </div>
    );





}

const Located_2 = styled.div`
    &> button {
        position: relative;
        left: 860%;
        top:93%;
        transform: translate(-50%, -50%);
    }
`;

export default Modal;