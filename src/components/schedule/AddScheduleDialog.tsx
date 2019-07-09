import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, AppBar, Tabs, Tab, IconButton, Icon } from '@material-ui/core';
import styled from 'styled-components';
// import { HostList } from './host-list/HostList';
import ScheduleSetting from './schedule-dialog/ScheduleSetting'
import { IAppState } from '../../store/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { addSchedule, toggleAddScheduleDialog } from '../../store/schedule/actions';
import { connect } from 'react-redux';
import ScheduleInformation from './schedule-dialog/ScheduleInformation';
import CloseIcon from '@material-ui/icons/Close';
import { IDevice } from '../../store/device/reducers';
import { getDeviceDictionary, getAllDevice } from '../../store/device/actions';
import { ActionGenerator } from './ActionGenerator';

const TabContainer = styled((props) => <div {...props} />)`
    width: 800px;
    height: 500px;
    padding: 10px;
    display: ${props => props.hidden ? "none" : "flex"};
    flex-direction: column;
`

const CloseDialogIconButton = styled((props) => <IconButton {...props}></IconButton>)`
    float: right;
`;

const CustomDialogTitle = styled((props) => <DialogTitle {...props} classes={{ root: "root" }} />)`
    & h2{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
`

interface State {
    open: boolean;
    tabIndex: number;
    actions: any[];
    expression: string;
    createdDate: string;
    name: string;
    description: string;
    isActive: boolean;
}

interface OwnProps {
    // dialogState: boolean;
}

interface DispatchProps {
    addSchedule: (newSchedule: any) => void;
    toggleDialog: () => void;
    getDeviceDictionary: () => void;
    getAllDevices: () => void;
}

interface IStateProps {
     isOpen: boolean;
     devices: IDevice[];
     deviceDictionary:any;
}

type Props = OwnProps & DispatchProps & IStateProps

class AddPingScheduleDialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            tabIndex: 0,
            actions: [],
            expression: "* * * * * *",
            createdDate: new Date().toString(),
            name: "",
            description: "",
            isActive: false
        }
    }

    componentDidMount(){
        this.props.getAllDevices();
        this.props.getDeviceDictionary();

    }

    handleClose = () => {
       this.props.toggleDialog();
    }

    handleSaveBtnClick = () => {
        this.props.addSchedule({
            name: this.state.name,
            isActive: this.state.isActive,
            expression: this.state.expression,
            actions: this.state.actions,
            createdDate: new Date().toString(),
            description: this.state.description
        });
        this.handleClose();
    }

    handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            tabIndex: newValue
        })
    }

    onActionListChanged = (actions: any[]) => {
        this.setState({
            actions: actions
        });
    }

    onScheduleSettingChanged = (expression: string) => {
        this.setState({
            expression: expression
        });
    }

    onInforDataChanged = (name: string, description: string, active: boolean) => {
        this.setState({
            name: name,
            description: description,
            isActive: active
        });
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="customized-dialog-title"
                open={this.props.isOpen}
                maxWidth='lg'
                disableBackdropClick={true}
            >
                <CustomDialogTitle id="customized-dialog-title">
                    Add Schedule
                    <CloseDialogIconButton aria-label="Close" onClick={this.handleClose}>
                        <CloseIcon />
                    </CloseDialogIconButton>
                </CustomDialogTitle>
                <DialogContent>
                    <div>
                        <AppBar position="static" color="default">
                            <Tabs value={this.state.tabIndex} onChange={this.handleTabChange.bind(this)}>
                                <Tab label="Information" />
                                <Tab label="Action" />
                                <Tab label="Schedule" />
                            </Tabs>
                        </AppBar>
                        <TabContainer hidden={this.state.tabIndex != 0}>
                            <ScheduleInformation 
                            className="information-scheduledialog" 
                            onChanged={this.onInforDataChanged.bind(this)} 
                            name={this.state.name} 
                            description={this.state.description} 
                            active={this.state.isActive}
                            isEditMode={false}/>
                        </TabContainer>
                        <TabContainer hidden={this.state.tabIndex != 1}>
                            {/* <HostList className="hostlist-scheduledialog" onChanged={this.onHostListChanged.bind(this)} hosts={this.state.hosts} /> */}
                            <ActionGenerator 
                                deviceDictionary={this.props.deviceDictionary} 
                                devices={this.props.devices} 
                                onChanged={this.onActionListChanged.bind(this)}
                                actions={this.state.actions}/>
                        </TabContainer>
                        <TabContainer hidden={this.state.tabIndex != 2}>
                            <ScheduleSetting onChanged={this.onScheduleSettingChanged.bind(this)} expression={this.state.expression} />
                        </TabContainer>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} variant="contained" color="default">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSaveBtnClick.bind(this)} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (states: IAppState, ownProps: OwnProps): IStateProps => ({
    isOpen : states.pingNetworkState.isScheduleDialogOpen,
    devices: states.deviceState.devices,
    deviceDictionary: states.deviceState.deviceDictionary,
  })

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
    return {
        addSchedule: async (newSchedule: any) => {
            await dispatch(addSchedule(newSchedule))
            console.log('Get all customers completed [UI]')
        },
        toggleDialog: () => {
            dispatch(toggleAddScheduleDialog())
        },
        getDeviceDictionary: () => {
            dispatch(getDeviceDictionary())
        },
        getAllDevices: async () => {
            await dispatch(getAllDevice())
            console.log('Get all devices completed [UI]')
          },
    }
}

export default connect<IStateProps, DispatchProps, OwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(AddPingScheduleDialog);