const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");


module.exports = {
   
    adminLogin: (req, res)=> {

        const admin = {email:'admin@gmail.com', password:'123'}

        if(admin.email === req.body.email){
            if(admin.password === req.body.password){
                let token;
                token = jwt.sign({
                    adminId: admin.password}, 'react',{expiresIn: "1h"}
                    );
                res.send({success: true, token: token}); 
            }else{
                res.send({passErr: "Invalid password"})
            }
        }else{
            res.send({emailErr: 'Invalid admin'})
        }

    },


    getUser: async (req, res)=> {
        const users=await userModel.find().exec();
        res.send(users)
    },

    editUser: async (req, res) => {
        const { id } = req.params;
        console.log(req.body)
        const { name, email, phone } = req.body;
        let user;
      
        try {
          if(name.length !== 0){
            user = await userModel.findByIdAndUpdate(id, {name}, { new: true });
          }else if( email.length !== 0){
            user = await userModel.findByIdAndUpdate(id, {email}, { new: true });
          }else{
            user = await userModel.findByIdAndUpdate(id, {phone}, { new: true });
          }
      
          if (!user) {
            return res.status(404).send('User not found');
          }
      
          res.status(200).send(user);

        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },

      deleteUser: async (req, res) => {
        const { id } = req.params;
        console.log(id, "id here");
      
        try {
          const user = await userModel.findByIdAndRemove(id);
      
          if (!user) {
            return res.status(404).send('User not found');
          }
      
          res.status(200).send('User deleted successfully');
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },


      searchUser: async (req, res)=> {
        const  name = req.body.search;
        console.log(name);
        try {
          const users = await userModel.find({ name: { $regex: name, $options: 'i' } });
          res.send(users);
        } catch (error) {
          console.error(error);
          res.send('Internal Server Error');
        }
        
      },


      // logout:(req, res)=> {
      //   const blacklist = [];
      //   const token = req.headers.authorization || req.body.token;
      //   console.log(token, "token admin log out avum");
      //   blacklist.push(token);
      //   res.send({ success: true, message:'Logged out successfully'});
      // }

}