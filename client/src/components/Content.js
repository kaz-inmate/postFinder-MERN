import React, {useContext} from 'react';
import {PostContext} from '../context/PostContext';
import ProductDetail from './ProdDetails';
import { Grid } from '@material-ui/core';

const Content = () => {
    const {posts, search} = useContext(PostContext);
    return (
    <Grid container spacing={8}>
      {
        search !== null ? search.map(post =>  <Grid item xs={12} md={6  }><ProductDetail key={post.id} post={post} /> </Grid>) :
        posts.map(post =>  <Grid item xs={12} md={6  }><ProductDetail key={post.id} post={post} /> </Grid>)
        }
    </Grid>
    )
}


export default Content;