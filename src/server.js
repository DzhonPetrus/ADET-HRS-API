require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet= require('helmet');
const fs= require('fs');
const path= require('path');
const jwt = require("jsonwebtoken");
const multer = require('multer');


const routes= require('./routes');
const upload = multer();
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// JWT
const authenticateToken = (req, res, next) => {
    if (req.originalUrl === `${API_VERSION}/login`)  {
        next();
    }else{
        console.log(req.originalUrl+ `${API_VERSION}/login`)

        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        console.log(process.env.TOKEN_SECRET)
        if(token === undefined || token === null) return res.sendStatus(401);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            console.log(user);
            console.error(err);
            if(err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
};
//app.use(authenticateToken);
app.use(upload.none());
// API KEY AUTHENTICATION
// app.use(isAuthenticated);

// API ROUTES
const API_VERSION = process.env.API_VERSION;
app.use(`${API_VERSION}/user`, routes.user);
app.use(`${API_VERSION}/user_information`, routes.user_information);
app.use(`${API_VERSION}/amenity`, routes.amenity);
app.use(`${API_VERSION}/housekeeping`, routes.housekeeping);
app.use(`${API_VERSION}/loyalty_point`, routes.loyalty_point);
app.use(`${API_VERSION}/loyalty_point_history`, routes.loyalty_point_history);
app.use(`${API_VERSION}/tax`, routes.tax);
app.use(`${API_VERSION}/booking`, routes.booking);
app.use(`${API_VERSION}/promo_and_discount`, routes.promo_and_discount);
app.use(`${API_VERSION}/pd_condition`, routes.pd_condition);
<<<<<<< HEAD
app.use(`${API_VERSION}/pricing`, routes.pricing);
app.use(`${API_VERSION}/room_type`, routes.room_type);
=======
app.use(`${API_VERSION}/amenity_room_type`, routes.amenity_room_type);
>>>>>>> 5a4d8cd612adad37df2f602be6c1246ae8d6aac5

app.use(`${API_VERSION}/login`, routes.login);

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

const port = process.env.API_PORT | 4000;
app.listen(port, () => {
-    console.log(`APP LISTENING ON PORT ${port}`);
})
