//Grup9

const express = require('express');
const userController = require('../controllers/userController');
const { route } = require('./authRoute');

const router = express.Router();

router.route('/profile').post(userController.getUser);
router.route('/update').post(userController.updateUser);
router.route('/change-password').post(userController.changePassword);
router.route('/checkPassword').post(userController.checkPassword);
/*router.route('/checkMail').post(userController.checkMail);
router.route('/checkUsername').post(userController.checkUsername);
router.route('/checkPhone').post(userController.checkPhone);*/
router.route('/checkUpdate').post(userController.checkUpdate);



module.exports = router;