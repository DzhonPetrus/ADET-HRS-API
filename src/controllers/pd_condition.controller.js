require('dotenv').config();
const db = require('../models');
const Pd_Condition = db.pd_conditions;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const pd_conditions = await Pd_Condition.findAll();
            res.send(responseSuccess(pd_conditions));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { condition_code } = req.params;

        try {
            const pd_condition = await Pd_Condition.findOne({
                where: { condition_code }
            });

            if(!pd_condition)
                return res.status(400).send({
                    message: `No pd_condition found with the condition_code ${condition_code}`
                });

            return res.send(responseSuccess(pd_condition));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { min_duration, duration, min_guest, max_guest, limit, created_by } = req.body;

        try{
            let newPd_Condition = await Pd_Condition.create({ min_duration, duration, min_guest, max_guest, limit, created_by });

            return res.status(201).send(responseSuccess(newPd_Condition, `Pd_Condition created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { condition_code } = req.params;
        let { min_duration, duration, min_guest, max_guest, limit, updated_by, status } = req.body;

        try {
            let pd_condition = await Pd_Condition.findOne({
                where: {
                    condition_code
                }
            });

            if(!pd_condition)
                return res.status(400).send(responseError(`Pd_Condition with an condition_code ${condition_code} doesn't exist`));
        
            if(min_duration)
                pd_condition.min_duration = min_duration;

            if(duration)
                pd_condition.duration = duration;

            if(min_guest)
                pd_condition.min_guest = min_guest;

            if(max_guest)
                pd_condition.max_guest = max_guest;

            if(limit)
                pd_condition.limit = limit;

            if(updated_by)
                pd_condition.updated_by = updated_by;

            if(status)
                pd_condition.status = status;

            pd_condition.save();

            return res.send(responseSuccess([],`Pd_Condition ${condition_code} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { condition_code } = req.body;

        if(!condition_code)
            return res.status(400).send(responseError(`Please provide valid condition_code that you are trying to delete.`));
        
        try {
            let pd_condition = await Pd_Condition.findOne({
                where: {
                    condition_code
                }
            });

            if(!pd_condition)
                return res.status(400).send(responseError(`Pd_Condition with the condition_code ${condition_code} doesn't exist!`));

            await pd_condition.destroy();

            return res.send(responseSuccess([],`Pd_Condition ${condition_code} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};