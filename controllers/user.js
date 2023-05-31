var Model = require('../models/user.js')
var User = Model.User
var util = require('util');
var futil = require('../config/utility.js');

var Create = async function(req,res){
    try {
        const user = await User.create(req.body);
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
        res.send(user);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    }
}

var Read = async function(req,res){
    try {
        const user = await User.findAll();
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
        res.send(user);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    }
}

var Update = async function (req,res){
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Updated"
        });
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    }
}

var Delete = async function (req,res){
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    }
}

module.exports = {
    Create,
    Read,
    Update,
    Delete
}