var Model = require('../models/user.js')
var User = Model.User
var jwt = require('jsonwebtoken')
var util = require('util');
var futil = require('../config/utility.js');
require('dotenv').config();

var Login = async function(req,res){
    try {
        const user = await User.findAll({
            where: {
                username: req.body.username,
                password: req.body.password
              },
              raw:true
        });
        
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
        // res.send(user);
        var data = user
        
        var result = {
            "status" : true,
            "message": 'success',
            "data"   : data
        }

        const jwtKey = process.env.TOKEN_SECRET
        const jwtExpirySeconds = 300
        var username = data[0].username
        // console.log(username)

        const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })

        // console.log("token:", token)

        res.setHeader("Content-Type", "application/json");
        //res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
        res.setHeader("token",token)
        res.writeHead(200);
        res.end(JSON.stringify(result, null, 3));

    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        var result = {  "status":false,
                        "message":"username or password is required"
                     }
        res.setHeader("Content-Type", "application/json");
        res.writeHead(400);
        res.end(JSON.stringify(result, null, 3));
        
    }
}

var authAccessToken = async function (req,res,next){

    const token = req.headers.token
    // console.log(token)
    const jwtKey = process.env.TOKEN_SECRET

    try{
        var payload = jwt.verify(token, jwtKey)
        // console.log(payload)
        var result = {
                      "status":true,
                      "message":"success",
                      "data":payload.username
                    }

      
        next()

    }catch (err){

        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | AUTH' + util.inspect(err));
        var result = {  "status":false,
                        "message":"token is expired"
                     }
        res.setHeader("Content-Type", "application/json");
        res.writeHead(400);
        res.end(JSON.stringify(result,null,3));
    }
}

module.exports = {
    Login,
    authAccessToken
}