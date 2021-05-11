require('dotenv').config();
const db = require('../models');
const Booking = db.bookings;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Booking.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { booking_id } = req.params;

        try {
            const booking = await Booking.findOne({
                where: { booking_id }
            });

            if(!booking)
                return res.status(400).send({
                    message: `No booking/s found with the booking id ${booking_id}`
                });

            return res.send(responseSuccess(booking));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { total_no_guest, total_no_night, total_price, discount, user_id, created_by, updated_by } = req.body;

        try{
            let newTax = await Booking.create({
                total_no_guest,
                total_no_night,
                total_price,
                discount,
                user_id,
                created_by,
                updated_by 
            });

            return res.status(201).send(responseSuccess(newTax, `Booking created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { booking_id } = req.params;
        const { user_id, total_no_guest, total_no_night, total_price, discount, status, updated_by } = req.body;


        try {
            let booking = await Booking.findOne({
                where: {
                    booking_id
                }
            });

            if(!booking)
                return res.status(400).send(responseError(`Booking with an booking id ${booking_id} doesn't exist`));
        
            if(percentage)
                booking.percentage = percentage;
            
            if(user_id)
                booking.user_id = user_id;

            if(total_no_guest)
                booking.total_no_guest = total_no_guest;

            if(total_no_night)
                booking.total_no_night = total_no_night;
                
            if(total_price)
                booking.total_price = total_price;

            if(discount)
                booking.discount = discount;

            if(status)
                booking.status = status;


            if(updated_by)
                booking.updated_by = updated_by;

            booking.save();

            return res.send(responseSuccess([],`Booking ${booking_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { booking_id } = req.body;

        if(!booking_id)
            return res.status(400).send(responseError(`Please provide valid booking id that you are trying to delete.`));
        
        try {
            let booking = await Booking.findOne({
                where: {
                    booking_id
                }
            });

            if(!booking)
                return res.status(400).send(responseError(`Booking with a booking id ${booking_id} doesn't exist!`));

            await booking.destroy();

            return res.send(responseSuccess([],`Booking ${booking_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};