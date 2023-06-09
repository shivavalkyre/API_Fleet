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

var LogDevices = async function (req,res){
    try{
        // get All devices

        var url = process.env.URL_ALL_DEVICE
        const config = {
         headers:{
             Authorization : process.env.FLESPI_TOKEN
         }
       }
       
        axios.get(url,config)
        .then(function (response) {
            var result = response.data.result
            var device = ""
            for (i=0;i<=result.length-1;i++){

                var id = result[i].id
                // console.log('id: ' + id)
                device += id + ","
            }
           device = device.substring(0,device.length-1)
            //console.log(device)
           var params = "position,timestamp,battery.voltage,battery.current,absolute.acceleration,engine.ignition.status,external.powersource.voltage,gnss.status,gsm.signal.level,vehicle.mileage"
           var url_detail = process.env.URL_SELECT_DEVICE +  device +'/telemetry/' + params
           
           axios.get (url_detail,config)
           .then (function (response){
                var result = response.data.result
                // console.log(result)
           }).catch(function (err){
                console.log(err)
           })
       })
       .catch(function (err) {
        //  var result = {  
 
        //      "status":false,
        //      "message": err
        //  }
        //  res.setHeader("Content-Type", "application/json");
        //  res.writeHead(400);
        //  res.end(JSON.stringify(result,null,3));
        console.log(err)
       })
       
       
        


    }catch (err){
        console.log(err)
    }
}

function GetDetailLog(id,reply){
    try {
        var device = id
        var params = "position,timestamp,battery.voltage,battery.current,absolute.acceleration,engine.ignition.status,external.powersource.voltage,gnss.status,gsm.signal.level,vehicle.mileage"
        var url = process.env.URL_SELECT_DEVICE +  device +'/telemetry/' + params

       

        const config = {
            headers:{
                Authorization : process.env.FLESPI_TOKEN
            }
          }

        axios.get(url,config)
        .then(function (response) {
        //  var result = {
        //      "status":true,
        //      "message":"success",
        //      "data": response.data.result
        //    }
        //    res.setHeader("Content-Type", "application/json");
        //    res.writeHead(200);
        //    res.end(JSON.stringify(result));

        reply ()
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
   DeviceInformation,
   LogDevices
}