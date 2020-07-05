import React, {createContext, useReducer} from 'react';
import PostRedcuer from './PostReducer';
import {SEARCH_USER, CLEAR_SEARCH} from '../state_types';
export const PostContext = createContext();

export const PostProvider = (props) => {
    const initialState = {
        search: null,
        posts: [
            {
                id:1,
                name:"Prateek",
                createdAt:"Today",
                desc:"My favorite snake",
                img:"https://img.theweek.in/content/dam/week/news/health/images/2019/11/1/indian-cobra-snake-snakes-poison-snakebite-shut.jpg",
                likes:0
            },
            {
                id:1,
                name:"Bije",
                createdAt:"Yesterday",
                desc:"My second favorite snake",
                img:"https://thumbs-prod.si-cdn.com/pCDKPyJI6L9ZueCJJzdcsZ9D-t0=/fit-in/1600x0/https://public-media.si-cdn.com/filer/a3/3f/a33f8ee0-bfee-4cce-9a13-f9388c5323c0/42-55375529.jpg",
                likes:0
            },
            {
                id:1,
                name:"Bije",
                createdAt:"Yesterday",
                desc:"My second favorite snake",
                img:"https://thumbs-prod.si-cdn.com/pCDKPyJI6L9ZueCJJzdcsZ9D-t0=/fit-in/1600x0/https://public-media.si-cdn.com/filer/a3/3f/a33f8ee0-bfee-4cce-9a13-f9388c5323c0/42-55375529.jpg",
                likes:0
            },
            {
                id:1,
                name:"Bije",
                createdAt:"Yesterday",
                desc:"My second favorite snake",
                img:"https://thumbs-prod.si-cdn.com/pCDKPyJI6L9ZueCJJzdcsZ9D-t0=/fit-in/1600x0/https://public-media.si-cdn.com/filer/a3/3f/a33f8ee0-bfee-4cce-9a13-f9388c5323c0/42-55375529.jpg",
                likes:0
            }
        ]
    }
    
    const[state, dispatch] = useReducer(PostRedcuer, initialState);

    const searchUser = (post) => {
        dispatch({
            type: SEARCH_USER,
            payload:post
        });
    }

    const clearSearch = () => {
        dispatch({
            type:CLEAR_SEARCH
        });
    }

    return(
        <PostContext.Provider value={{
            posts:state.posts,
            search:state.search,
            searchUser,
            clearSearch
        }}>
            {props.children}
        </PostContext.Provider>
    )
}
