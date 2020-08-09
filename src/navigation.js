import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import "./style.css";


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavMenu extends React.Component {
  
 
  render(){

    const { classes } = this.props;
    

    return (
     
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
           
              <ul className="routeMenu">
                  <li><Link to="/">Historical Charts</Link></li>
                  <li><Link to="/livecharts">Live Charts</Link></li>
              </ul>
           
           </Toolbar>
        </AppBar>
      </div>
      
    );
  }
  
}

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);