require('dotenv').config();
const db = require('../models');
const Room_type = db.room_types;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Room_type.findAll({where :{status:"Active"},include: ["created",'updated','price']});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { room_type_id } = req.params;

        try {
            const room_type = await Room_type.findOne({
                where: { room_type_id },
                include: ["created",'updated','price']
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
        created_by = req.user.id;

        if(min_guest > max_guest)
            return res.status(406).send(responseError(`Minimum Guest must not be greater than Maximum Guest`));

        photo_url = req.file != undefined ? req.file.filename: "";

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
                updated_by,
                photo_url
            });

            let result = await Room_type.findByPk(newRoom_type.room_type_id, {include: ["created",'price']});

            return res.status(201).send(responseSuccess(result, `Room Type created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { room_type_id } = req.params;
        let { min_guest, max_guest,pricing_id,type,description,rate_additional,additional_guest, updated_by, status } = req.body;
        updated_by = req.user.id;
        photo_url = req.file != undefined ? req.file.filename: "";

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

            if(photo_url)
                room_type.photo_url = photo_url;

            room_type.save();

            let result = await Room_type.findByPk(room_type.room_type_id, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Room Type ${room_type_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { room_type_id } = req.body;

        if(!room_type_id)
            return res.status(400).send(responseError(`Please provide valid Room Type id that you are trying to delete.`));
        
        try {
            let room_type = await Room_type.findOne({
                where: {
                    room_type_id
                }
            });

            if(!room_type)
                return res.status(400).send(responseError(`Room Type with the id ${room_type_id} doesn't exist!`));

            // await user.destroy();

            room_type.status = 'Inactive';
            room_type.save();

            return res.send(responseSuccess(room_type,`Room Type ${room_type_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};