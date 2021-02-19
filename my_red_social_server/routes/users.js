var express = require('express');
var router = express.Router();
var userSchema = require('./../model/user.model');
var userMiddleware = require('./../middleware/user.middleware');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/',userMiddleware.verifyUserToken, function (req, res, next) {
  res.status(200).json({ status: 200, user: req.body.user, message: "profile details" })
});

router.post('/register', userMiddleware.verifyReferralCode, function (req, res) {
  bcrypt.hash(req.body.password, 12, function (err, hash) {
    if (err) {
      res.status(500).json({ status: 500, message: "Internal server error" })
    } else {
      req.body.password = hash;
      userSchema.create(req.body, (error, user) => {
        if (error) {
          res.status(400).json({ status: 400, message: error._message })
        } else {
          console.log("Ss")
          res.status(201).json({ status: 201, message: "user Created", user: user })
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  userSchema.findOne({ "email": req.body.email }).select('+password').exec((err, user) => {
    if (err) { res.status(500).json({ status: 500, message: "Internal server error" }) }
    else if (user !== null) {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          var token = jwt.sign({ foo: req.body.email }, 'social_relations', { expiresIn: "2 days" });
          userSchema.updateOne({ 'email': req.body.email }, { 'token': token }, (error, result) => {
            if (error) { res.status(500).json({ status: 500, message: "Internal server error" }) }
            else {
              res.status(200).json({ status: 200, token: token, message: "Sucessfully loggedin" })
            }
          })
        } else {
          res.status(401).json({ status: 401, message: "Invalid email or password" })
        }
      });

    } else {
      res.status(401).json({ status: 401, message: "Invalid email or password" })
    }
  }
  )
});

router.post('/logout',userMiddleware.verifyUserToken, function (req, res, next) {
  userSchema.updateOne({'email':req.body.user.email},{'token':""},(err,result)=>{
    if(err){res.status(500).json({ status: 500, message: "Internal server error" })}
    else{ res.status(200).json({ status: 200, message: "Sucessfully loggedout" })}
  })
});

module.exports = router;
