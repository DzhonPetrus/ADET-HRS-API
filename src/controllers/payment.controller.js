require('dotenv').config();
const db = require('../models');
const Payment = db.payments;

const { responseError, responseSuccess } = require('../utils/responseFormat');

module.exports = {
    findAll: async (req, res) => {
        try{
            const users = await Payment.findAll({where :{status:"Active"},include: ["created",'updated','booking','tax','promo_discount','processed_by','canceled_by']});
            res.send(responseSuccess(users));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }
    },
    findOne: async (req, res) => {
        const { payment_id } = req.params;

        try {
            const payment = await Payment.findOne({
                where: { payment_id },
                include: ["created",'updated','booking','tax','promo_discount','processed_by','canceled_by']
            });

            if(!payment)
                return res.status(400).send({
                    message: `No payment found with the payment_id ${payment_id}`
                });

            return res.send(responseSuccess(payment));
        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    create: async (req, res) => {
        let {  booking_id, mode, ref_no, payment_type,payment_status,amount,tax_code,pd_code,process_by,is_cancelled,is_refund,cancelled_refund_by,date_cancelled_refund,
            reason_cancelled_refund,cancelled_refund_amt, created_by, updated_by } = req.body;
        created_by = req.user.id;
        process_by = req.user.id;

        try{
            let newPayment = await Payment.create({
                booking_id,
                mode,
                ref_no,
                payment_type,
                payment_status,
                amount,
                tax_code,
                pd_code,
                process_by,
                is_cancelled,
                is_refund,
                cancelled_refund_by,
                date_cancelled_refund,
                reason_cancelled_refund,
                cancelled_refund_amt,
                created_by,
                updated_by 
            });

            const result = await Payment.findByPk(newPayment.payment_id, {include: ["created",'booking','tax','promo_discount','processed_by','canceled_by']});


            return res.status(201).send(responseSuccess(result, `Payment created successfully.`));

        } catch (err){ res.status(500).send(responseError((err.errors.map(e => e.message)))) }

    },
    update: async (req, res) => {
        const { payment_id } = req.params;
        let { booking_id, mode, ref_no, payment_type,payment_status,amount,tax_code,pd_code,process_by,is_cancelled,is_refund,cancelled_refund_by,date_cancelled_refund,
            reason_cancelled_refund,cancelled_refund_amt, updated_by, status } = req.body;
        updated_by = req.user.id;


        try {
            let payment = await Payment.findOne({
                where: {
                    payment_id
                }
            });

            if(!payment)
                return res.status(400).send(responseError(`Payment with an payment_id ${payment_id} doesn't exist`));
        
            if(booking_id)
                payment.booking_id = booking_id;

            if(mode)
                payment.mode = mode;
            if(ref_no)
                payment.ref_no = ref_no;
            if(payment_type)
                payment.payment_type = payment_type;
            if(payment_status)
                payment.payment_status = payment_status;
            if(amount)
                payment.amount = amount;
            if(tax_code)
                payment.tax_code = tax_code;
            if(pd_code)
                payment.pd_code = pd_code;

            if(process_by)
                payment.process_by = process_by;
            
            if(is_cancelled)
                payment.is_cancelled = is_cancelled;
            
            if(is_refund)
                payment.is_refund = is_refund;
            
            if(cancelled_refund_by)
                payment.cancelled_refund_by = cancelled_refund_by;
            
            if(date_cancelled_refund)
                payment.date_cancelled_refund = date_cancelled_refund;
               
            if(reason_cancelled_refund)
                payment.reason_cancelled_refund = reason_cancelled_refund;

            if(cancelled_refund_amt)
                payment.cancelled_refund_amt = cancelled_refund_amt;

            if(updated_by)
                payment.updated_by = updated_by;

            if(status)
                payment.status = status;

            payment.save();

            let result = await Payment.findByPk(payment.payment_id, {include: ["created","updated"]});


            return res.send(responseSuccess(result,`Payment ${payment_id} has been updated!`));
        } catch (err){ res.status(500).send(responseError(err)) }
    },
    destroy: async (req, res) => {
        const { payment_id } = req.body;

        if(!payment_id)
            return res.status(400).send(responseError(`Please provide valid Payment id that you are trying to delete.`));
        
        try {
            let payment = await Payment.findOne({
                where: {
                    payment_id
                }
            });

            if(!payment_id)
                return res.status(400).send(responseError(`Payment with the id ${payment_id} doesn't exist!`));

            // await user.destroy();

            payment.status = 'Inactive';
            payment.save();

            return res.send(responseSuccess(payment,`Payment ${payment_id} has been deactivated!`));
            // return res.send(responseSuccess([],`User ${id} has been deleted!`));

        } catch (err){ console.log(err);res.status(500).send(responseError(err)) }
    },

};