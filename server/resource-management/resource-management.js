const DataTypeEnum = {
    Number: "Number",
    String: "String",
    Boolean: "Boolean",
    Date: "Date"
}
let devices = [];
let deviceTypes = [
    {
        Id: 1,
        Name: "Light",
        Description: "Light"
    },
    {
        Id: 2,
        Name: "Fan",
        Description: "Fan"
    },
    {
        Id: 3,
        Name: "Rasperpi",
        Description: "Rasperpi"
    },
];

let actionTypes = [
    {
        Id: 1,
        Name: "Turn_On_Light",
        Description: "Turn on the light",
        DeviceTypeId: 1,
        Params: [],
    },
    {
        Id: 2,
        Name: "Turn_Off_Light",
        Description: "Turn off the light",
        DeviceTypeId: 1,
        Params: [],
    },
    {
        Id: 3,
        Name: "Turn_On_Fan",
        Description: "Turn on fan",
        DeviceTypeId: 2,
        Params: [
            {
                Name: "Volume",
                DataType: DataTypeEnum.Number,
                Description: "Volumn of fan",
            }
        ],
    },
    {
        Id: 4,
        Name: "Turn_Off_Fan",
        DeviceTypeId: 2,
        Description: "Turn off fan",
    },
]

let actions = [
    {
        Id: 1,
        ActionTypeId: 1,
        Values:[]
    },
    {
        Id: 2,
        ActionTypeId: 2,
        Values:[]
    },
    {
        Id: 3,
        ActionTypeId: 3,
        Values:[2]
    }
]

const SystemCompiler = {
    device:{
        Light: {
            Turn_On_Light: (action) => {
                console.log(`Action Name: ${action.name} - action: Turn_On_Light`);
                console.log(action);
            },
            Turn_Off_Light:(action) => {
                console.log(`Action Name: ${action.name} - action: Turn_Off_Light`);
                console.log(action);
            }
        },
        Fan: {
            Turn_On_Fan: (action) => {
                console.log(`Action Name: ${action.name} - action: Turn_On_Fan`);
                console.log(action);
            },
            Turn_Off_Fan: (action) => {
                console.log(`Action Name: ${action.name} - action: Turn_Off_Fan`);
                console.log(action);
            }
        }
    },
    compile : (action, compiler) => {
        compiler.device[action.deviceType][action.type](action)
    },
}

module.exports = SystemCompiler;