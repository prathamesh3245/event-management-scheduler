import React , { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventForm from '../../components/EventForm';
import { getEvents } from '../../api/eventApi';
import Footer from '../../components/Footer';
 

//

const CalendarPage = () => {

    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);


    const refetchEvents = async () => {
        try {

            const data = await getEvents();
            setEvents(data);

        } catch(error) {

            console.error("Failed to load events:",error);

        }
    };

    useEffect(() => {
        refetchEvents();
    }, []);



    const handleDateClick = (arg) => {

        setCurrentEvent({
            start: arg.dateStr,
            end: arg.dateStr,
            allDay: arg.allDay
        });
        setIsModalOpen(true);
    };

    const handleEventClick = (clickInfo) => {

        const eventData = {
            _id: clickInfo.event.id,
            title: clickInfo.event.startStr,
            start: clickInfo.event.startStr,
            end: clickInfo.event.endStr,
            allDay: clickInfo.event.endStr,
            description: clickInfo.event.extendedProps.description || ''
        };
        setCurrentEvent(eventData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentEvent(null);
        setIsModalOpen(false);
    };



    const calendarOptions = {
        plugins : [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: events.map(e => ({
            ...e,
            id: e._id
        })),
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },
        dateClick: handleDateClick,
        eventClick: handleEventClick,
        editable: true,
        selectable: true
    };
    
    return (
        <>
            <div className="calendar-page-container">
                <div style={{padding: '20px', maxWidth: '1000px', margin: 'auto'}}>
                    <h1>Event Management</h1>
                    <FullCalendar {...calendarOptions} />
                </div>
                
                
                {isModalOpen && (
                    <EventForm 
                    event={currentEvent}
                    closeModal={handleCloseModal} 
                    onSaveSuccess={refetchEvents} // Re-fetch on successful create/update
                    onDeleteSuccess={refetchEvents} // Re-fetch on successful delete
                    />
                )}
            </div>
            <div>
                <Footer />
            </div>
        </>

    
  );

};

export default CalendarPage;