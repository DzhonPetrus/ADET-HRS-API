require('dotenv').config();
const db = require('../models');
const Amenity_room_type = db.amenity_room_types;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const amenity_room_types = await Amenity_room_type.findAll({where :{status:"Active"},include: ["created", "updated"]});
            res.send(responseSuccess(amenity_room_types));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { amenity_room_type_id } = req.params;

        try {
            const amenity_room_type = await Amenity_room_type.findOne({
                where: { amenity_room_type_id },
                include: ["created", "updated"]
            });

            if(!amenity_room_type)
                return res.status(400).send({
                    message: `No amenity room type found with the amenity_room_type_id ${amenity_room_type_id}`
                });

            return res.send(responseSuccess(amenity_room_type));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  amenity_id, room_type_id, created_by, updated_by } = req.body;
        created_by = req.user.id;

        try{
            let newAmenity = await Amenity_room_type.create({
                amenity_id,
                room_type_id,
                created_by,
                updated_by 
            });

            let result = await Amenity_room_type.findByPk(newAmenity.amenity_room_type_id, {include: ["created"]});
                

            return res.status(201).send(responseSuccess(result, `Amenity room type created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { amenity_room_type_id } = req.params;
        let { amenity_id, room_type_id, updated_by, status } = req.body;
        updated_by = req.user.id;


        try {
            let amenity_room_type = await Amenity_room_type.findOne({
                where: {
                    amenity_room_type_id
                }
            });

            if(!amenity_room_type)
                return res.status(400).send(responseError(`Amenity room type with an amenity_room_type_id ${amenity_room_type_id} doesn't exist`));
        
            if(amenity_id)
                amenity_room_type.amenity_id = amenity_id;

            if(room_type_id)
                amenity_room_type.room_type_id = room_type_id;

            if(updated_by)
                amenity_room_type.updated_by = updated_by;

            if(status)
                amenity_room_type.status = status;

            amenity_room_type.save();

            let result = await Amenity_room_type.findByPk(amenity_room_type.amenity_room_type_id, {include: ['created', 'updated']});

            return res.send(responseSuccess(result, `Amenity room type ${amenity_room_type_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { amenity_room_type_id } = req.body;

        if(!amenity_room_type_id)
            return res.status(400).send(responseError(`Please provide valid Room Type id that you are trying to delete.`));
        
        try {
            let amenity_room_type = await Amenity_room_type.findOne({
                where: {
                    amenity_room_type_id
                }
            });

            if(!amenity_room_type)
                return res.status(400).send(responseError(`Room Type with the id ${amenity_room_type_id} doesn't exist!`));

            // await user.destroy();

            amenity_room_type.status = 'Inactive';
            amenity_room_type.save();

            return res.send(responseSuccess(amenity_room_type,`Room Type ${amenity_room_type_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },


};