
import Comment from "../models/comment.js";
import Listing from "../models/uploadListing.js";
import mongoose from 'mongoose';
import User from "../models/user.js";



export const editComment = async (req, res, next) => {

    try {
        const {id: _id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: "comment id is not valid"}); 
        const updatedComment = await Comment.findByIdAndUpdate(_id, comment, {new: true});
        res.json(updatedComment);
    } catch (error) {
        console.log(error)
    }
    
}


export const createComment = async (req, res) => {
    console.log('create comment');
    try {
        const comment = req.body;
        const { postId } = req.params;        
        if(! mongoose.Types.ObjectId.isValid(postId)) return res.status(404).json({message: "post id is not valid"});
        const newComment = await new Comment(comment);
        await newComment.save();
        const listing = await Listing.findById(postId);
        listing.comments.push(newComment);
        await listing.save();
        res.status(201).json(listing);
        
    } catch (error) {
        res.status(409).json(error);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const {id: _id, postId} = req.params;
        if(! mongoose.Types.ObjectId.isValid(_id) && ! mongoose.Types.ObjectId.isValid(postId)) return res.status(404).json({message: "comment or post id is not valid"});
        await Comment.findByIdAndRemove(_id);
        const listing = await Listing.findById({_id : postId});
        listing.comments = listing.comments.filter(comment => String(comment) !== _id);
        listing.save();
       res.json(listing);
    } catch (error) {
        res.status(409).json(error);
        
    }
}