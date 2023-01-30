import { createSlice } from "@reduxjs/toolkit";

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
        console.log(email,password)
    }
}

export default  authSlice.reducer;