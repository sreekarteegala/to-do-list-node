require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./src/routes');

// parse requests of content-type - application/json
app.use(express.json());

const db = require('./src/models')

// Connect to MongoDB database using Mongoose
db.mongoose
    .connect(db.connUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log("Server Started");
})