import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalOpen: false
}

const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        openModal:(state)=>{
            return{
                ...state,
                modalOpen:true,
            }
        }
    }
})

export const { openModal } = uiSlice.actions;

export default uiSlice.reducer