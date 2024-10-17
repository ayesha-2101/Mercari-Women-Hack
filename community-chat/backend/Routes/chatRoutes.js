const express=require('express');
const router=express.Router();
const validate=require('../middlewares/authMiddleware');
const { accessChats, fetchChats, createCommunity, updateName, communityAdd, communityRemove } = require('../controllers/chatControllers');

router.route('/').post(accessChats);
router.route('/').get(validate,fetchChats);
router.route('/community').post(validate,createCommunity);
router.route('/rename').put(validate,updateName);
router.route('/gpAdd').put(validate,communityAdd);
router.route('/gpRemove').put(validate,communityRemove);

module.exports=router;