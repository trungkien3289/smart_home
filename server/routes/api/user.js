const userController = require('../../controllers/api/user.ctrl');
const multipath = require('connect-multiparty')
module.exports = (router) => {
    /**
     * get all users
     */
    router
    .route('/users')
    .get(userController.getAll)

    /**
     * get all users
     */
    router
    .route('/user/:id')
    .get(userController.getUser)

      /**
     * sign in
     */
    router
    .route('/user/signIn')
    .post(userController.signIn)

}