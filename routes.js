const express = require('express');
const router = express.Router();
const user = require('./Routes/user')

router.get('/', (req, res) =>{
  return res.status(200).json({msg: 'working fine', error: false });


})
router.use('/user', user);

module.exports = router