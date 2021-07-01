const payment = (sequelize, DataTypes) => {

    const PROTECTED_ATTRIBUTES = [
        "password"
    ];


    const Payment = sequelize.define(
        'payments',
        {
            payment_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            booking_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'bookings',
                    key:'booking_id'
                }
            },
            mode:{
                type: DataTypes.STRING(60),
                allowNull: false 
            },
            ref_no:{
                type: DataTypes.STRING(60),
                allowNull: true 
            },
            payment_type:{
                type: DataTypes.STRING(60),
                allowNull: false 
            },
            payment_status:{
                type: DataTypes.STRING(60),
                allowNull: false 
            },
            amount:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            tax_code:{
                type: DataTypes.UUID,
                references: {
                    model: 'taxes',
                    key:'taxCode'
                } 
            },
            pd_code:{
                type: DataTypes.UUID,
                references: {
                    model: 'promos_and_discounts',
                    key:'pd_code'
                } 
            },
            process_by:{
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key:'id'
                } 
            },
            is_cancelled:{
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            is_refund:{
                type: DataTypes.BOOLEAN,
                allowNull:true
            },
            cancelled_refund_by:{
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key:'id'
                } 
            },
            date_cancelled_refund:{
                type: DataTypes.DATE,
                allowNull: true 
            },
            reason_cancelled_refund:{
                type: DataTypes.STRING(255),
                allowNull: true 
            },
            cancelled_refund_amt:{
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true 
            },
            created_by: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key:'id'
                }
            },
            updated_by: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key:'id'
                }
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "Active"
            },
        },
        {
            defaultScope: {
                attributes: { exclude: PROTECTED_ATTRIBUTES }
            },
            timestamps: true,
            createdAt: "date_created",
            updatedAt: "date_updated"

        }
    );

    return Payment;
}

module.exports = payment;

/* TODO FKs
booking_id
promos_and_discount(pd_code)
taxes(tax_code)
user_id(process_by AND cancelled_refund_by)

*/