import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
})

export default function AppliedCenterTable({columns, rows, loading}) {
    const classes = useStyles();

    return (
        <div style={{width: "100%", height: "auto", minHeight: 400}}>
            <DataGrid
                className={classes.root}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                loading={loading}
                hideFooterSelectedRowCount={true}
                disableSelectionOnClick={true}
            />
        </div>

    );
}