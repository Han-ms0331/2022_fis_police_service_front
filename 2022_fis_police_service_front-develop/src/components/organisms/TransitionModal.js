/*
    작성시간: 2022/02/03 3:19 PM
    이름: 이창윤
    작성내용: MUI Modal 사용
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ScheduleModifyInputForm from "./ScheduleModifyInputForm";
import CustomButton from "../atoms/CustomButton";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal({ defaultInput, backgroundColor }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <CustomButton type="normal" color='white' backgroundColor={backgroundColor} content="수정" onClick={handleOpen} />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{zIndex: 2}}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ScheduleModifyInputForm defaultInput={defaultInput} onClickFunction={handleClose} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}