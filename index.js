const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log('Requête reçue sur la route racine');
    res.send('Hello World');
});

// Define the scope of access for the Google Calendar API.
const scopes = ['https://www.googleapis.com/auth/calendar'];

// OAuth 2 configuration
const oauth2Client = new google.auth.OAuth2
(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
); 

const calendar = google.calendar({
    version: 'v3', 
    auth: oauth2Client
});

const event = {
    summary: 'Tech Talk with Tamby',
    location: 'Google Meet',

    description: "Demo event for Tamby Blog Post.",
    start: {
        dateTime: "2024-03-14T19:30:00+05:30",
        timeZone: 'Asia/Kolkata'
    },
    end: {
        dateTime: "2024-03-14T20:30:00+05:30",
        timeZone: 'Asia/Kolkata'
    },
    conferenceData: {
        createRequest: {
            requestId: uuid(),
        }
    },
    attendees: [
        {email: 'arindammajumder2020@gmail.com'},
    ]
};

app.get('/auth', (req, res) => {

    const url = oauth2Client.generateAuthUrl
    ({
        access_type: 'offline',
        scope: scopes
    });
    res.redirect(url);
    }
);

app.get('/create-event', async (req, res) => {

    try {
        const result = await calendar.events.insert({
            calendarId: 'primary', 
            auth:oauth2Client , 
            conferenceDataVersion: 1 , 
            sendUpdates: 'all', 
            resource: event
      });

       res.send({
            status: 200,
            message: 'Event created',
            link: result.data.hangoutLink
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
    }
);


app.get("/auth/redirect", async (req, res) => {

    const {tokens} = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! Please return to the console.');
    }

);

try {
    const server = app.listen(port, () => {
        console.log(`Serveur démarré et à l'écoute sur http://localhost:${port}`);
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Le port ${port} est déjà utilisé. Essayez un autre port.`);
        } else {
            console.error('Une erreur est survenue :', error);
        }
    });
} catch (error) {
    console.error('Une erreur est survenue lors du démarrage du serveur :', error);
}