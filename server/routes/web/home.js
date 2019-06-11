const homeController = require('../../controllers/web/home.ctrl');
const multipath = require('connect-multiparty')
module.exports = (router) => {
    /**
     * get home page
     */
    router
    .route('/home')
    .get(homeController.home)
}