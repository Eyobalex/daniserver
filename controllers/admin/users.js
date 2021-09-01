import User from '../../models/user.js';



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
        if(! mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: "user id is not valid"});
        await User.findByIdAndRemove({_id: id});
        res.status(204).json({message: "user has been deleted"}); 
    } catch (error) {
        console.error(error);
    }
}