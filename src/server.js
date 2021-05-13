require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet= require('helmet');
const fs= require('fs');
const path= require('path');
const routes= require('./routes');

const app = express();

const { isAuthenticated } = require('./utils/isAuthenticated');
const db = require('./models');

// SEQUELIZE DATABASE SYNC
if (process.env.ALLOW_SYNC === "true")
    db.sequelize
        .sync({alter:true})
        .then(() => console.log("Done syncing database with models."));

// LOGGING
const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'../access.log'),
    {flags: 'a'}
);

// API MIDDLEWARES
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// API KEY AUTHENTICATION
app.use(isAuthenticated);

// API ROUTES
const API_VERSION = process.env.API_VERSION;
app.use(`${API_VERSION}/user`, routes.user);
app.use(`${API_VERSION}/tax`, routes.tax);
app.use(`${API_VERSION}/booking`, routes.booking);
app.use(`${API_VERSION}/loyalty_point_history`, routes.loyalty_point_history);

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

const port = process.env.API_PORT | 4000;
app.listen(port, () => {
    console.log(`APP LISTENING ON PORT ${port}`);
})
