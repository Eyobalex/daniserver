import User from '../../models/user.js';
import mongoose from 'mongoose';


export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.status(200).json(users)
    } catch (error) {
        console.error(error);
    }
}

export const deleteUsers = async (req,res) => {
    try {
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "user id is not valid"});
        await User.findByIdAndRemove({_id: id});
        res.status(204).json({message: "user has been deleted"}); 
    } catch (error) {
        console.error(error);
    }
}


export const editUsers = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, role, verified} = req.body;
        if(! mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "user id is not valid"});

        const oldUser = await User.findByIdAndUpdate({_id: id}, {name: name, email: email, role: role, verified: verified}, {new: true});
        res.status(202).json(oldUser)
    } catch (error) {
        console.error(error );
    }
}