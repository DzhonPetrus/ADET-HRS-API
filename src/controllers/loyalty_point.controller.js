require('dotenv').config();
const db = require('../models');
const Loyalty_point = db.loyalty_points;


const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const loyalty_points = await Loyalty_point.findAll({include: ["created", "updated"]});
            res.send(responseSuccess(loyalty_points));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const {loyalty_point_id } = req.params;

        try {
            const loyalty_point = await Loyalty_point.findOne({
                where: { loyalty_point_id },
                include: ["created", "updated"]
            });

            if(!loyalty_point)
                return res.status(400).send({
                    message: `No user found with the loyalty_point_id ${loyalty_point_id}`
                });

            return res.send(responseSuccess(loyalty_point));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { points, created_by, updated_by } = req.body;
        created_by = req.user.id;


        try{
            
            let newloyalty_point = await Loyalty_point.create({
                points,
                created_by,
                updated_by 
            });

            let result = await Loyalty_point.findByPk(newloyalty_point.loyalty_point_id, {include: 'created'});

            return res.status(201).send(responseSuccess(result, `Loyalty_point created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { loyalty_point_id } = req.params;
        let { points, updated_by, status } = req.body;
        updated_by = req.user.id;


        try {
            let loyalty_point = await Loyalty_point.findOne({
                where: {
                    loyalty_point_id
                }
            });

            if(!loyalty_point)
                return res.status(400).send(responseError(`Loyalty_points with an loyalty_point ${loyalty_point_id} doesn't exist`));
        
            if(points)
                loyalty_point.points = points;
                
            if(status)
                loyalty_point.status = status;

            if(updated_by)
                loyalty_point.updated_by = updated_by;

            loyalty_point.save();

            let result = await Loyalty_point.findByPk(loyalty_point.loyalty_point_id, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Loyalty_point ${loyalty_point_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { loyalty_point_id } = req.body;

        if(!loyalty_point_id)
            return res.status(400).send(responseError(`Please provide valid loyalty point id that you are trying to delete.`));
        
        try {
            let loyalty_point = await Loyalty_point.findOne({
                where: {
                    loyalty_point_id
                }
            });

            if(!loyalty_point)
                return res.status(400).send(responseError(`Loyalty Point with the id ${loyalty_point_id} doesn't exist!`));

            // await user.destroy();

            loyalty_point.status = 'Inactive';
            loyalty_point.save();

            return res.send(responseSuccess(loyalty_point,`Loyalty Point ${loyalty_point} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};