import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    events: [
        {
            id:new Date().getTime(),
            title: 'funciona?',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            user: {
                id: '1234',
                name: 'juanceto'
            }
        },
    ],
    active: null
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        eventAddNew: (state, action) => {
            return {
                ...state,
                events:[...state.events,action.payload]
            }
        },
        eventSetActive: (state, action) => {
            return {
                ...state,
                active: { ...action.payload }
            }
        },
        eventClearActive:(state)=>{
            return{
                ...state,
                active:null,
            }
        }

    }
})

export const { eventAddNew, eventSetActive, eventClearActive } = calendarSlice.actions

export default calendarSlice.reducer;