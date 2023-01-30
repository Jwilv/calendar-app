import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './ui.slice'
import calendarReducer from './calendar.slice'
import authReducer from './auth.slice'



const store = configureStore({
    reducer:{
        ui:uiReducer,
        calendar:calendarReducer,
        auth:authReducer,
    }
})

export default store