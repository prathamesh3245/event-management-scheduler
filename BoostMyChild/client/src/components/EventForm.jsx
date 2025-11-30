import React , { useState, useEffect } from "react";
import { createEvent, updateEvent, deleteEvent } from "../api/eventApi";


const getFormattedDate = (dateString) => {

    if(!dateString) return '';

    const date = new Date(dateString);

    return !isNaN(date) ? date.toISOString().substring(0, 16) : '';

}

const defaultFormData = {
    title: '',
    description: '',
    start: '',
    end: '',
    allDay: false
};


const EventForm = ({event, closeModal, onSaveSuccess, onDeleteSuccess}) => {

    const isEditing = !!event?._id;

    const [formData, setFormData] = useState({
        ...defaultFormData,
        ...event,
        start: getFormattedDate(event?.start),
        end: getFormattedDate(event?.end)
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(isEditing) {

                await updateEvent(event._id, formData);
            
            }
            else{
                
                await createEvent(formData);

            }

            onSaveSuccess();
            closeModal();
        
        } catch(error){

            alert("Error saving event. Check console for details.");
            console.error(error);

        }

    };

    const handleDelete = async () => {

        if(!window.confirm("Are you sure you want to delete this event?")) 
            return;

        try{

            await deleteEvent(event._id);
            onDeleteSuccess(event._id);
            closeModal();

        } catch(error){
            
            alert("Error deleting event. Check console for details.");
            console.error(error);

        }
    };

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
                <form onSubmit={handleSubmit}>
              
                <label>Title*</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                
                
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

                
                <label>Start*</label>
                <input type="datetime-local" name="start" value={formData.start} onChange={handleChange} required />

                
                <label>End*</label>
                <input type="datetime-local" name="end" value={formData.end} onChange={handleChange} required />

               
                <label>
                    All-day?
                    <input type="checkbox" name="allDay" checked={formData.allDay} onChange={handleChange} />
                </label>
                
                <button type="submit">{isEditing ? 'Update Event' : 'Create Event'}</button>
                {isEditing && (
                    <button type="button" onClick={handleDelete} className="delete-btn">Delete</button>
                )}
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
                </form>
            </div>
        </div>

    );

};

export default EventForm;