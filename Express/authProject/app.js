require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");




const app = express();

app.use(express.json());

// import User context
const User = require("./model/user");

// register
app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
// login

app.post("/login", async (req, res) => {
    try{
        const {email,password} = req.body;

        if(!(email && password))
        {
            res.status(400).send("All inputs are required");
        }
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password,user.password)))
        {
            const token = jwt.sign(
                {user_id:user._id,email},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h",
                }
            );
            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    }
    catch(err){
        console.log(err);
    }
});

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

module.exports = app;
