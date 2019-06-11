const user = require('./user')
const customer = require('./customer')
const utility = require('./utility')
const pingNetWork = require('./ping-network')

module.exports = (router) => {
    user(router);
    customer(router);
    utility(router);
    pingNetWork(router);
}
