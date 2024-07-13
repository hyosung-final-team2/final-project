import { useState } from 'react'
import CalendarView from "./CalendarView.jsx";

import {CALENDAR_INITIAL_EVENTS} from "./dummy.js";



const INITIAL_EVENTS = CALENDAR_INITIAL_EVENTS

function Calendar(){

    const [events, setEvents] = useState(INITIAL_EVENTS)


    return(
        <>
            <CalendarView
                calendarEvents={events}
            />
        </>
    )
}

export default Calendar