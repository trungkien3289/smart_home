const CustomerCategoryModel = require('../../models/CustomerCategory');

module.exports = {
    getAll: (req, res, next) => {
        CustomerCategoryModel.find({})
            .exec()
            .then(groups => {
                res.send({ success: true, data: groups });
                next()
            })
            .catch(error => {
                res.send(error);
                next()
            });
    },
    createCustomerGroup: function (req, res, next) {
        let { name } = req.body;

        const newCustomerGroup = new CustomerCategoryModel({
            name: name
        });

        CustomerCategoryModel.findOne({ name: name })
            .then(group => {
                if (group == null) {
                    return newCustomerGroup.save();
                } else {
                    res.send({ success: false, data: "Customer Group is existed." });
                    next()
                }
            })
            .then(newGroup => {
                res.send({ success: true, data: newGroup });
                next()
            })
            .catch(error => {
                res.send({ success: false, data: error });
                next()
            });
    },
}

