import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { SpinnerScreen } from '../components/spiner/SpinnerScreen'
import { startChecking } from '../redux/auth.slice'

export const AppRouter = () => {
    const dispatch = useDispatch();

    const { checking } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if(checking){
        return ( <SpinnerScreen />)
    }
    
    return (
        <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/' element={<CalendarScreen />}/>
        </Routes>
    )
}
