/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import Popup from "shared_resources/components/popup/popup";

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    padding: 0,
    margin: 0
    
    
  },
  button: {
    textTransform: 'capitalize',
    backgroundColor: '#FFFFFF',    
},
  cell: {
    fontSize: 14,
  },
  chip: {
    main: '#535BD6',
    color: '#FFFFFF',
    backgroundColor: '#535BD6',
    fontWeight: 'bold'
  }
}));

  function Row({ setPopupState, popupState, setCurrentRow, key, row }) {

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handlePopup = (row) => {
      if(popupState === "init"){
        setPopupState(true);
      }
      else if (popupState === true) setPopupState(false);
      else if (popupState === false) setPopupState(true);
      else;
      setCurrentRow(row);
      
    }
  
    return (
      <>
        <TableRow
                hover
                key={key}
                component={Link}
                style={{ textDecoration: 'none' }}
              >
                <TableCell className={classes.cell} component="th" scope="row">{row.text}</TableCell>
                <TableCell className={classes.cell} component="th" scope="row">{row.created_at}</TableCell>
                <TableCell className={classes.cell} component="th" scope="row">
                <Button onClick={() => handlePopup(row)} className={classes.button} variant="outlined" color="primary" size="small">
                  See More
                </Button>
                  </TableCell>
              </TableRow>
      </>
    );
  }

  export default function TweetsTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const [openPopup, setPopup] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState("");
    const [popupState, setPopupState] = React.useState("init")
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
      if(popupState === "init");
      else setPopup(true);
    }, [popupState])
  
    return (

    <div style={{
      padding: 0,
      margin: 0
    }}>
      <Popup
        open={openPopup}
        setOpen={setPopup}
        row={currentRow}
      />
      <TableContainer style={{
        width: '100%',
        padding: 0,
        margin: 0
      }}>
        <Table
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{fontSize: 14}}>Tweet</TableCell>
              <TableCell style={{fontSize: 14}}>
                Date
                {' '}
              </TableCell>
              <TableCell style={{fontSize: 14}}>
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
                  ? props.rows
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((row) => <Row popupState={popupState} setPopupState={setPopupState} setCurrentRow={setCurrentRow} key={row.id} row={row} />)
                  : ''}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={props.rows ? props.rows.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
    </div>
  );
};
