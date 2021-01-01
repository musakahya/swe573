/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    padding: 0,
    margin: 0
    
    
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

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
  
    return (
      <>
        <TableRow
                hover
                key={row.id}
                component={Link}
                style={{ textDecoration: 'none' }}
              >
                <TableCell className={classes.cell} component="th" scope="row">{row.text}</TableCell>
                <TableCell className={classes.cell} component="th" scope="row">{row.created_at}</TableCell>
              </TableRow>
      </>
    );
  }

  export default function TweetsTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (

    <div style={{
      padding: 0,
      margin: 0
    }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
                  ? props.rows
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((row) => <Row key={row.id} row={row} />)
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
