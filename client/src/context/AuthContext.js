import React, {createContext, useReducer} from 'react';
import authReducer from './AuthReducer';
import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../state_types';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const initialState = {
        userAuth:null,
        errors:null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
   
   //register user
   const registerUser = async (userData) => {
       const config = {
           header: {
               'Content-Type': 'application/json'
           }
       }

       try {
           const res = await axios.post('/signup', userData, config);
           dispatch({
               type:REGISTER_SUCCESS,
               payload: res.data
           })
       } catch (error) {
           dispatch({
               type:REGISTER_FAIL,
               payload: error.response.data
           })
       }
   }


     //login user
     const loginUser = async (userData) => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
 
        try {
            const res = await axios.post('/login', userData, config);
            dispatch({
                type:LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type:LOGIN_FAIL,
                payload: error.response.data
            })
        }
    }

    //logout 
    const logout = () => {
        dispatch({
            type:LOGOUT,
        })
    }

    return(
        <AuthContext.Provider value={{
           userAuth: state.userAuth,
           errors:state.errors,
           registerUser,
           loginUser,
           logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}