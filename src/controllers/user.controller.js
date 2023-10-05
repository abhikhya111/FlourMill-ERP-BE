const UserModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    console.log(password)
    try {
      const preuser = await UserModel.findOne({ email });
      if (preuser) {
        res.status(422).json({ error: "This email is already exist" });
    //   } else if (password !== cpassword) {
    //     res.status(422).json({ error: "password are not matching" });;
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const finaluser = new UserModel({
        email :email, password: hashedPassword, role :role
        });
  
        // yaha pe hasing krenge
  
        const storedata = await finaluser.save();
        // console.log(storedata + "user successfully added");
        res.status(201).json(storedata);
      }
    }
    catch (error) {
      res.status(500).json({ error: error.message });
  
    }
  };
  
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({ error: "fill the details" });
    }
  
    try {
  
      const userlogin = await UserModel.findOne({ email: email });
      const isMatch = await bcryptjs.compare(password, userlogin.password);
      if (userlogin) {
        console.log("is match", isMatch);
  
      } else {
        res.status(400).json({ error: "user not exist" });
      }
  
  
  
      if (!isMatch) {
        res.status(400).json({ error: "invalid crediential pass" });
      } else {
        // Generate a JWT token
        const token = jwt.sign({ userId: UserModel._id }, "MySecretKey", { expiresIn: '1d' });
        const tokenAdded = await UserModel.findOneAndUpdate(
          { email },
          { tokens: { token } },
          { new: true });
        res.cookie("AsmiBoutique", token, {
          expires: new Date(Date.now() + 2589000),
          httpOnly: true
        });
        // Send the token back to the user
        res.status(201).json({ userlogin, token });
      }
  
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.logout = async (req, res) => {
    try{
      res.status(200).json({ message: "Logout was successful" });
    }
    catch(err){
      console.log(error.message); 
    }
  }

  
