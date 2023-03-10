import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { fechToken, fechWithoToken } from "../helpers/fech";
import { eventClearActive, eventClearEvents } from "./calendar.slice";

const initialState = {
    checking: true,
    // uid:null,
    // name:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action)=>{
                return({
                    ...state,
                    checking:false,
                    ...action.payload,
                })
        },
        logout:()=>{
                return({
                    checking:false,
                })
        },
        checkingFinish:(state)=>{
            return{
                ...state,
                checking:false,
            }
        },

    }
})

const { login, logout, checkingFinish } = authSlice.actions;

export const startLogin =  (email,password)=>{
    return async(dispatch)=>{
        const res = await fechWithoToken('auth',{email,password}, 'POST');
        const body = await res.json();
        
        if(body.ok){
            localStorage.setItem('token',body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid:body.uid,
                name:body.name,
            }))
        }else{
            Swal.fire('Error',body.msg,'error')
        }
    }
}

export const startRegister =  (email,password,name)=>{
    return async(dispatch)=>{
        const res = await fechWithoToken('auth/new',{email,password,name}, 'POST');
        const body = await res.json();
        
        if(body.ok){
            localStorage.setItem('token',body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid:body.uid,
                name:body.name,
            }))
        }else{
            Swal.fire('Error',body.msg,'error')
        }
    }
}

export const startChecking =  ()=>{
    return async(dispatch)=>{
        const res = await fechToken('auth/renew');
        const body = await res.json();
        
        if(body.ok){
            localStorage.setItem('token',body.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid:body.uid,
                name:body.name,
            }))
        }else{
            
            dispatch(checkingFinish())
        }
    }
}

export const startLogout = ()=>{
    return(dispatch)=>{
        localStorage.clear()
        dispatch(logout());
        dispatch(eventClearActive())
        dispatch(eventClearEvents())
    }
}

export default  authSlice.reducer;