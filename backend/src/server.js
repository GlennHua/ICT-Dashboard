import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes';
import dotenv from 'dotenv';

// Setup Express
const app = express();
dotenv.config();

const port = process.env.PORT || 3001;
// Setup body-parser
app.use(express.json());

// Setup our routes.
app.use('/', routes);

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, '../public')));

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // Make all files in that folder public
    app.use(express.static(path.join(__dirname, '../../frontend/build')));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });
}


// Start the DB on localhost. Then, once it's connected, start the server.
// mongoose.connect('mongodb://127.0.0.1:27017/ict-dashboard', { useNewUrlParser: true })
//     .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));

export default app;