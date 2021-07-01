require('dotenv').config();
const db = require('../models');
const Room_Reserved = db.rooms_reserves;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Room_Reserved.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { room_reserved_id } = req.params;

        try {
            const room_reserved = await Room_Reserved.findOne({
                where: { room_reserved_id }
            });

            if(!room_reserved)
                return res.status(400).send({
                    message: `No room reserve found with the room_reserved_id ${room_reserved_id}`
                });

            return res.send(responseSuccess(room_reserved));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  booking_id, room_id,room_reserved_status,rate,no_of_guest,no_of_nights,
            date_from,date_to,package_id,checkIn,checkOut, created_by, updated_by } = req.body;

        try{
            let newRoomReserved = await Room_Reserved.create({
                booking_id,
                room_id,
                room_reserved_status,
                rate,
                no_of_guest,
                no_of_nights,
                date_from,
                date_to,
                package_id,
                checkIn,
                checkOut,
                created_by,
                updated_by 
            });

            return res.status(201).send(responseSuccess(newRoomReserved, `Room Reserved created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { room_reserved_id } = req.params;
        const { booking_id, room_id,room_reserved_status,rate,no_of_guest,no_of_nights,
            date_from,date_to,package_id,checkIn,checkOut, updated_by, status } = req.body;


        try {
            let room_reserved = await Room_Reserved.findOne({
                where: {
                    room_reserved_id
                }
            });

            if(!room_reserved)
                return res.status(400).send(responseError(`Room Reserved with a room_reserved_id ${room_reserved_id} doesn't exist`));
        
            if(booking_id)
                room_reserved.booking_id = booking_id;

            if(room_id)
                room_reserved.room_id = room_id;

            if(room_reserved_status)
                room_reserved.room_reserved_status = room_reserved_status;

            if(rate)
                room_reserved.rate = rate;

            if(no_of_guest)
                room_reserved.no_of_guest = no_of_guest;

            if(no_of_nights)
                room_reserved.no_of_nights = no_of_nights;

            if(date_from)
                room_reserved.no_of_guest = date_from;

            if(date_to)
                room_reserved.date_to = date_to;

            if(package_id)
                room_reserved.package_id = package_id;

            if(checkIn)
                room_reserved.checkIn = checkIn;

            if(checkOut)
                room_reserved.checkOut = checkOut;

            if(updated_by)
                room_reserved.updated_by = updated_by;

            if(status)
                room_reserved.status = status;

            room_reserved.save();

            return res.send(responseSuccess([],`Room Reserve ${room_reserved_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { room_reserved_id } = req.body;

        if(!room_reserved_id)
            return res.status(400).send(responseError(`Please provide valid room_reserved_id that you are trying to delete.`));
        
        try {
            let room_reserved = await Room_Reserved.findOne({
                where: {
                    room_reserved_id
                }
            });

            if(!room_reserved)
                return res.status(400).send(responseError(`Room Reserved with the room_reserved_id ${room_reserved_id} doesn't exist!`));

            await room_reserved.destroy();

            return res.send(responseSuccess([],`Room Reserved ${room_reserved_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};