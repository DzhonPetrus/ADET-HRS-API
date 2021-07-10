require('dotenv').config();
const db = require('../models');
const Booking = db.bookings;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Booking.findAll({where :{status:"Active"},include: ["created", "updated","client"]});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { booking_id } = req.params;

        try {
            const booking = await Booking.findOne({
                where: { booking_id },
                include: ["created", "updated","client"]
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
        created_by = req.user.id;
        user_id = req.user.id;

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

            let result = await Booking.findByPk(newTax.booking_id, {include: ['created','client']});

            return res.status(201).send(responseSuccess(result, `Booking created successfully.`));

        } catch (err){ console.log(err);res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { booking_id } = req.params;
        let { user_id, total_no_guest, total_no_night, total_price, discount, status, updated_by } = req.body;
        updated_by = req.user.id;

        try {
            let booking = await Booking.findOne({
                where: {
                    booking_id
                }
            });

            if(!booking)
                return res.status(400).send(responseError(`Booking with an booking id ${booking_id} doesn't exist`));
        
            
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

            let result = await Booking.findByPk(booking.booking_id, {include: ['created', 'updated','client']});

            return res.send(responseSuccess(result,`Booking ${booking_id} has been updated!`));
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
                return res.status(400).send(responseError(`Booking with the id ${booking_id} doesn't exist!`));

            // await user.destroy();

            booking.status = 'Inactive';
            booking.save();

            return res.send(responseSuccess(booking,`Booking ${booking_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },
};