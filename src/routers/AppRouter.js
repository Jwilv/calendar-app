import React from 'react'
import { Route, Routes } from 'react-router'
import { LoginAndRegister } from '../components/auth/LoginAndRegister'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginAndRegister />} />
            <Route path='/' element={<CalendarScreen />}/>
        </Routes>
    )
}
