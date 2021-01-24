/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    
    
    
  },
  button: {
    textTransform: 'capitalize',
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

const HistoryTable = (props) => {
  const classes = useStyles();
  return (
    <div>
      <TableContainer className={classes.table}>
        <Table

          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Topic</TableCell>
              <TableCell className={classes.cell} >
                Date
                {' '}
              </TableCell>
              <TableCell className={classes.cell} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props && props.rows && props.length > 0 ? 
            (props.rows.map((row, index) => (
              <TableRow
                hover
                key={row.id}
                component={Link}
                //to={`/app/history/${row.email_id}`}
                style={{ textDecoration: 'none' }}
              >
                <TableCell className={classes.cell} component="th" scope="row">{row.search_term}</TableCell>
                <TableCell className={classes.cell} component="th" scope="row">{row.date}</TableCell>
                <TableCell className={classes.cell} align="left">

                    <Button size="small" className={classes.button} variant="outlined" color="primary" component={Link}>
        Repeat
      </Button>
                </TableCell>
              </TableRow>
            ))) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default HistoryTable;