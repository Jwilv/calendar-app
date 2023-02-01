import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { fechToken } from "../helpers/fech";
import { prepareEvenst } from "../helpers/prepare-events";


const initialState = {
    events: [],
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
        },
        eventLoaded:(state, action)=>{
            return{
                ...state,
                events:[...action.payload]
            }
        }

    }
})

export const { eventAddNew, eventSetActive, eventClearActive, eventUpdated, eventDeleted, eventLoaded } = calendarSlice.actions

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

export const startEventLoading = ()=>{
    return async(dispatch)=>{

        try {

            const res = await fechToken('events');
            const body = await res.json();
            
            const events = prepareEvenst( body.events ) ;
            dispatch(eventLoaded(events))

        } catch (error) {
            console.log(error);
        }

    }
}

export const startEventUpdate = (event)=>{
    return async(dispatch)=>{
        try {
            const res = await fechToken(`events/${event.id}`, event ,'PUT')
            const body = await res.json();
            if(body.ok){
                dispatch(eventUpdated(event))
            }else{
                Swal.fire('Error',body.msg,'error')
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startEventDelete = (event)=>{
    return async(dispatch, getState)=>{
        const {id} = getState().calendar.active
        try {
            const res = await fechToken(`events/${id}`, {} ,'DELETE')
            const body = await res.json();
            if(body.ok){
                dispatch(eventDeleted())
            }else{
                Swal.fire('Error',body.msg,'error')
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default calendarSlice.reducer;