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

    }
})

export const startLogin =  (email,password)=>{
    return async()=>{
        const res = await fechWithoToken('auth',{email,password}, 'POST');
        const body = await res.json();
        console.log(body)
    }
}

export default  authSlice.reducer;