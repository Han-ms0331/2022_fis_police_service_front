import React, {useState} from 'react';
import CustomButton from "../atoms/CustomButton";
import InputContainer from "../molecules/InputContainer";
import {Style} from "../../Style";
import {Button, TextField} from "@mui/material";
import {ClipLoader} from "react-spinners";


function SearchForm(props) {
    return (
        <form style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: props.width,
            height: props.height
        }} onSubmit={props.onSubmitFunction}>
            <div style={{marginRight: "20px"}}>
                {/*<InputContainer labelContent="이름검색" inputName="centerName" inputType="text" width="200px" rows="1"*/}
                {/*                flexDirection="column" setValueFunction={props.setSearch}/>*/}
                <TextField id="outlined-basic" label="이름" variant="outlined"
                           name="c_name" style={{width: "250px"}} size="small" onChange={props.setSearch}/>


            </div>

            <div style={{marginRight: "20px"}}>
                {/*<InputContainer labelContent="주소검색" inputName="centerAddress" inputType="text" width="350px" height="40px" rows="1"*/}
                {/*                flexDirection="column" setValueFunction={props.setSearch}*/}
                {/*/>*/}
                <TextField id="outlined-basic" label="주소" variant="outlined"
                           name="c_address" style={{width: "350px"}} size="small" onChange={props.setSearch}/>

            </div>

            <div style={{marginRight: "20px"}}>
                {/*<InputContainer labelContent="번호검색" inputName="centerPhone"*/}
                {/*                inputType="text" width="200px" height="40px"rows="1" flexDirection="column"*/}
                {/*                setValueFunction={props.setSearch}*/}
                {/*/>*/}
                <TextField id="outlined-basic" label="번호" variant="outlined"
                           name="c_ph" style={{width: "250px"}} size="small" onChange={props.setSearch}/>

            </div>

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
                >{props.loading ? <ClipLoader color='#495ec4' /> : '검색'}</Button>
            </div>
        </form>


    );
}

export default SearchForm;