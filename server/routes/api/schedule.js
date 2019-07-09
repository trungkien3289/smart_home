const scheduleController = require('../../controllers/api/schedule.ctrl');
module.exports = (router) => {
    /**
     * get schedules
     */
    router
    .route('/schedule/schedules')
    .get(scheduleController.getSchedules)

    /**
     * add new schedule
     */
    router
    .route('/schedule/add')
    .post(scheduleController.addSchedule)


     /**
     * delete schedule
     */
    router
    .route('/schedule/delete')
    .post(scheduleController.deleteSchedule)
    
      /**
     * set schedule status
     */
    router
    .route('/schedule/setStatus')
    .post(scheduleController.setScheduleStatus)

      /**
     * edit schedule
     */
    router
    .route('/schedule/edit')
    .post(scheduleController.editSchedule)
}