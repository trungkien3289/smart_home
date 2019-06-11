const utilityController = require('../../controllers/api/utility.ctrl');
module.exports = (router) => {
    /**
     * get all users
     */
    router
    .route('/crawllocationdata')
    .get(utilityController.getAll)


      /**
     * crawl all district
     */
    router
    .route('/crawldistrict')
    .get(utilityController.crawlDistrict)

    router
    .route('/getLocationData')
    .get(utilityController.getLocationData)
    
}