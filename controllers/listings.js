import express from 'express';
import mongoose from 'mongoose';

import Listing from '../models/uploadListing.js';
import Image from '../models/image.js'
import User from '../models/user.js';
import { uploadImage } from '../helpers/imageUpload.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query || 1;
    const {category } = req.query || null;
    try {
        let posts = null;
        if(category){
            posts = await Listing.find({category});
            res.json({ data: posts});
            return;
        }
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    

        const total = await Listing.countDocuments({});
        posts = await Listing.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery} = req.query;

    try {
        const companyName  = new RegExp(searchQuery, "i");
        const posts = await Listing.find({    companyName } );

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Listing.findById(id).populate('comments');

        post.views = post.views + 1;
        post.save();
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;


    // console.log(post.productImages);
    const newListing = new Listing({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newListing.save();

        res.status(201).json(newListing);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {

    const { id } = req.params;
    const {companyName,  description,  logo,phoneNumber } = req.body;


    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { companyName,   logo, description,phoneNumber, _id: id };

    await Listing.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Listing.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Listing.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Listing.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}


export const rateAListing = async (req, res) => {
    try {
        const {id: _id } = req.params;
        const { rating } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json(`No post with id: ${_id}`);

        const listing = await Listing.findById(_id);

        listing.totalRating += rating;
        listing.ratingCount++;
        listing.averageRating =Math.round( listing.totalRating / listing.ratingCount, 2);

        listing.save();

        res.status(200).json(listing);




        
    } catch (error) {
        console.error(error);
    }
}


export const getOwnPosts = async (req, res) => {
    try {
        if (!req.userId){
            res.status(403).json({message: 'you need to login'});
            return;
        } 
        const posts = await Listing.find({creator: req.userId}).populate('productImages');
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const uploadProductImage = async (req, res) => {
    try {
        const {id} = req.params;
        if (req.file) {
            const productImage = req.file;
            const img =await uploadImage(productImage);

            const listing = await Listing.findById({_id: id});

            listing.productImages.push(img._id);
            listing.save();
            const ls = await Listing.findById({_id : id}).populate('productImages');
            res.status(201).json(ls)

        }else{
            res.status(404).json({message: 'there is no image file available in the request'});
        }
    } catch (error) {
        console.error(error);
    }
}



export const removeProductImage = async (req, res) => {
    try {
        const {productId} = req.params
        const { listingId} = req.body;
        const listing = await Listing.findById({_id: listingId});

        listing.productImages.filter(product => product !== productId);
        listing.save();
        await Image.findByIdAndRemove({_id: productId});

        res.status(200).json(listing);

    } catch (error) {
        console.log(error);
    }
};



export const postsByCategory= async (req, res, next) =>{
    try {
        const {catid} = req.query;
        const listing = await Listing.find({category: catid});
        console.log("here");
        res.status(200).json(listing);
    } catch (error) {
        console.log(error);
    }
}