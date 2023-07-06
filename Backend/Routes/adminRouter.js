const express = require('express');
const adminControllers = require('../controllers/adminControllers');
const adminAuth = require('../Middleware/adminAuth');
const router = express.Router();


router.post('/', adminControllers.adminLogin);
// router.post('/logout', adminControllers.logout);
router.post('/getUser', adminControllers.getUser);

router.post('/editUser/:id', adminControllers.editUser);
router.get('/deleteUser/:id', adminControllers.deleteUser);
router.post('/search', adminControllers.searchUser);

module.exports = router;
