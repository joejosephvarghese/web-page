const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        // console.log("headers : ", req.header('authorization'));
        // console.log("someyhingfiadnlfsdkbfsdlffishy *(*&YT&*)(*&Y&*(*")
        let token = req.header('authorization').split(' ')[1];
        token = token.replaceAll('"', '');
        console.log("token : ", token);
        const decryptedToken = jwt.verify(token, 'react');
        req.body.adminId = decryptedToken.adminId;
        next()
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}