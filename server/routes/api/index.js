const user = require('./user')
const customer = require('./customer')
const utility = require('./utility')
const pingNetWork = require('./ping-network')
const device = require('./device')
const schedule = require('./schedule')

module.exports = (router) => {
    user(router);
    customer(router);
    utility(router);
    pingNetWork(router);
    device(router);
    schedule(router);
}
