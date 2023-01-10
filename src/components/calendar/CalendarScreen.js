import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from '../user interface/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'

moment.locale('es');
const localizer = momentLocalizer(moment)

const events = [{
    title:'funciona?',
    start : moment().toDate(),
    end : moment().add(2,'hours').toDate(),
    bgcolor: '#fafafa'
}]

export const CalendarScreen = () => {

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
            components={{
                event:CalendarEvent
            }}
            />
        </div>

    )
}
