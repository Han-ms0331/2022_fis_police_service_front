import React, {useEffect, useState} from 'react';
import AppliedCenterTable from "../organisms/AppliedCenterTable";
import {Style} from "../../Style";
import ScheduleTable from "../organisms/ScheduleTable";
import styled from "styled-components";
import ScheduleBody from "./ScheduleBody";
import {useRecoilState, useSetRecoilState} from "recoil";
import {isLoginedState} from "../../store/LoginStore";
import axios from "axios";
import Button from "@mui/material/Button";
import CustomButton from "../atoms/CustomButton";
import Swal from "sweetalert2";

function CenterRequestTemplate(props) {
    const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
    const [loading, setLoading] = useState()
    const [contents, setContents] = useState([]);

    const requestHope = (hope_id) => {
        Swal.fire({
            icon: "question",
            title: '통화 완료 체크를 하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                await axios.post(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/hope/${hope_id}`, {}, {withCredentials: true})
                    .then((res) => {
                        Swal.fire({
                            icon: 'success',
                            title: '완료되었습니다.',
                            confirmButtonColor: Style.color2,
                            confirmButtonText: '확인',
                        })
                        showData();
                    }).catch((err) => {
                        console.log(err);
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    const columns = [
        {
            field: 'id', headerName: 'No.', flex: 0.1,
        },
        {
            field: 'c_name',
            headerName: '센터이름',
            flex: 0.2,
        },
        {
            field: 'c_address',
            headerName: '센터주소',
            flex: 0.6,
        },
        {
            field: 'c_ph',
            headerName: '센터번호',
            flex: 0.3,
        }, {
            field: 'accept',
            headerName: '참여 희망/비희망',
            flex: 0.2,
        },
        {
            field: 'o_name',
            headerName: '관리자 이름',
            flex: 0.2,
        },
        {
            field: 'o_ph',
            headerName: '관리자 전화번호',
            flex: 0.3,
        }, {
            field: 'h_date',
            headerName: '희망날짜',
            flex: 0.2,
        }, {
            field: "hope",
            headerName: '시설과 통화완료 체크',
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <strong>
                        {params.value.complete === "complete" ? <div style={{width:"90px", heihgt: "35px", textAlign:"center"}}>통화완료됨</div> :
                            <CustomButton type="normal" width="90px" height="35px" borderRadius="15px"
                                          color={Style.color1}
                                          backgroundColor={Style.color2} content="통화완료" onClick={() => {
                                requestHope(params.value.hope_id)
                            }}/>}
                    </strong>
                )
            },
            disableClickEventBubbling: true,

        }
    ];


    const showData = async () => {
        setLoading(true)
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/hope`, {withCredentials: true})
            .then((res) => {
                let tmp = [];
                console.log(res.data)
                res.data.data.map((data, index) => {
                    tmp.push({
                        c_name: data.center.c_name,
                        c_address: data.center.c_address,
                        c_ph: data.center.c_ph,
                        o_name: data.official.o_name,
                        o_ph: data.official.o_ph,
                        h_date: data.h_date,
                        accept: data.accept === "accept" ? "희망" : "비희망",
                        id: index + 1,
                        hope: {
                            hope_id: data.hope_id,
                            complete: data.complete
                        }
                    })
                })
                setContents(tmp);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                setIsLogined(false);

            })
    }
    useEffect(() => {
        showData();
    }, [])

    return (
        <Container>
            <AppliedCenterTable loading={loading} columns={columns} rows={contents} headerBG={Style.color2}/>
        </Container>
    );
}

export default CenterRequestTemplate;

const Container = styled.div`
  margin: 30px;
  width: 90vw;
  height: 90%;
  display: flex;
  justify-content: center;
`;

// const [isLogin,setIsLogined] = useSetRecoilState(isLoginedState)
//
// const showData = async () => {
//     await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/hope`, {withCredentials: true})
//         .then((res) => {
//
//         })
//         .catch((err) => {
//
//         })
// }
//
// useEffect(()=>{
//     showData();
// },[])