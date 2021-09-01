import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';
import UserModal from "../models/user.js";

 const secret=process.env.SECRET
 const userEmail=process.env.GMAIL_USER
 const passwordEmail=process.env.GMAIL_PASS
export const signin = async (req, res) => {
  const { email, password,verified } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    if (!oldUser.verified) {
        return res.status(400).json({ message: "please confirm your email" });
      }
    

  
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
   console.log(req.body);
  try {
    const oldUser = await UserModal.findOne({ email:email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email:email, password: hashedPassword ,name: `${firstName} ${lastName}` });
 

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    const CLIENT_URL = 'http://' + req.headers.host;

    const output = `
    <h2>Please click on below link to activate your account</h2>
    <p>${CLIENT_URL}/auth/activate/${token}</p>
    <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
           
            user: userEmail,
            pass: passwordEmail,
            clientId: "17128527024-8hg3f3s9m5lh69ejdsb9d4m9dc2jt4b8.apps.googleusercontent.com"
            
        },
    });
       // send mail with defined transport object
       const mailOptions = {
        from: userEmail, // sender address
        to: email, // list of receivers
        subject: "Account Verification: NodeJS Auth ✔", // Subject line
        generateTextFromHTML: true,
        html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
           req.flash(
                'error_msg',
                'Something went wrong on our end. Please register again.'
            );
            res.redirect('http://localhost:3000/auth/');
        }
        else {
            console.log('Mail sent : %s', info.response);
           req.flash(
                'success_msg',
                'Activation link sent to email ID. Please activate to log in.'
            );
            res.redirect('http://localhost:3000/auth');
        }
    })
  
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }


  
};
export const activateHandle = (req, res) => {
  const token = req.params.token;
  /*let errors = [];
  if (token) {
      jwt.verify(token, JWT_KEY, (err, decodedToken) => {
          if (err) {
              req.flash(
                  'error_msg',
                  'Incorrect or expired link! Please register again.'
              );
              res.redirect('/auth/register');
          }
          else {
              const { name, email, password } = decodedToken;
              User.findOne({ email: email }).then(user => {
                  if (user) {
                      //------------ User already exists ------------//
                      req.flash(
                          'error_msg',
                          'Email ID already registered! Please log in.'
                      );
                      res.redirect('/auth');
                  } else {
                      const newUser = new User({
                          name,
                          email,
                          password
                      });

                      bcryptjs.genSalt(10, (err, salt) => {
                          bcryptjs.hash(newUser.password, salt, (err, hash) => {
                              if (err) throw err;
                              newUser.password = hash;
                              newUser
                                  .save()
                                  .then(user => {
                                      req.flash(
                                          'success_msg',
                                          'Account activated. You can now log in.'
                                      );
                                      res.redirect('/auth');
                                  })
                                  .catch(err => console.log(err));
                          });
                      });
                  }
              });
          }

      })
  }
  else {
      console.log("Account activation error!")
  }*/
}



  /************************* */



export default user;