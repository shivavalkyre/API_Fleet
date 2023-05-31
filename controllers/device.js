var axios = require('axios')
require('dotenv').config();

var AllDevices = async function(req,res){
    try {
       var url = process.env.URL_ALL_DEVICE
       const config = {
        headers:{
            Authorization : process.env.FLESPI_TOKEN
        }
      }
      
       axios.get(url,config)
       .then(function (response) {
        var result = {
            "status":true,
            "message":"success",
            "data": response.data.result
          }
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end(JSON.stringify(result));
      })
      .catch(function (err) {
        var result = {  

            "status":false,
            "message": err
        }
        res.setHeader("Content-Type", "application/json");
        res.writeHead(400);
        res.end(JSON.stringify(result,null,3));
      })

    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | RETREIVING ' + util.inspect(err));
    }
}

var SelectedDevice = async function(req,res){
    try {

        var device = req.body.device
        var url = process.env.URL_SELECT_DEVICE +  device
       

        const config = {
         headers:{
             Authorization : process.env.FLESPI_TOKEN
         }
       }
       
        axios.get(url,config)
        .then(function (response) {
         var result = {
             "status":true,
             "message":"success",
             "data": response.data.result
           }
           res.setHeader("Content-Type", "application/json");
           res.writeHead(200);
           res.end(JSON.stringify(result));
       })
       .catch(function (err) {
         var result = {  
 
             "status":false,
             "message": err
         }
         res.setHeader("Content-Type", "application/json");
         res.writeHead(400);
         res.end(JSON.stringify(result,null,3));
       })
 
     } catch (err) {
         futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | RETREIVING ' + util.inspect(err));
     }
}
var DeviceInformation = async function(req,res){
    try {
        var device = req.body.device
        var params = req.body.params
        var url = process.env.URL_SELECT_DEVICE +  device +'/telemetry/' + params

       

        const config = {
            headers:{
                Authorization : process.env.FLESPI_TOKEN
            }
          }

        axios.get(url,config)
        .then(function (response) {
         var result = {
             "status":true,
             "message":"success",
             "data": response.data.result
           }
           res.setHeader("Content-Type", "application/json");
           res.writeHead(200);
           res.end(JSON.stringify(result));
       })
       .catch(function (err) {
         var result = {  
 
             "status":false,
             "message": err
         }
         res.setHeader("Content-Type", "application/json");
         res.writeHead(400);
         res.end(JSON.stringify(result,null,3));
       })

    }catch(err){
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | RETREIVING ' + util.inspect(err)); 
    }
}

module.exports = {
   AllDevices,
   SelectedDevice,
   DeviceInformation
}