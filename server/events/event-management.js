var eventManagementTypeEnum = require('./event-management-type')
var pingNetworkManagementClass = require('./ping-network-events/ping-network-events')
var scheduleManagementClass = require('./ping-network-events/ping-network-events')

// init event managements
let eventManagement = {};
eventManagement[eventManagementTypeEnum.PING_NETWORK_MANAGEMENT] = pingNetworkManagementClass();
eventManagement[eventManagementTypeEnum.SCHEDULE_MANAGEMENT] = scheduleManagementClass();

module.exports = eventManagement;