const moongoose=require("mongoose")
const {Schema}=moongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },

});

module.exports = moongoose.model('order', OrderSchema)