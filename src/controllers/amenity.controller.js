require('dotenv').config();
const db = require('../models');
const Amenity = db.amenities;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const amenities = await Amenity.findAll({where :{status:"Active"},include: ["created", "updated"]});
            res.send(responseSuccess(amenities));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { amenity_id } = req.params;

        try {
            const amenity = await Amenity.findOne({
                where: { amenity_id },
                include: ["created", "updated"]
            });

            if(!amenity)
                return res.status(400).send({
                    message: `No amenity found with the amenity_id ${amenity_id}`
                });

            return res.send(responseSuccess(amenity));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { type, description, created_by, updated_by } = req.body;
        created_by = req.user.id;
        
        try{
            let newAmenity = await Amenity.create({
                type,
                description,
                created_by,
                updated_by 
            });

            let result = await Amenity.findByPk(newAmenity.amenity_id, {include: 'created'});

            return res.status(201).send(responseSuccess(result, `Amenity created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { amenity_id } = req.params;
        let { type, description, updated_by, status } = req.body;
        updated_by = req.user.id;


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

            let result = await Amenity.findByPk(amenity.amenity_id, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Amenity ${amenity_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { amenity_id } = req.body;

        if(!amenity_id)
            return res.status(400).send(responseError(`Please provide valid amenity id that you are trying to delete.`));
        
        try {
            let amenity = await Amenity.findOne({
                where: {
                    amenity_id
                }
            });

            if(!amenity)
                return res.status(400).send(responseError(`Amenity with the id ${amenity_id} doesn't exist!`));

            // await user.destroy();

            amenity.status = 'Inactive';
            amenity.save();

            return res.send(responseSuccess(amenity,`Tax ${amenity_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },
};