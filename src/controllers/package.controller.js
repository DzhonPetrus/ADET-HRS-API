require('dotenv').config();
const db = require('../models');
const Package = db.packages;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Package.findAll();
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { package_id } = req.params;

        try {
            const package = await Package.findOne({
                where: { package_id }
            });

            if(!package)
                return res.status(400).send({
                    message: `No package found with the package_id ${package_id}`
                });

            return res.send(responseSuccess(package));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  min_guest, max_guest,pricing_id,roomType,description, created_by, updated_by } = req.body;

        try{
            let newPackage = await Package.create({
                min_guest,
                max_guest,
                pricing_id,
                roomType,
                description,
                created_by,
                updated_by 
            });

            return res.status(201).send(responseSuccess(newPackage, `Package created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { package_id } = req.params;
        const { min_guest, max_guest,pricing_id,roomType,description, updated_by, status } = req.body;


        try {
            let package = await Package.findOne({
                where: {
                    package_id
                }
            });

            if(!package)
                return res.status(400).send(responseError(`Pacakage with an package_id ${package_id} doesn't exist`));
        
            if(max_guest)
                package.max_guest = max_guest;

            if(min_guest)
                package.min_guest = min_guest;
            
            if(description)
            package.description = description;

            if(pricing_id)
            package.pricing_id = pricing_id;

            if(roomType)
            package.roomType = roomType;

            if(updated_by)
                package.updated_by = updated_by;

            if(status)
                package.status = status;

            package.save();

            return res.send(responseSuccess([],`Package ${package_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { package_id } = req.body;

        if(!package_id)
            return res.status(400).send(responseError(`Please provide valid package_id that you are trying to delete.`));
        
        try {
            let package = await Package.findOne({
                where: {
                    package_id
                }
            });

            if(!package)
                return res.status(400).send(responseError(`Package with the package_id ${package_id} doesn't exist!`));

            await package.destroy();

            return res.send(responseSuccess([],`Package ${package_id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};