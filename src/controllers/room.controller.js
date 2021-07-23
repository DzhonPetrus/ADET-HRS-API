require('dotenv').config();
const db = require('../models');
const Room = db.rooms;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Room.findAll({where :{status:"Active"},include: ["created",'updated','room_type','price']});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { room_id } = req.params;

        try {
            const room = await Room.findOne({
                where: { room_id },
                include: ["created",'updated','room_type','price']
            });

            if(!room)
                return res.status(400).send({
                    message: `No room found with the amenity_id ${room_id}`
                });

            return res.send(responseSuccess(room));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  room_no, room_type_id, description, min_guest, max_guest, pricing_id, room_status, additional_guest, rate_additional_guest, created_by, updated_by } = req.body;
        created_by = req.user.id;

        if(min_guest > max_guest)
            return res.status(406).send(responseError(`Minimum Guest must not be greater than Maximum Guest`));

        try{
            let newRoom = await Room.create({
                room_no,
                room_type_id,
                description,
                min_guest,
                max_guest,
                pricing_id,
                room_status,
                additional_guest,
                rate_additional_guest,
                created_by,
                updated_by 
            });

            let result = await Room.findByPk(newRoom.room_id, {include: ['created','room_type','price']});


            return res.status(201).send(responseSuccess(result, `Room created successfully.`));

        } catch (err){ console.log(err); res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { room_id } = req.params;
        let { room_no, room_type_id, description, min_guest, max_guest, pricing_id, room_status, additional_guest, rate_additional_guest, updated_by, status } = req.body;
        updated_by = req.user.id;

if(min_guest > max_guest)
            return res.status(406).send(responseError(`Minimum Guest From must not be greater than Maximum Guest`));

        try {
            let room = await Room.findOne({
                where: {
                     room_id
                }
            });

            if(!room)
                return res.status(400).send(responseError(`Room with an room_id ${room_id} doesn't exist`));
        
            if(room_no)
                room.room_no = room_no;

            if( room_type_id)
                room.room_type_id = room_type_id;

            if(description)
                room.description = description;

            if(min_guest)
                room.min_guest = min_guest;

            if(max_guest)
                room.max_guest = max_guest;

            if(pricing_id)
                room.pricing_id = pricing_id;

            if(room_status)
                room.room_status = room_status;

            if(additional_guest)
                room.additional_guest = additional_guest;

            if(rate_additional_guest)
                room.rate_additional_guest = rate_additional_guest;

            if(updated_by)
                room.updated_by = updated_by;

            if(status)
                room.status = status;

            room.save();

            let result = await Room.findByPk(room.room_id, {include: ['created', 'updated']});


            return res.send(responseSuccess(result,`Room ${room_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { room_id } = req.body;

        if(!room_id)
            return res.status(400).send(responseError(`Please provide valid Room id that you are trying to delete.`));
        
        try {
            let rooms = await Room.findOne({
                where: {
                    room_id
                }
            });

            if(!rooms)
                return res.status(400).send(responseError(`Room with the id ${room_id} doesn't exist!`));

            // await user.destroy();

            rooms.status = 'Inactive';
            rooms.save();

            return res.send(responseSuccess(rooms,`Room ${room_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};