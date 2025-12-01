const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
    try{
        const events = await Event.find();
        res.json(events);


    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//create an event
exports.createEvent = async (req, res) => {
    try{

        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);

    } catch(error){

        res.status(400).json({message: error.message});
    }
};

//update an event
exports.updateEvent = async (req, res) => {
    try{

        const { id } = req.params;
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedEvent);

    } catch(error) {
        res.status(400).json({message: error.message});
    }
};

//delete an event
exports.deleteEvent = async (req, res) => {
    try{

        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.json({message: "Event deleted successfully"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};




