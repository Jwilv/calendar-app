import { createSlice } from "@reduxjs/toolkit";
import { fechWithoToken } from "../helpers/fech";

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

    }
})

const {login} = authSlice.actions;

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
        }
    }
}

export default  authSlice.reducer;