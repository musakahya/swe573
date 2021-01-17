import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Popup({ open, row, setOpen }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tweet Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap", width: '%100' }}
        spacing={3}
      >
          <Grid item>
          <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap", width: '%100' }}
        spacing={1}
      >
          <Grid item xs={3}> 
              <Typography variant="body2" style={{ fontWeight: 600 }}>
                  Tweet
              </Typography>
          </Grid>
          <Grid item>
            {row.text}
          </Grid>
      </Grid>
      </Grid>

      <Grid item>
          <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap", width: '%100' }}
        spacing={1}
      >
          <Grid item xs={3}>
              <Typography variant="body2" style={{ fontWeight: 600 }}>
                  Retweets
              </Typography>
          </Grid>
          <Grid item xs={9}>
          <Typography variant="body2">
            {row.retweet_count}
            </Typography>
          </Grid>
      </Grid>
      </Grid>

      <Grid item>
          <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap", width: '%100' }}
        spacing={1}
      >
          <Grid item xs={3}>
              <Typography variant="body2" style={{ fontWeight: 600 }}>
                  Favorites
              </Typography>
          </Grid>
          <Grid item xs={9}>
          <Typography variant="body2" >
            {row.favorite_count}
            </Typography>
          </Grid>
      </Grid>
      </Grid>

      </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}