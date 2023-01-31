import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { startChecking } from '../redux/auth.slice'

export const AppRouter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])
    
    return (
        <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/' element={<CalendarScreen />}/>
        </Routes>
    )
}
