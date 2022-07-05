import React, {useState} from 'react';
import {DataGrid, koKR} from '@mui/x-data-grid';
import {makeStyles} from '@mui/styles';
import {Style} from "../../Style";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiDataGrid-iconSeparator": {
            width: 0,
            height: 0,
        }, '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        }, '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
        }, '&.MuiDataGrid-root .MuiDataGrid-sortIcon': {
            color: "white"
        }, '.css-ptiqhd-MuiSvgIcon-root': {
            color: "white"
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
    const [pageSize, setPageSize] = React.useState(15);

    return (
        <DataGrid
            classes={{
                root: classes.root,
                columnHeader: classes.header,
                cell: classes.cell,
            }}
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 15, 20]}
            pagination
            loading={loading}
            hideFooterSelectedRowCount={true}
            disableSelectionOnClick={true}
            localeText={koKR.components.MuiDataGrid.defaultProps.localeText}

        />

    );
}