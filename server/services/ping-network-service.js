var ping = require('ping');
var moment = require('moment');
const PingNetworkResultModel = require('../models/PingNetworkResult')
module.exports = {
    ping: (hosts) => {
        hosts.forEach(function (host) {
            ping.promise.probe(host, {
                timeout: 10,
            }).then(
                function (result) {
                    console.log(result);
                    var requestTime = moment().format('MM-DD-YYYY hh:mm:ss');
                    //var listNewItems = results.map(function(item){
                    var newItem = new PingNetworkResultModel({
                        host: result.host,
                        datetime: requestTime,
                        averageTime: result.avg
                    });

                    return newItem.save();
                },
                function (error) {
                    console.log(error)
                }
            ).then(function (doc) {
            }, function (error) {
                console.log(error)
            });
        });
    }
}