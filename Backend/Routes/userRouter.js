const express = require('express');
const userControllers = require('../controllers/userControllers');
const userAuth = require('../Middleware/userAuth');
const upload = require('../config/multer');

const router = express.Router();




router.post('/signup',  userControllers.signUp);
router.post('/login',  userControllers.LogIn);
// router.post('/logout',  userControllers.logout);

router.get('/', userAuth, userControllers.getUser);

router.post('/upload', upload.single('image'), userControllers.uploadProfilepic);



module.exports = router;
