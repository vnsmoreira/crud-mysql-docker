const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.get('/', userController.listUsers_GET);
router.get('/:userId', userController.showUser_GET);
router.post('/', userController.createUser_POST);
router.put('/:userId', userController.updateUser_PUT);
router.delete('/:userId', userController.deleteUser_DELETE);

module.exports = app => app.use('/user', router);
