const deviceController = require('../../controllers/api/device.ctrl');
module.exports = (router) => {

    /**
     * get list devices
     */
    router
    .route('/device')
    .get(deviceController.getAll)

    /**
     * add device
     */
    router
    .route('/device/add')
    .post(deviceController.add)


     /**
     * delete device
     */
    router
    .route('/device/delete')
    .post(deviceController.delete)
    
      /**
     * get device details
     */
    router
    .route('/device/details')
    .get(deviceController.details)

      /**
     * edit device
     */
    router
    .route('/device/edit')
    .post(deviceController.edit)

      /**
     * edit device
     */
    router
    .route('/device/setStatus')
    .post(deviceController.setStatus)

      /**
     * get device types
     */
    router
    .route('/device/types')
    .get(deviceController.getDeviceTypes)

      /**
     * get device dictionary
     */
    router
    .route('/device/dictionary')
    .get(deviceController.getDeviceDictionary)

}