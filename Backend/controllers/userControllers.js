
const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const cloudinary = require('../config/cloudinary');


module.exports = {

    signUp: async (req, res) => {
        const user = await userModel.findOne({
            email: req.body.email
        });
        console.log(user);
        const userDetails = req.body;
        userDetails.profilePic = 'https://img.freepik.com/free-icon/user_318-159711.jpg'
        if (!user) {
            userModel.create({ ...userDetails }).then((data) => {
                const name = data.name;
                console.log(name, "User name vanuuuuuu");

                const token = jwt.sign({
                    userId: data._id, email: data.email
                }, "react", { expiresIn: "1h" });
                res.send({ data: data, token: token, name: name });
            }).catch((err) => {
                res.send({ err: 'Something went wrong' })
            });
        } else {
            res.send({ err: 'User already exists' });
        }
    },


    LogIn: async (req, res) => {

        const user = await userModel.findOne({
            email: req.body.email,
        })
        if (user) {
            if (user.password === req.body.password) {
                let token;
                token = jwt.sign({
                    userId: user.id, email: user.email
                }, "react", { expiresIn: "1h" }
                );
                const name = user.name;
                const phone = user.phone;
                const email = user.phone;
                
                res.send({ success: true, name: name, token: token, phone: phone, email: email });
            } else {
                res.send({ passErr: "Invalid password" })
            }
        } else {
            res.send({ emailErr: 'Invalid User' })
        }
    },

    getUser: async (req, res) => {

        console.log("working....", req.body.userId);
        try {
            const user = await userModel.findById({ _id: req.body.userId });
            console.log(user);
            res.send({
                success: true,
                message: "user fetched success",
                data: user
            })
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    },


    // logout: (req, res) => {
    //     console.log("reached here");
    //     const blacklist = [];
    //     const token = req.headers.authorization || req.body.token;
    //     console.log(token, "token vanuuu da logout avum ini");
    //     blacklist.push(token);
    //     res.send({ success: true, message: 'Logged out successfully' });
    // },


    uploadProfilepic: async (req, res) => {

        console.log("vanuu");
        try {

            // Access the uploaded file using req.file
            const file = req.file;
            console.log(file,"upload file");
            let result = await cloudinary.uploader.upload(file.path);
            console.log(' Image uploaded ----- ', result );
            const filename = file.filename;
            userModel.updateOne({_id: req.body.userId},{profilePic: result.url}).then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            });
            
            console.log(filename,"file name");

            if (!file) {
                console.log(file,"upload failed");
                res.status(400).send({
                    success: false,
                    message: "No file uploaded"
                });
                return;
            }

            const userId = req.body.userId;
            console.log(userId, "user id here");

            res.send({
                success: true,
                message: "Profile picture uploaded successfully",
                data: filename
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'error'
            });
        }
    }



}