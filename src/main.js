import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MainMenu from './navigation';
import { Route,Switch} from "react-router-dom";
import HistoricalCharts from "./historicalcharts";
import LiveCharts from "./livecharts";


// const LMS = lazy(() => import('../LMS/lms'));
// const Example = lazy(() => import('../Examples/Example'));

const styles = theme => ({
  root: {
    // display: 'flex',
  },
  
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Main extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <div>
             <MainMenu state={this.state} handleClick={this.handleClick} handleClose={this.handleClose}/>
        </div>
        <main className={classes.content}>
          
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/" exact component={HistoricalCharts} />
                    <Route path="/livecharts" component={LiveCharts} />
                </Switch>
              </Suspense>     
            </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Main);
