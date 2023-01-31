const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const dotenv=require("dotenv");
const mongoose=require('mongoose');
const contactsModel=require('./models/schema');
dotenv.config();
app.use(bodyParser.json())
mongoose.set("strictQuery",false);

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>{
    console.log("connected to db");
    app.listen(3005,()=>console.log("server running"))
})
app.set("view engine","ejs");
//get
app.get('/inventory',async(req,res)=>{
    try{
    const orders=await contactsModel.find({inventoryId:req.user})
        res.json({
            orders
        })
    }catch(err){
        res.json({
            message:err.message,
        })
    }
})
//get
app.get('/inventory/electronics',async(req,res)=>{
    try{
    const electronics=await contactsModel.findOne({inventory_type:req.body.inventory_type})
    if(electronics.inventory_type){
        res.json({
            electronics
        })
    }else{
        res.status(404).json({
            status:"failed",
            message:"failed"
        })
    }
    }catch(err){
        res.json({
            message:err.message,
        })
    }
})
app.get('/inventory/furniture',async(req,res)=>{
    try{
    const furniture=await contactsModel.findOne({item_name:req.body.item_name})
    if(furniture.item_name){
        res.json({
            furniture
        })
    }else{
        res.status(404).json({
            status:"failed",
            message:"failed"
        })
    }
    }catch(err){
        res.json({
            message:err.message,
        })
    }
})
app.get('/inventory/furniture',async(req,res)=>{
    try{
    const furniture=await contactsModel.findOne({item_name:req.body.item_name})
    if(furniture.item_name){
        res.json({
            furniture
        })
    }else{
        res.status(404).json({
            status:"failed",
            message:"failed"
        })
    }
    }catch(err){
        res.json({
            message:err.message,
        })
    }
})
app.get('/orders',async(req,res)=>{
    try{
    const furniture=await contactsModel.findOne({available_quantity:req.body.available_quantity})
    if(furniture.available_quantity){
        res.json({
            furniture
        })
    }else{
        res.status(404).json({
            status:"failed",
            message:"failed"
        })
    }
    }catch(err){
        res.json({
            message:err.message,
        })
    }
})
app.get('/customerDetails',async(req,res)=>{
    const data=req.body;
    try{
    const furniture=await contactsModel.find({customer_id:data.customer_id,
        customer_name:data.customer_name,
        email:data.email})
        res.json({
            furniture
        })
    }catch(err){
        res.json({
            message:err.message,
        })
    }
})
app.get('/inventory/inventoryType',async(req,res)=>{
    const data=req.body;
    try{
    const furniture=await contactsModel.find({inventoryId: req.user,
        inventory_type:data.inventory_type,})
        res.json({
            furniture
        })
    }catch(err){
        res.json({
            message:err.message,
        })
    }
})
app.get('/itemName/availableQuantity',async(req,res)=>{
    const data=req.body;
    try{
    const furniture=await contactsModel.find({item_name:data.item_name,
        available_quantity:data.available_quantity,})
        res.json({
            furniture
        })
    }catch(err){
        res.json({
            message:err.message,
        })
    }
})
//post
app.post('/inventory',async (req,res)=>{
    const data=req.body;
    try{
        console.log(req.body);
        await contactsModel.create({
            inventoryId: req.user,
            inventory_type:data.inventory_type,
            item_name:data.item_name,
            available_quantity:data.available_quantity,
            customer_id:data.customer_id,
            customer_name:data.customer_name,
            email:data.email,
        })
        res.json({
            data,
        })
    }catch(error){
        res.json({
            message:error.message
        })
    }
}) 