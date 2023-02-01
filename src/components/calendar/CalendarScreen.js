import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from '../user interface/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../redux/ui.slice'
import { eventClearActive, eventSetActive, startEventLoading } from '../../redux/calendar.slice'
import { AddNewFab } from '../user interface/AddNewFab'
import { DeleteEventFab } from '../user interface/DeleteEventFab'

moment.locale('es');
const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const {uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startEventLoading())
    }, [dispatch])

    const {events, active} = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const handleDoubleClick = (event)=>{
        console.log(event);
        dispatch(openModal())
    }

    const handleSelectEvent = (event)=>{
        console.log(event);
        dispatch(eventSetActive(event))
    }

    const handleViewChange = (event)=>{
    setLastView(event)
    localStorage.setItem('lastView', event)
    }

    const handleOnSelectSlot =(event)=>{
        dispatch(eventClearActive())
    }

    const eventStylegetter = ( event, start, end, isSelect)=>{
        const style ={
            backgroundColor:(uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white',
        }

        return{
            style
        }

    }
    return (
        <div className='calendar-screen'>
            <Navbar />
            <Calendar 
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStylegetter}
            onDoubleClickEvent={handleDoubleClick}
            onSelectEvent={handleSelectEvent}
            onView={handleViewChange}
            onSelectSlot={handleOnSelectSlot}
            selectable={true}
            view={lastView}
            components={{
                event:CalendarEvent
            }}
            />
            <CalendarModal />
            <AddNewFab />
            {
                (active) && <DeleteEventFab />
            }
        </div>

    )
}
