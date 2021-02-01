import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

export default class ErrorBoundary extends Component {

  state = {
    error: "",
    errorInfo: "",
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    this.setState({ errorInfo });
  }

  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <Grid
          style={{ width: "100%", padding: 100 }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <ErrorOutlineIcon />
          </Grid>
          <Grid item>
            <div className="card-header">
              <p>
                There was an error in loading this page. A detailed log of this
                error has been shared with the responsible team and will be
                investigated. There is no action required from you.{" "}
              </p>
              <p>You can&nbsp;
                <span
                  style={{ cursor: "pointer", color: "#0077FF" }}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  reload this page.&nbsp;
                </span>
              </p>
            </div>
          </Grid>
        </Grid>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
