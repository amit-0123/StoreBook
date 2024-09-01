// Importing the required modules:

// express: The Express.js library for creating a web server and handling routes.
const express = require('express');

// User: The Mongoose model for the user, defined in another file.
const User = require('../models/User');

// express.Router(): Used to create a new router object to handle routes.
const router = express.Router();

// express-validator: A library used for validating and sanitizing user input.
const { body, validationResult } = require('express-validator');    //express-validator middleware to validate the input:

const bcrypt = require('bcryptjs');

// jwt tocken to varify the legitiate user
// Synchronous Sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'Harryisagood$boy';


//ROUT 1: create a user using :POST "/api/auth/createuser". No login required
router.post('/createuser',
    [body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    ], async (req, res) => {

        let success=false;

        // If there are error, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() })
        }

        // check whether the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "Sorry a user with this email already exist" })
            }

            // To hash a password:  for this we use bcrypt package
            const salt = await bcrypt.genSaltSync(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log(jwtData);
            success=true;
            res.json({success,authtoken});

            // Responds with the created user object in JSON format.
            // res.json({user});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }


        //   .then(user => res.json(user))
        //   .catch(err=>console.log(err))
        //   res.json({error: 'Please enter a unique value for email',message:err.message})

        // console.log(req.body);
        // const user = User(req.body);   //made new user
        // user.save()
        // res.send(req.body);
    })

    // ROUT 2: Authenticate a user using :POST "/api/auth/login". No login required
    router.post('/login',
        [body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a valid password').isLength({ min: 5 }),
        ], async (req, res) => {
          let success=false;
            // If there are error, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // destructuring to fetch out email, password
        const {email,password} = req.body;
        try{
           let user = await User.findOne({email});
           if(!user){
              return res.status(400).json({error:"Please try to login with correct credential"});
           }

           const passwordCompare = await bcrypt.compare(password,user.password);
           if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credential"});
           }

           const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authtoken});

        }
        catch(error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
        })

        // ROUT 3: Get loggedin user details using :POST "/api/auth/getuser". login required

        router.post('/getUser',fetchuser, async(req, res) => {
            try{
               userId = req.user.id;
               const user =  await User.findById(userId).select("-password"); 
               res.send(user);
            }
            catch(error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
            }
        })
module.exports = router

