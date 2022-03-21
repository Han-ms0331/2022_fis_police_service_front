import * as React from 'react';
import {DataGrid, koKR} from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import {Style} from "../../Style";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiDataGrid-iconSeparator": {
            width: 0,
            height: 0,
        },'&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },'&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
        },'&.MuiDataGrid-root .MuiDataGrid-sortIcon': {
            color: "white"
        },'.css-ptiqhd-MuiSvgIcon-root':{
            color:"white"
        }

    },
    header: {
        backgroundColor: Style.color2,
        color: 'white',
        outline: "none"
    },
    cell: {
        backgroundColor: Style.color1,
    },

}));


export default function AppliedCenterTable({columns, rows, loading}) {
    const classes = useStyles();

    return (
        <div style={{width: "100%", height: "auto", minHeight: 400}}>
            <DataGrid
                classes={{
                    root: classes.root,
                    columnHeader: classes.header,
                    cell: classes.cell,
                }}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                loading={loading}
                hideFooterSelectedRowCount={true}
                disableSelectionOnClick={true}
                localeText={koKR.components.MuiDataGrid.defaultProps.localeText}

            />
        </div>

    );
}