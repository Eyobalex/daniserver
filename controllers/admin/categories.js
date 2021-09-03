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
        if(!req.userId){
            res.status(403).json({message: "you need to login"});
            return;
        } 
        const {category, faicon} = req.body;
        const newCategory = await Category.create({name: category, fa_icon: faicon});

        res.status(201).json(newCategory)
        
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