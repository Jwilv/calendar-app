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

export default  authSlice.reducer;