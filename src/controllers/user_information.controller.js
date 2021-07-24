require('dotenv').config();
const db = require('../models');
const User_Information = db.user_informations;
const Loyalty_Point = db.loyalty_points;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const user_informations = await User_Information.findAll({where :{status:"Active"},include: ["user", "created",'updated','loyalty_points']});
            res.send(responseSuccess(user_informations));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const {  user_info_id } = req.params;

        try {
            const user_information = await User_Information.findOne({
                where: {  user_info_id },
                include: ["user", "created",'updated','loyalty_points']
            });

            if(!user_information)
                return res.status(400).send({
                    message: `No user_information found with the user_info_id ${user_info_id}`
                });

            return res.send(responseSuccess(user_information));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let { email, first_name, user_id, middle_name, last_name, contact_no, street1, city1, zip1, state1, country1, street2, city2, zip2, state2, country2, birth_date, nationality, photo_url, loyalty_point_id, created_by } = req.body;
        created_by = req.user.id;

        photo_url = req.file != undefined ? req.file.filename: "";

        if(loyalty_point_id==undefined);
        let newLoyaltyPoint;
        try{
            
            newLoyaltyPoint = await Loyalty_Point.create({
                points: 0,
                created_by: req.user.id,
            });
        } catch (err){ console.log(err);res.status(500).send(responseError((err.errors.map(e => e.message)))) }
        console.log(newLoyaltyPoint);
        
        loyalty_point_id = newLoyaltyPoint.loyalty_point_id;

        try{
            let newUserInfo = await User_Information.create({
                email,
                user_id,
                first_name,
                middle_name,
                last_name,
                contact_no,
                street1,
                city1,
                zip1,
                state1,
                country1,
                street2,
                city2,
                zip2,
                state2,
                country2,
                birth_date,
                nationality,
                photo_url,
                loyalty_point_id,
                created_by 
            });

            let result = await User_Information.findByPk(newUserInfo.user_info_id, {include: ["user", 'created','loyalty_points']});

            return res.status(201).send(responseSuccess(result, `User Info created successfully.`));

        } catch (err){ console.log(err);res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { user_info_id } = req.params;
        let { email, first_name, user_id, middle_name, last_name, contact_no, street1, city1, zip1, state1, country1, street2, city2, zip2, state2, country2, birth_date, nationality, photo_url, loyalty_point_id, updated_by, status } = req.body;
        updated_by = req.user.id;

        photo_url = req.file != undefined ? req.file.filename: "";

        try {
            let user_information = await User_Information.findOne({
                where: {
                    user_info_id
                }
            });

            if(!user_information)
                return res.status(400).send(responseError(`User Info with an user_info_id ${user_info_id} doesn't exist`));
        
            if(email)
                user_information.email = email;

            if(user_id)
                user_information.user_id = user_id;

            if(first_name)
                user_information.first_name = first_name;

            if(middle_name)
                user_information.middle_name = middle_name;

            if(last_name)
                user_information.last_name = last_name;

            if(contact_no)
                user_information.contact_no = contact_no;

            if(street1)
                user_information.street1 = street1;

            if(city1)
                user_information.city1 = city1;

            if(zip1)
                user_information.zip1 = zip1;

            if(state1)
                user_information.state1 = state1;

            if(country1)
                user_information.country1 = country1;

            if(street2)
                user_information.street2 = street2;

            if(city2)
                user_information.city2 = city2;

            if(zip2)
                user_information.zip2 = zip2;

            if(state2)
                user_information.state2 = state2;

            if(country2)
                user_information.country2 = country2;

            if(birth_date)
                user_information.birth_date = birth_date;

            if(nationality)
                user_information.nationality = nationality;

            if(photo_url)
                user_information.photo_url = photo_url;

            if(updated_by)
                user_information.updated_by = updated_by;

            if(loyalty_point_id)
            user_information.loyalty_point_id = loyalty_point_id;

            if(status)
                user_information.status = status;

            user_information.save();

            let result = await User_Information.findByPk(user_information.user_info_id, {include: ["user", 'created', 'updated']});

            return res.send(responseSuccess(result,`User Info ${user_info_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { user_info_id } = req.body;

        if(!user_info_id)
            return res.status(400).send(responseError(`Please provide valid User Information id that you are trying to delete.`));
        
        try {
            let user_info = await User_Information.findOne({
                where: {
                    user_info_id
                }
            });

            if(!user_info)
                return res.status(400).send(responseError(`User Information with the id ${user_info_id} doesn't exist!`));

            // await user.destroy();

            user_info.status = 'Inactive';
            user_info.save();

            return res.send(responseSuccess(user_info,`User Information ${user_info_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ res.status(500).send(responseError(err)) }
    },

};