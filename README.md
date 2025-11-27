Event Management Scheduler
A full-stack calendar application built to manage, create, edit, and delete scheduling events via a modern React frontend and a fast Node.js backend.

Features Overview
This application fulfills all requirements for a complete CRUD (Create, Read, Update, Delete) event scheduler:

View Events: Displays all scheduled events in a clean, interactive monthly calendar view powered by FullCalendar.

Create Events: Users can click on any date to open a modal form and schedule a new event.

Edit/Delete Events: Clicking an existing event opens the modal form, allowing the user to update its details or delete it entirely.

Persistent Data: All event data is stored reliably in a MongoDB database.

Tech Stack
The project is structured as a monorepo containing a client (frontend) and a server (backend) directory.

i. Tech Stack
Component	Technology	Description
Frontend (client)	React (Vite)	Modern JavaScript library for building the user interface.
Calendar	FullCalendar	Interactive, customizable calendar library.
State/API	Axios	Promise-based HTTP client for API calls.
Backend (server)	Node.js / Express	Fast, unopinionated web framework for the REST API.
Database	MongoDB	NoSQL database for storing event data.
ODM	Mongoose	MongoDB object data modeling for Node.js.

Export to Sheets

Steps to Run Locally
Follow these steps to get both the backend and frontend running on your local machine.

Prerequisites
Node.js (LTS version recommended)

MongoDB instance (local or remote via Atlas)

Step 1: Clone the Repository
Bash

git clone https://github.com/prathamesh3245/event-management-scheduler.git
cd event-management-scheduler
Step 2: Configure the Backend
Navigate to the server directory:

Bash
cd server
Install dependencies:

Bash
npm install
Database Setup: Create a .env file in the server directory and add your MongoDB connection string:

server/.env
MONGO_URI="mongodb://localhost:27017/calendar_app"

Start the backend server:

Bash
npx nodemon index.js 


Step 3: Run the Frontend
Open a new terminal tab/window.

Navigate to the client directory:

Bash

cd client
Install dependencies:

Bash

npm install
Start the client development server:

Bash

npm run dev
The calendar application will open in your browser, typically at http://localhost:5173 (Vite default).

API Endpoints (Backend)

The server exposes a single REST resource, /api/events, for all CRUD operations.

iii. API Endpoints

Method, Endpoint, Description, Expected Data (Body)
GET, /api/events,Retrieves all events from the database., None
POST, /api/events, Creates a new event., "{ title, start, end, description, allDay }"
PUT,/api/events/:id,Updates an existing event.,"{ title, start, end, description, allDay }"
DELETE,/api/events/:id,Deletes a specific event by ID.,None
POST	/api/events	Creates a new event.	{ title, start, end, description, allDay }
PUT	/api/events/:id	Updates an existing event.	{ title, start, end, description, allDay }
DELETE	/api/events/:id	Deletes a specific event by ID.	None
