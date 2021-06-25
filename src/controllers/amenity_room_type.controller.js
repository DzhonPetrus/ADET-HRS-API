require('dotenv').config();
const db = require('../models');
const Amenity_room_type = db.amenity_room_types;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const amenity_room_types = await Amenity_room_type.findAll();
            res.send(responseSuccess(amenity_room_types));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { amenity_room_type_id } = req.params;

        try {
            const amenity_room_type = await Amenity_room_type.findOne({
                where: { amenity_room_type_id }
            });

            if(!amenity_room_type)
                return res.status(400).send({
                    message: `No amenity room type found with the amenity_room_type_id ${amenity_room_type_id}`
                });

            return res.send(responseSuccess(amenity_room_type));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { amenity_room_type_id, room_type_id, created_by, updated_by } = req.body;

        try{
            let newAmenity = await Amenity_room_type.create({
                amenity_room_type_id,
                room_type_id,
                created_by,
                updated_by 
            });

            return res.status(201).send(responseSuccess(newAmenity, `Amenity room type created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { amenity_room_type_id } = req.params;
        const { room_type_id, updated_by, status } = req.body;


        try {
            let amenity_room_type = await Amenity_room_type.findOne({
                where: {
                    amenity_room_type_id
                }
            });

            if(!amenity_room_type)
                return res.status(400).send(responseError(`Amenity room type with an amenity_room_type_id ${amenity_room_type_id} doesn't exist`));
        
            if(room_type_id)
                amenity_room_type.room_type_id = room_type_id;

            if(updated_by)
                amenity_room_type.updated_by = updated_by;

            if(status)
                amenity_room_type.status = status;

            amenity_room_type.save();

            return res.send(responseSuccess([],`Amenity room type ${amenity_room_type_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { amenity_room_type_id } = req.body;

        if(!amenity_room_type_id)
            return res.status(400).send(responseError(`Please provide valid amenity_room_type_id that you are trying to delete.`));
        
        try {
            let amenity = await Amenity_room_type.findOne({
                where: {
                    amenity_room_type_id
                }
            });

            if(!amenity)
                return res.status(400).send(responseError(`Amenity room type with the amenity_room_type_id ${amenity_room_type_id} doesn't exist!`));

            await amenity.destroy();

            return res.send(responseSuccess([],`Amenity room type ${amenity_room_type_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};