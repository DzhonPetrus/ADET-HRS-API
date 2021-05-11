require('dotenv').config();
const db = require('../models');
const Amenity = db.amenities;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Amenity.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { amenity_id } = req.params;

        try {
            const amenity = await Amenity.findOne({
                where: { amenity_id }
            });

            if(!amenity)
                return res.status(400).send({
                    message: `No amenity found with the amenity_id ${amenity_id}`
                });

            return res.send(responseSuccess(amenity));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  type, description, created_by, updated_by } = req.body;

        try{
            let newAmenity = await Amenity.create({
                type,
                description,
                created_by,
                updated_by 
            });

            return res.status(201).send(responseSuccess(newAmenity, `Amenity created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { amenity_id } = req.params;
        const { type, description, updated_by, status } = req.body;


        try {
            let amenity = await Amenity.findOne({
                where: {
                    amenity_id
                }
            });

            if(!amenity)
                return res.status(400).send(responseError(`Amenity with an amenity_id ${amenity_id} doesn't exist`));
        
            if(type)
                amenity.type = type;

            if(description)
                amenity.description = description;

            if(updated_by)
                amenity.updated_by = updated_by;

            if(status)
                amenity.status = status;

            amenity.save();

            return res.send(responseSuccess([],`Amenity ${amenity_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { amenity_id } = req.body;

        if(!amenity_id)
            return res.status(400).send(responseError(`Please provide valid amenity_id that you are trying to delete.`));
        
        try {
            let amenity = await Amenity.findOne({
                where: {
                    amenity_id
                }
            });

            if(!amenity)
                return res.status(400).send(responseError(`Amenity with the amenity_id ${amenity_id} doesn't exist!`));

            await amenity.destroy();

            return res.send(responseSuccess([],`Amenity ${amenity_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};