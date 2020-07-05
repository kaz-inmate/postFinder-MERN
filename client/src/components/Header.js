import React, {useContext, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import {AuthContext} from '../context/AuthContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

const Header = () => {
  const classes = useStyles();
  const handleLogout = () => {
    logout();

  }
  const userLinks = (
    <Fragment>
      <SearchBar />
      <Button color="inherit" onClick={handleLogout}>Logout</Button>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <Link to="/login"> <Button color="inherit">Login</Button></Link>
      <Link to="/signup"><Button color="inherit">Register</Button></Link>      
    </Fragment>
  )
  const {logout, userAuth} = useContext(AuthContext);

 
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PhotoShare
          </Typography>
         
         {!userAuth ? authLinks : userLinks}
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;