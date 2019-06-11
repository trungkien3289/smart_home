const pingNetworkController = require('../../controllers/api/pingNetwork.ctrl');
const multipath = require('connect-multiparty')
module.exports = (router) => {
    /**
     * ping network
     */
    router
    .route('/pingnetwork')
    .get(pingNetworkController.pingNetwork)

    /**
     * get all ping network results
     */
    router
    .route('/pingnetwork/results')
    .get(pingNetworkController.getResults)

    /**
     * get all ping network schedules
     */
    router
    .route('/pingnetwork/schedules')
    .get(pingNetworkController.getSchedules)

      /**
     * add new ping network schedule
     */
    router
    .route('/pingnetwork/schedules/create')
    .post(pingNetworkController.addSchedule)

}