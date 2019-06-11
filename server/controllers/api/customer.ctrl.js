const CustomerModel = require('../../models/Customer');

module.exports = {
    getAll: (req, res, next) => {
        CustomerModel.find({})
            .populate('CustomerCategory')
            .exec()
            .then(customers => {
                res.send({ success: true, data: customers });
                next()
            })
            .catch(error => {
                res.send(error);
                next()
            });
    },
    get: (req, res, next) => {
        let { query, group, status } = req.body;
        CustomerModel.find({
        })
            .where({ "userName": { "$regex": query, "$options": "i" } })
            .exec()
            .then(customers => {
                res.send({ success: true, data: customers });
                next()
            })
            .catch(error => {
                res.send(error);
                next()
            });
    },
    createCustomer: function (req, res, next) {
        let { name, code, phoneNumber, email, sex, category, dateOfBirth, fax, taxCode, note, address,district, status } = req.body;

        const newCustomer = new CustomerModel({
            name: name,
            code: code,
            phoneNumber: phoneNumber,
            email: email,
            sex: sex,
            category: category,
            dateOfBirth: dateOfBirth,
            fax: fax,
            taxCode: taxCode,
            note: note,
            address: address,
            district: district,
            status: status,
        });

        CustomerModel.findOne({ 'name': name }).exec()
            .then(customer => {
                if (customer == null) {
                    return newCustomer.save();
                } else {
                    res.send({ success: false, data: "Customer is existed." });
                    next()
                }
            })
            .then(newCustomer => {
                res.send({ success: true, data: newCustomer });
                next()
            })
            .catch(error => {
                res.send({ success: false, data: error });
                next()
            });
    },
    delete: function (req, res, next){
        let { id } = req.body;
        CustomerModel.find({ '_id':id }).remove().exec()
        .then(() =>{
            res.send({ success: true, message: 'Delete customer successfully.' });
            next()
        }).catch((error) => {
            res.send({ success: false, message: 'Delete customer successfully.' });
            next()
        })
    }
}

