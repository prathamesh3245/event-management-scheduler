require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const eventRoutes = require('./routes/eventRoutes')
const app = express()


app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("Event scheduler API is running!");
});

app.use('/api/events', eventRoutes);



const ATLAS_URI = process.env.MONGO_URI; 

// 🚨 CRITICAL CHECK: Ensure URI is available before connecting
if (!ATLAS_URI) {
    console.error("FATAL: MONGO_URI environment variable is missing. Cannot connect to database.");
    // This will stop the process and give a clear error in Railway logs
    process.exit(1); 
}

mongoose.connect(ATLAS_URI)
    .then(() => {
        console.log('MongoDB Connnected successfully.');
        
        // ONLY START SERVER IF DATABASE CONNECTION IS SUCCESSFUL
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('FATAL: MongoDB Connection Failed.', err);
        process.exit(1); 
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

