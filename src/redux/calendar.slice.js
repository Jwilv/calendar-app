import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { fechToken } from "../helpers/fech";

const initialState = {
    events: [
        {
            id: new Date().getTime(),
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
                events: [...state.events, action.payload]
            }
        },
        eventSetActive: (state, action) => {
            return {
                ...state,
                active: { ...action.payload }
            }
        },
        eventClearActive: (state) => {
            return {
                ...state,
                active: null,
            }
        },
        eventUpdated: (state, action) => {
            return {
                ...state,
                events: state.events.map(event => (event.id === action.payload.id) ? action.payload : event)
            }
        },
        eventDeleted: (state) => {
            return {
                ...state,
                events: state.events.filter(event => (event.id !== state.active.id)),
                active: null,
            }
        }

    }
})

export const { eventAddNew, eventSetActive, eventClearActive, eventUpdated, eventDeleted } = calendarSlice.actions

export const startEventAddNew = (event)=>{
    return async(dispatch, getState)=>{

        const { uid, name } = getState().auth;

        try {
            const res = await fechToken('events', event, 'POST')
            const body = await res.json();
            if(body.ok){
                event.id = body.event.id
                event.user = {
                    _id: uid ,
                    name: name,
                }
            }
            dispatch(eventAddNew(event));
        } catch (error) {
            console.log(error);
        }
    }
}

export default calendarSlice.reducer;