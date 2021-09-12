// require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import user from './controllers/user.js'
import postRoutes from './routes/listings.js';
import userRouter from "./routes/user.js";
import  commentRouter  from './routes/commentRouter.js';
import  ratingRouter  from './routes/ratingRouter.js';
import  adminRouter  from './routes/admin.js';
import jwt from "jsonwebtoken";
const secret=process.env.SECRET;
import nodemailer from 'nodemailer';
const app = express();
/*app.use(flash());*/
app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());

app.get('/auth/activate/:token', async (req, res) => {
  try {
    const newuser = jwt.verify(req.params.token, secret );
    console.log(newuser);
    //await user.update({ verified: true }, { where: { _id:newuser.id } });
    const nw=await user.findOne({email:newuser.email  });
   await nw.updateOne({ $set : {verified: true} });

  } 
  catch (e) {
    console.log(e);
   return res.send(e.message);
  }

  return res.redirect('http://localhost:3000/auth');
});
app.use('/comment',commentRouter);
app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use('/rating',ratingRouter);
app.use('/admin',adminRouter);
app.use('/images', express.static('uploads/images'))

const CONNECTION_URL ='mongodb+srv://businessDir:businessDir123@cluster0.bqxqx.mongodb.net/BusinessDirectoryDatabase?retryWrites=true&w=majority'
const url = "mongodb://localhost:27017/yompage"

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);