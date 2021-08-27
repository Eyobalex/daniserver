import RatingSchema from "../models/rating.js";
import mongoose from 'mongoose';



export const getRating = (req, res, next) => {
    RatingSchema.findById(req.params.ratingId, (err, rating) => {
        if (err){
            res.send(err);
        }

        res.json(rating);
    })
}

export const rate = (req, res, next) => {
    let rater = req.body.rater;

    RatingSchema.find({listing : req.body.listing}, (err, ratings) => {
        ratings.map( rating => {
            if (rating.rater === rater){
                res.send("You have already rated this listing")
            }

        })
    })
    let ratingN = new RatingSchema(req.body);
    ratingN.save((err, rating) => {
        if (err){
            res.send(err)
        }

        res.json(rating)
    })
}
