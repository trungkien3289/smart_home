import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, AppBar, Tabs, Tab, IconButton, Icon } from '@material-ui/core';
import styled from 'styled-components';
import { HostList } from './host-list/HostList';
import ScheduleSetup from './schedule-setup/index'
import { IAppState } from '../../../store/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { editSchedule, toggleEditScheduleDialog } from '../../../store/ping-network/actions';
import { connect } from 'react-redux';
import ScheduleInformation from './information/ScheduleInformation';
import CloseIcon from '@material-ui/icons/Close';
import { IPingNetworkSchedule } from '../../../store/ping-network/reducers';

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
    hosts: string[];
    expression: string;
    createdDate: string;
    name: string;
    description: string;
    active: boolean;
}

interface OwnProps {
    selectedItem: IPingNetworkSchedule;
    // hosts: string[];
    // expression: string;
    // createdDate: string;
    // name: string;
    // description: string;
    // active: boolean;
}

interface DispatchProps {
    editSchedule: (editScheduleItem: any) => void;
    toggleDialog: () => void;
}

interface IStateProps {
     isOpen: boolean;
}

type Props = OwnProps & DispatchProps & IStateProps

class EditPingScheduleDialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            tabIndex: 0,
            hosts: [],
            expression: "* * * * * *",
            name: "",
            description: "",
            active: false,
            createdDate: ""
        }
    }

    componentWillReceiveProps(nextProps: Props){
        if(nextProps.isOpen !== this.props.isOpen && nextProps.isOpen === true) {
            this.setState({
                ...nextProps.selectedItem
            })
        }
    }

    handleClose = () => {
       this.props.toggleDialog();
    }

    handleSaveBtnClick = () => {
        this.props.editSchedule({
            name: this.state.name,
            active: this.state.active,
            expression: this.state.expression,
            hosts: this.state.hosts,
            description: this.state.description
        });
        this.handleClose();
    }

    handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            tabIndex: newValue
        })
    }

    onHostListChanged = (hosts: string[]) => {
        this.setState({
            hosts: hosts
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
            active: active
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
                    Edit Ping Schedule
                    <CloseDialogIconButton aria-label="Close" onClick={this.handleClose}>
                        <CloseIcon />
                    </CloseDialogIconButton>
                </CustomDialogTitle>
                <DialogContent>
                    <div>
                        <AppBar position="static" color="default">
                            <Tabs value={this.state.tabIndex} onChange={this.handleTabChange.bind(this)}>
                                <Tab label="Information" />
                                <Tab label="Host" />
                                <Tab label="Schedule" />
                            </Tabs>
                        </AppBar>
                        <TabContainer hidden={this.state.tabIndex != 0}>
                            <ScheduleInformation 
                            className="information-scheduledialog" 
                            onChanged={this.onInforDataChanged.bind(this)} 
                            name={this.state.name} 
                            description={this.state.description}
                            active={this.state.active} 
                            isEditMode={true}/>
                        </TabContainer>
                        <TabContainer hidden={this.state.tabIndex != 1}>
                            <HostList className="hostlist-scheduledialog" onChanged={this.onHostListChanged.bind(this)} hosts={this.state.hosts} />
                        </TabContainer>
                        <TabContainer hidden={this.state.tabIndex != 2}>
                            <ScheduleSetup onChanged={this.onScheduleSettingChanged.bind(this)} expression={this.state.expression} />
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
    isOpen : states.pingNetworkState.isEditScheduleDialogOpen
  })

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
    return {
        editSchedule: async (editScheduleItem: any) => {
            await dispatch(editSchedule(editScheduleItem))
            console.log('Update schedule completed [UI]')
        },
        toggleDialog: () => {
            dispatch(toggleEditScheduleDialog())
        }
    }
}

export default connect<IStateProps, DispatchProps, OwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(EditPingScheduleDialog);