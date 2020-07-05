import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import Header from './components/Header';
// import ProductDetail from './components/ProdDetails';
import Content from './components/Content';
import {PostProvider} from './context/PostContext';
import {AuthProvider} from './context/AuthContext';
import SignUp from './components/Signup';
import Login from './components/Login';
import PrivateRoute from '../src/protected/protect';

const App = () => {
    return(
    <AuthProvider>
    <PostProvider>
        <Grid container direction="column">
            <Header />
            <Switch>
            <React.Fragment>
                <Grid item container>
                    <Grid item xs={false} sm={2} />
                    <Grid item xs={12} sm={8}>
                    <PrivateRoute exact path="/" component={Content} />
                    </Grid>
                    <Grid item xs={false} sm={2} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login} />
                </Grid>
                </React.Fragment>
            </Switch>   
        </Grid> 
    </PostProvider>
    </AuthProvider>
    )
}

export default App;