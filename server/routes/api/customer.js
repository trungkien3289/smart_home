const customerController = require('../../controllers/api/customer.ctrl');
const customergroupController = require('../../controllers/api/customergroup.ctrl');
const multipath = require('connect-multiparty')
module.exports = (router) => {
    /**
     * get all users
     */
    router
    .route('/customers')
    .get(customerController.getAll)

    /**
     * create new customer
     */
    router
    .route('/customers/create')
    .post(customerController.createCustomer)

    /**
     * delete customer
     */
    router
    .route('/customers/delete')
    .post(customerController.delete)

    /**
     * get all customer group
     */
    router
    .route('/customergroups')
    .get(customergroupController.getAll)

    /**
     * create customer group
     */
    router
    .route('/customergroups/create')
    .post(customergroupController.createCustomerGroup)



}