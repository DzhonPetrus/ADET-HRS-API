require('dotenv').config();
const db = require('../models');
const Room_Reserved = db.room_reserves;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            let room_reserve;

            if(req.user.user_type.toLowerCase()=='customer'){
                console.log(req.user.user_type.toLowerCase()=='customer');
                console.log(req.user);
                room_reserve = await Room_Reserved.findAll({
                    where:{status:"Active"},
                    include:["created",'updated','booking','room','package']
                });
            }else room_reserve = await Room_Reserved.findAll({
                where:{status:"Active"},
                include:["created",'updated','booking','room','package']
            })
            res.send(responseSuccess(room_reserve));
        } catch (err){ console.log(err);res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { room_reserved_id } = req.params;

        try {
            const room_reserved = await Room_Reserved.findOne({
                where: { room_reserved_id },
                include: ["created",'updated','booking','room','package']
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
        created_by = req.user.id;


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

            const result = await Room_Reserved.findByPk(newRoomReserved.room_reserved_id, {include: ["created",'booking','room','package']});

            return res.status(201).send(responseSuccess(result, `Room Reserved created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { room_reserved_id } = req.params;
        let { booking_id, room_id,room_reserved_status,rate,no_of_guest,no_of_nights,
            date_from,date_to,package_id,checkIn,checkOut, updated_by, status } = req.body;
        updated_by = req.user.id;


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

            let result = await Room_Reserved.findByPk(room_reserved.room_reserved_id, {include: ["created","updated"]});

            return res.send(responseSuccess(result,`Room Reserve ${room_reserved_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { room_reserved_id } = req.body;

        if(!room_reserved_id)
            return res.status(400).send(responseError(`Please provide valid Room Reserve id that you are trying to delete.`));
        
        try {
            let room_reserve = await Room_Reserved.findOne({
                where: {
                    room_reserved_id
                }
            });

            if(!room_reserved_id)
                return res.status(400).send(responseError(`Room Reserve with the id ${room_reserved_id} doesn't exist!`));

            // await user.destroy();

            room_reserve.status = 'Inactive';
            room_reserve.save();

            return res.send(responseSuccess(room_reserve,`Room Reserve ${room_reserved_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ console.log(err);res.status(500).send(responseError(err)) }
    },


};