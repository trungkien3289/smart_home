module.exports = (taskManagementInstance) => {
    return {
        activeScheduleEventHandler : (scheduleName) => {
            taskManagementInstance.startTask(scheduleName);
            console.log("Active schedule listener run")
        }
    }
}