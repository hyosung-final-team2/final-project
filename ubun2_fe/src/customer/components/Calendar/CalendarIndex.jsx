// import { useState } from 'react'
import CalendarView from "./CalendarView.jsx";
// import moment from 'moment'
// import { CALENDAR_INITIAL_EVENTS } from '../../utils/dummyData'
// import { openRightDrawer } from '../common/rightDrawerSlice'
// import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil'
// import { showNotification } from '../common/headerSlice'



// const INITIAL_EVENTS = CALENDAR_INITIAL_EVENTS

function Calendar(){

    // const [events, setEvents] = useState(INITIAL_EVENTS)

    // Format - {title :"", theme: "", startTime : "", endTime : ""}
    // const addNewEvent = (date) => {
        // let randomEvent = INITIAL_EVENTS[Math.floor(Math.random() * 10)]
        // let newEventObj = {title : randomEvent.title, theme : randomEvent.theme, startTime : moment(date).startOf('day'), endTime : moment(date).endOf('day')}
        // setEvents([...events, newEventObj])
    // }
    //
    // // Open all events of current day in sidebar
    // const openDayDetail = ({filteredEvents, title}) => {
    //     dispatch(openRightDrawer({header : title, bodyType : RIGHT_DRAWER_TYPES.CALENDAR_EVENTS, extraObject : {filteredEvents}}))
    // }

    return(
        <>
            <CalendarView
                // calendarEvents={events}
                // addNewEvent={addNewEvent}
                // openDayDetail={openDayDetail}
            />
        </>
    )
}

export default Calendar