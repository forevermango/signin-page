const express = require('express');
const router = express.Router();

//performs GET request
router.get('/', (req,res) => {
    res.render('welcome');
})

//register page
router.get('/register', (req,res)=> {
    res.render('register');
})

//exports the router instance so that it can be used in other files
module.exports = router;