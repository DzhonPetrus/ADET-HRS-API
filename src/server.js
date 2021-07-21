require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet= require('helmet');
const fs= require('fs');
const jwt = require("jsonwebtoken");
const path= require('path');
const multer = require('multer');
const upload = multer();

const routes= require('./routes');
const app = express();

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
// app.use(upload.none());
// JWT
const authenticateToken = (req, res, next) => {
    if ((req.originalUrl === `${API_VERSION}/login`) || (req.originalUrl === `${API_VERSION}/register`))  {
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
app.use(authenticateToken);


// API ROUTES
const API_VERSION = process.env.API_VERSION;

app.use("/public", express.static(path.join(__dirname + "/public/uploads")));

app.use(`${API_VERSION}/amenity_room_type`, upload.none(), routes.amenity_room_type);
app.use(`${API_VERSION}/booking`, upload.none(), routes.booking);
app.use(`${API_VERSION}/housekeeping`, upload.none(), routes.housekeeping);
app.use(`${API_VERSION}/loyalty_point_history`, upload.none(), routes.loyalty_point_history);
app.use(`${API_VERSION}/loyalty_point`, upload.none(), routes.loyalty_point);
app.use(`${API_VERSION}/payment`, upload.none(), routes.payment);
app.use(`${API_VERSION}/pd_condition`, upload.none(), routes.pd_condition);
app.use(`${API_VERSION}/pricing`, upload.none(), routes.pricing);
app.use(`${API_VERSION}/rate`, upload.none(), routes.rate);
app.use(`${API_VERSION}/rooms_reserved`, upload.none(), routes.room_reserves);
app.use(`${API_VERSION}/room`, upload.none(), routes.room);
app.use(`${API_VERSION}/tax`, upload.none(), routes.tax);
app.use(`${API_VERSION}/user`, upload.none(), routes.user);

app.use(`${API_VERSION}/amenity`, routes.amenity);
app.use(`${API_VERSION}/package`, routes.package);
app.use(`${API_VERSION}/promo_and_discount`, routes.promo_and_discount);
app.use(`${API_VERSION}/user_information`, routes.user_information);
app.use(`${API_VERSION}/room_type`, routes.room_type);


app.use(`${API_VERSION}/login`,upload.none(), routes.login);

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

const port = process.env.API_PORT | 4000;
app.listen(port, () => {
-    console.log(`APP LISTENING ON PORT ${port}`);
})
