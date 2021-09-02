import jwt from "jsonwebtoken";
import User from "../models/user.js";
const secret=process.env.SECRET

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization){
       res.status(403).json({message: "you need to be logged in "}); 
       return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      // console.log(decodedData);
      const user = await User.findById({_id: decodedData.id});
      req.userId = decodedData.id;
      req.userRole = user.role;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
