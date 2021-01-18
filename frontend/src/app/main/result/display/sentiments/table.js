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
                component={Link}
                style={{ textDecoration: 'none' }}
              >
                <TableCell className={classes.cell} component="th" scope="row">{props.tweet}</TableCell>
                <TableCell className={classes.cell} component="th" scope="row">{props.polarity}</TableCell>
              </TableRow>
      </>
    );
  }

  export default function SentimentTable(props) {

    console.log(props);

    let rows = [];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

      function compare( a, b ) {
        if ( a.polarity < b.polarity ){
          return 1;
        }
        if ( a.polarity > b.polarity ){
          return -1;
        }
        return 0;
      }
  
    return (

    <div style={{
      padding: 0,
      margin: 0
    }}>
      <TableContainer style={{
        width: '100%',
        padding: 0,
        margin: 0,
        maxHeight: 500
      }}>
        <Table
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{fontSize: 14}}>Tweet</TableCell>
              <TableCell style={{fontSize: 14}}>
                Polarity
                {' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
                  ? props.rows.sort(compare)
                    .map((row) => <Row tweet={row.tweet} polarity={row.polarity}/>)
                  : ''}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};
