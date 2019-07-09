const pingNetworkController = require('../../controllers/api/pingNetwork.ctrl');
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
    .route('/pingnetwork/schedules/add')
    .post(pingNetworkController.addSchedule)


     /**
     * add new ping network schedule
     */
    router
    .route('/pingnetwork/schedules/delete')
    .post(pingNetworkController.deleteSchedule)
    
      /**
     * set schedule status
     */
    router
    .route('/pingnetwork/schedules/setStatus')
    .post(pingNetworkController.setScheduleStatus)

      /**
     * add new ping network schedule
     */
    router
    .route('/pingnetwork/schedules/edit')
    .post(pingNetworkController.editSchedule)

}