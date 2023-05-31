// Import express
var express = require ('express');
 // Init express router
var router = express.Router();
var User = require('../controllers/user.js')
var Devices = require('../controllers/device.js')
var Auth = require('../controllers/auth.js')


router.get('/api/patern',function (req, res, next) {
    res.send({message:'Welcome Patern'})
    res.end()
})


router.get('/api/patern/users',Auth.authAccessToken,function (req, res){
    User.Read(req,res)
})

router.post('/api/patern/devices',Auth.authAccessToken,function(req,res){
    Devices.AllDevices(req,res)
})

router.post('/api/patern/device',Auth.authAccessToken,function(req,res){
    Devices.SelectedDevice(req,res)
})

router.post('/api/patern/device/details',Auth.authAccessToken,function(req,res){
    Devices.DeviceInformation(req,res)
})

router.post('/api/patern/auth',function (req, res, next) {
    Auth.Login(req,res)
})



// router.post('/api/patern/users',User.Create)
// router.get('/api/patern/users',User.Read)
// router.put('/api/patern/users/:id',User.Update)
// router.delete('/api/patern/users/:id',User.Delete)

module.exports.router = router

