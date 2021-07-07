require('dotenv').config();
const db = require('../models');
const Loyalty_Point_History = db.loyalty_point_histories;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Loyalty_Point_History.findAll({where :{status:"Active"},include: ["created", "updated",'loyalty_point','booking']});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { lp_history_id } = req.params;

        try {
            const loyalty_point_history = await Loyalty_Point_History.findOne({
                where: { lp_history_id },
                include: ["created", "updated",'loyalty_point','booking']
            });

            if(!loyalty_point_history)
                return res.status(400).send({
                    message: `No Loyalty Point History found with the lp history id ${lp_history_id}`
                });

            return res.send(responseSuccess(loyalty_point_history));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { loyalty_point_id, booking_id, type, points, created_by, updated_by } = req.body;
        created_by = req.user.id;


        try{
            let newLPhistory = await Loyalty_Point_History.create({
                loyalty_point_id,
                booking_id,
                type,
                points,
                created_by,
                updated_by 
            });

            let result = await Loyalty_Point_History.findByPk(newLPhistory.lp_history_id, {include: ['created','booking','loyalty_point']});

            return res.status(201).send(responseSuccess(result, `Loyalty Point History created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { lp_history_id } = req.params;
        let { loyalty_point_id, booking_id, points, type, status, updated_by } = req.body;
        updated_by = req.user.id;


        try {
            let loyalty_point_history = await Loyalty_Point_History.findOne({
                where: {
                    lp_history_id
                }
            });

            if(!loyalty_point_history)
                return res.status(400).send(responseError(`Loyalty Point history with an id ${lp_history_id} doesn't exist`));
        
            if(loyalty_point_id)
                loyalty_point_history.loyalty_point_id = loyalty_point_id;
            
            if(booking_id)
                loyalty_point_history.booking_id = booking_id;

            if(points)
                loyalty_point_history.points = points;

            if(type)
                loyalty_point_history.type = type;

            if(status)
                loyalty_point_history.status = status;


            if(updated_by)
                loyalty_point_history.updated_by = updated_by;

            loyalty_point_history.save();

            let result = await Loyalty_Point_History.findByPk(loyalty_point_history.lp_history_id, {include: ['created', 'updated']});

            return res.send(responseSuccess(result,`Loyalty Point History ${lp_history_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { lp_history_id } = req.body;

        if(!lp_history_id)
            return res.status(400).send(responseError(`Please provide Loyalty Point History id that you are trying to delete.`));
        
        try {
            let lp_history = await Loyalty_Point_History.findOne({
                where: {
                    lp_history_id
                }
            });

            if(!lp_history)
                return res.status(400).send(responseError(`Loyalty Point History with the id ${lp_history_id} doesn't exist!`));

            // await user.destroy();

            lp_history.status = 'Inactive';
            lp_history.save();

            return res.send(responseSuccess(lp_history,`Loyalty Point History ${lp_history_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};