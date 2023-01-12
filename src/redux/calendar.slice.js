import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    events: [
        {
            title:'funciona?',
            start : moment().toDate(),
            end : moment().add(2,'hours').toDate(),
            bgcolor: '#fafafa',
            user:{
                id:'1234',
                name:'juanceto'
            }
        },
    ],
    active: null
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers:{

    }
})

export default calendarSlice.reducer;