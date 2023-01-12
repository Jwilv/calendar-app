import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from '../user interface/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/ui.slice'

moment.locale('es');
const localizer = momentLocalizer(moment)

const events = [{
    title:'funciona?',
    start : moment().toDate(),
    end : moment().add(2,'hours').toDate(),
    bgcolor: '#fafafa',
    user:{
        id:'1234',
        name:'juanceto'
    }
}]

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const handleDoubleClick = (event)=>{
        dispatch(openModal())
    }

    const handleSelectEvent = (event)=>{
        console.log(event);
    }

    const handleViewChange = (event)=>{
    setLastView(event)
    localStorage.setItem('lastView', event)
    }

    const eventStylegetter = ( event, start, end, isSelect)=>{
        const style ={
            backgroundColor:'#367CF7',
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
            view={lastView}
            components={{
                event:CalendarEvent
            }}
            />
            <CalendarModal />
        </div>

    )
}
