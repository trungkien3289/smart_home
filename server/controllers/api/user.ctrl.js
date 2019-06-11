const UserModel = require('../../models/User')
const RoleModel = require('../../models/Role')

module.exports = {
    getAll: (req, res, next) => {
        UserModel.find({})
        .populate('Role')
        .exec()
        .then(users => {
            res.send({success: true, data: users});
            next()
        }).catch(error => {
            res.send(error);
            next()
        });
    },
    createUser: function (req, res, next) {
        let { userName, email, passwordHask, role } = req.body;

        const newUser = new UserModel({
            userName: userName,
            email: email,
            passwordHask: passwordHask
        });

        RoleModel.findOne({ name: role })
            .then(adminRole => {
                newUser.role = adminRole;
                return newUser.save()
            })
             .then(newUser => {
                res.send({success: true, data: newUser});
                next()
            })
            .catch(error => {
                res.send({success: false, data: error});
                next()
            });
    },
    getUser: function(req, res, next){
        UserModel.findOne(req.params.id).then(user => {
            res.send({success: true, data: user});
            next()
        }).catch(error => {
            res.send({success: false, data: error});
            next()
        })
    },
    signIn: function(req, res, next){
        // let paras= req.query;
        var userName = req.body.userName;
        var password =  req.body.password;
        UserModel.findOne({userName: userName})
        .then(user => {
            if(user.passwordHask === password){
                var result = {
                    userName: user.userName,
                    email: user.email
                };
                res.json({success:true, data: result})
                // res.send({success:true, data: result});
            }else{
                res.send({success: false, message: "Username or password is not correct."})
            }
        })
        .catch(error => {
            res.json({success: false, message: error});
        })
    }
}

