import User from '../models/user.js';



export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.status(200).json(users)
    } catch (error) {
        console.error(error);
    }
}