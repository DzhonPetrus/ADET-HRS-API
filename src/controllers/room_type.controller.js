require('dotenv').config();
const db = require('../models');
const Room_type = db.room_types;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Room_type.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { room_type_id } = req.params;

        try {
            const room_type = await Room_type.findOne({
                where: { room_type_id }
            });

            if(!room_type)
                return res.status(400).send({
                    message: `No Room Type found with the room_type_id ${room_type_id}`
                });

            return res.send(responseSuccess(room_type));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  min_guest, max_guest,pricing_id,type,description,rate_additional,additional_guest, created_by, updated_by } = req.body;

        try{
            let newRoom_type = await Room_type.create({
                min_guest,
                max_guest,
                pricing_id,
                type,
                description,
                rate_additional,
                additional_guest,
                created_by,
                updated_by 
            });

            return res.status(201).send(responseSuccess(newRoom_type, `Room Type created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { room_type_id } = req.params;
        const { min_guest, max_guest,pricing_id,type,description,rate_additional,additional_guest, updated_by, status } = req.body;


        try {
            let room_type = await Room_type.findOne({
                where: {
                    room_type_id
                }
            });

            if(!room_type)
                return res.status(400).send(responseError(`Room Type with  room_type_id ${room_type_id} doesn't exist`));
        
            if(min_guest)
                room_type.min_guest = min_guest;

            if(max_guest)
                room_type.max_guest = max_guest;
            
            if(pricing_id)
                room_type.pricing_id = pricing_id;

            if(type)
                room_type.type = type;
            
            if(rate_additional)
                room_type.rate_additional = rate_additional;

            if(additional_guest)
                room_type.additional_guest = additional_guest;

            if(description)
                room_type.description = description;

            if(updated_by)
                room_type.updated_by = updated_by;

            if(status)
                room_type.status = status;

            room_type.save();

            return res.send(responseSuccess([],`Room Type ${room_type_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { room_type_id } = req.body;

        if(!room_type_id)
            return res.status(400).send(responseError(`Please provide valid room_type_id that you are trying to delete.`));
        
        try {
            let room_type = await Room_type.findOne({
                where: {
                    room_type_id
                }
            });

            if(!room_type)
                return res.status(400).send(responseError(`Room Type with the amenity_id ${room_type_id} doesn't exist!`));

            await room_type.destroy();

            return res.send(responseSuccess([],`Room Type ${room_type_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};