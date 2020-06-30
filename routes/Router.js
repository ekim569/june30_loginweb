var express = require('express');
var router = express.Router();
var User = require("../models/User");

var name = {
    a: "김한솔",
    b: "이상호",
    c: "문재인"

}

router.get('/', (req, res, next)=>{
    User.find((err, result)=>{
        if(err) {
            console.log(err)
        }
        // console.log(req)
        //res.send(result)
        res.render('index', {data:result});
    })
})

router.get('/signup', (req, res, next)=>{
    res.render('signup')
})
router.post('/signup', (req, res, next)=>{
    var contact = new User()
    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email

    contact.save((err, result)=>{
        if(err) {
            console.log(err)
        }
        console.log(result)
        res.send("success")
    })
})

router.post('/insert', (req, res, next)=>{
    var contact = new User()
    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email

    contact.save((err, result)=>{
        if(err) {
            console.log(err)
        }
        console.log(result)
        res.send("success")
    })
})

router.get('/login', (req, res, next)=>{
    res.render('login')
})

router.post('/login', async(req, res, next)=>{
    var username = await req.body.username
    var passwordHash = await req.body.passwordHash
    
    await User.findOne({username:username}, (err, user)=>{
        if(err) {
            console.log(err)
        }
        if(!user) {
            res.send(`${username} is not Exist`)
        } else {
           if(user.passwordHash == passwordHash) {
               res.send(`welcome to my world  ${username}`)
           } else {
               res.send(`${username}'s password is wrong`)
           }
        }
    })
})

module.exports = router;