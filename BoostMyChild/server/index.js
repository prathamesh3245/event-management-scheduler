require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const eventRoutes = require('./routes/eventRoutes')
const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Calendar')
    .then(() => console.log('MongoDB Connnected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
