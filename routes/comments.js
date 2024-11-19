const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const error = require("../utilities/error");

// 
router.get('/', (req, res)=>{

    console.log('request received')

})

module.exports = router;