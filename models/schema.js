const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
    inventoryId: { type: String, ref: "User" },
    inventory_type: {type:String},
    item_name: {type:String},
    available_quantity:{type:Number},
    customer_id:{type:Number},
    customer_name:{type:String},
    email:{type:String},
});

const contactsModel = new mongoose.model("contacts", contactsSchema);
module.exports = contactsModel;