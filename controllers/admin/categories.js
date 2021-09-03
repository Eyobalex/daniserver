import Category from "../../models/category.js"
import mongoose from 'mongoose';

export const getCategories= async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories)
    } catch (error) {
        console.error(error);
    }
}


export const createCategories = async (req, res) => {
    try {
        // if(!req.userId){
        //     res.status(403).json({message: "you need to login"});
        //     return;
        // } 
        const {name, faicon} = req.body;
        const newCategory = await Category.create({name, fa_icon: faicon});

        res.status(201).json(newCategory)
        
    } catch (error) {
        console.error(error);
    }
}

export const editCategories= async (req, res) => {
    try {
        const {id} = req.params;
        const {name, faicon} =req.body;

        // console.log( req.body );
        if(! mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "category id is not valid"});

        const oldCategory = await Category.findByIdAndUpdate({_id: id}, {name, fa_icon: faicon}, {new: true});
        res.status(202).json(oldCategory);


    } catch (error) {
        console.error(error);
    }
}

export const deleteCategories= async (req, res) => {
    try {
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "category id is not valid"});
        await Category.findByIdAndRemove({_id: id});
        res.status(204).json({message: "category has been deleted"}) 
    } catch (error) {
        console.error(error);
    }
}