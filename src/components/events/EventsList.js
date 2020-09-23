import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"  
import { OrganizerEvent } from "./OrganizerEvent"
import { UsersContext } from "../users/UsersProvider"
import { TechnicalContext } from "../TechnicalProvider"
import "./Events.css"

export const EventsList = ({props}) => {
    const {events, getEvents} = useContext(EventContext)
    const {technicals, getTechnicals } = useContext(TechnicalContext)
    const {currentUser, getCurrentUser} = useContext(UsersContext)
    

    
    

    useEffect(() => {
        getEvents()
        .then(getTechnicals)
        .then(getCurrentUser)
        
    },[])
    
    const currentUserEvents = events.filter(e => e.userId === currentUser.id) || {}


    


    return (
        <section className="organizerEventsContainer">
            <h1>My Events</h1>
            <div className="events organizer">
                {
                    currentUserEvents.map(event => {
                    const type = technicals.find(t => t.id === event.technicalId) || {}
                    return (
                    <>
                    <OrganizerEvent key={event.id} 
                    event={event}
                    props={props}
                    technical = {type} />
                    </>
                    )
                })
                }
            </div>
            <button onClick={() => props.history.push("/events/create")}>
                New Event
            </button>
        </section>
    )

}