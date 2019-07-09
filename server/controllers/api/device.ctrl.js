const DeviceModel = require('../../models/Device'); 
const DataTypeEnum  = require('../../resource-management/DataTypeEnum')

module.exports = {
    getAll: (req, res, next) => {
        DeviceModel.find({})
        .then(devices => {
            let deviceViewModels = devices.map((device) => {
                let {id, name, description, type, owner, createdDate, isActive} = device;
                return {
                    id: id,
                    name: name,
                    description: description,
                    type: type,
                    owner: owner,
                    createdDate: createdDate,
                    isActive: isActive,
                }
            });
            res.send({ success: true, data: deviceViewModels });
            next()
        })
        .catch(error => {
            res.send(error);
            next()
        });
    },
    add: function (req, res, next) {
        let { name, description,type, owner, createdDate, isActive} = req.body;

        const newOne = new DeviceModel({
            name: name,
            description: description,
            type: type,
            // owner: owner,
            createdDate: createdDate,
            isActive: isActive,
        });

        newOne.save()
            .then(newResult => {
                res.send({ success: true, data: newResult });
                next()
            })
            .catch(error => {
                res.send({ success: false, data: error });
                next()
            });
    },
    delete: function (req, res, next) {
        let { id } = req.body;

        DeviceModel.remove({_id: id}).exec()
        .then(newResult => {
            res.send({ success: true, data: newResult });
            next()
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        });
    },
    edit: function (req, res, next) {
        let { id, name, description, isActive } = req.body;
    
        DeviceModel.find({ _id: id })
        .exec()
        .then(results => {
            if (results.length > 0) {
                let found = results[0];
                Object.assign(found, {
                    name: name,
                    description: description,
                    isActive: isActive
                })
                return found.save();
            } else {
                res.send({ success: false, data: null, message: "Cannot found device name " + name });
                next()
            }
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        }).then(updatedItem => {
            res.send({ success: true, data: updatedItem });
            next()
        })
        .catch(error => {
            res.send({ success: false, data: error, message: "Update Device fail." });
            next()
        });
    },
    details: function (req, res, next) {
        let { id } = req.body;
    
        DeviceModel.find({ id: id })
        .exec()
        .then(results => {
            if (results.length > 0) {
                let found = results[0];
                res.send({ success: true, data: found });
                next();
            } else {
                res.send({ success: false, data: null, message: "Cannot found device id " + id });
                next()
            }
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        })
    },
    setStatus: function (req, res, next) {
        let { id, isactive } = req.body;
        DeviceModel.find({ _id: id })
            .exec()
            .then(results => {
                if (results.length > 0) {
                    let found = results[0];
                    found.isActive = isactive;
                    return found.save();
                } else {
                    res.send({ success: false, data: null, message: "Cannot found device." });
                    next()
                }
            })
            .catch(error => {
                res.send({ success: false, data: error });
                next()
            }).then(updatedItem => {
                res.send({ success: true, data: updatedItem });
                next()
            })
            .catch(error => {
                res.send({ success: false, data: error, message: "Update Device status fail." });
                next()
            });
    },
    getDeviceTypes: (req, res, next) => {
        const deviceTypes= [
            {
                id: 1,
                name: 'Light',
                description: 'Light with 2 mode on/off'
            },
            {
                id: 2,
                name: 'Fan',
                description: 'Fan with 4 level'
            },
            {
                id: 3,
                name: 'Raspi',
                description: 'Raspi version 3'
            },
        ];
        res.send({ success: true, data: deviceTypes });
        next()
    },
    getDeviceDictionary: (req, res, next) => {
        const dictionary= {
            "1": {
                name: 'Light',
                description: 'Light with 2 mode on/off',
                actionTypes:[
                    {
                        id: 1,
                        name: "Turn_On_Light",
                        description: "Turn on the light",
                        deviceTypeId: 1,
                        parameters: [],
                    },
                    {
                        id: 2,
                        name: "Turn_Off_Light",
                        description: "Turn off the light",
                        deviceTypeId: 1,
                        parameters: [],
                    },
                ]
            },
            "2": {
                name: 'Fan',
                description: 'Fan with 4 level',
                actionTypes:[
                    {
                        id: 3,
                        name: "Turn_On_Fan",
                        description: "Turn on fan",
                        deviceTypeId: 2,
                        parameters: [
                            {
                                name: "Volume",
                                dataType: DataTypeEnum.Number,
                                description: "Volumn of fan",
                            }
                        ],
                    },
                    {
                        id: 4,
                        name: "Turn_Off_Fan",
                        deviceTypeId: 2,
                        description: "Turn off fan",
                    },
                ]
            },
            "3": {
                name: 'Raspi',
                description: 'Raspi version 3',
                actionTypes:[
                    
                ]
            },
        };
        res.send({ success: true, data: dictionary });
        next()
    },
}