import axios from 'axios'

const API_URL = 'https://event-management-scheduler-production.up.railway.app/';

export const getEvents = async () => {
    try{

        const response = await axios.get(API_URL);
        return response.data;

    } catch(error){
        console.error('Error fetching events:');
        throw error;
    }
};

export const createEvent = async (eventDate) => {
    try{

        const response = await axios.post(API_URL, eventDate);
        return response.data;
    } catch(error){
        console.error('Error creating event:');
        throw error;
    }
};

export const updateEvent = async (id, eventDate) => {
    try{

        const response = await axios.put(`${API_URL}/${id}`, eventDate);
        return response.data;

    } catch(error) {
        console.log('Error updating event:');
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try{

        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;

    } catch(error){
        console.error('Error deleting event:');
        throw error;
    }
};