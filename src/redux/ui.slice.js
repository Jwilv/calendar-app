import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalOpen: false
}

const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        openModal(state,action){
            return{
                ...state,
                modalOpen:true,
            }
        }
    }
})

export default uiSlice.reducer