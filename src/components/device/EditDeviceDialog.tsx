import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Icon, TextField, Switch, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import { IAppState } from '../../store/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { editDevice, toggleEditDeviceDialog, getDeviceTypes } from '../../store/device/actions';
import { IDeviceType, IDevice } from '../../store/device/reducers';

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

const FormContainer = styled.div`
    display:flex;
    flex-direction:column;
`

interface IState {
    open: boolean;
    id: string;
    name: string;
    description: string;
    createdDate: string;
    isActive: boolean;
    type: string;
    owner: string;
}

interface OwnProps {
    selectedItem: IDevice;
}

interface DispatchProps {
    editDevice: (device: any) => void;
    toggleDialog: () => void;
    getDeviceTypes: () => void;
}

interface IStateProps {
     isOpen: boolean;
     deviceTypes: IDeviceType[];
}

type IProps = OwnProps & DispatchProps & IStateProps

class EditDeviceDialog extends React.Component<IProps, IState> {
    state = {
        open: false,
        id: "",
        name: "",
        description: "",
        createdDate: new Date().toString(),
        isActive: false,
        type: "",
        owner: "",
    }

    defaultValue = Object.freeze({
        open: false,
        id: "",
        name: "",
        description: "",
        createdDate: new Date().toString(),
        isActive: false,
        type: "",
        owner: "",
    })

    componentDidMount() {
        this.props.getDeviceTypes();
    }

    componentWillReceiveProps(nextProps: IProps){
        if(nextProps.isOpen !== this.props.isOpen && nextProps.isOpen === true){
            this.setState({
                ...nextProps.selectedItem
            })
        }
    }

    handleClose = () => {
        this.props.toggleDialog();
        this.resetDialog();
    }

    handleSaveBtnClick = () => {
        this.props.editDevice({
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            createdDate: new Date().toString(),
            isActive: this.state.isActive,
            type: this.state.type,
            owner: "",
        });
        this.handleClose();
    }

    handleChange = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.type == 'checkbox'? event.target.checked : event.target.value
        });
    };

    handleActiveChange = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.type == 'checkbox'? event.target.checked : event.target.value
        });
    }

    resetDialog = () => {
        this.setState({
            ...this.defaultValue
        })
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
                    Edit Device
                    <CloseDialogIconButton aria-label="Close" onClick={this.handleClose}>
                        <CloseIcon />
                    </CloseDialogIconButton>
                </CustomDialogTitle>
                <DialogContent>
                    <FormContainer>
                        <TextField
                            id="standard-name"
                            label="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange.bind(this)}
                            margin="normal"
                        />
                        <TextField
                            id="standard-description"
                            label="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange.bind(this)}
                            margin="normal"
                        />
                         {/* <FormControl>
                            <InputLabel htmlFor="device-type">Type</InputLabel>
                            <Select
                            value={this.state.type}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'type',
                                id: 'device-type',
                            }}
                            >
                                {this.props.deviceTypes.map(device => {
                                    return <MenuItem value={device.id}>{device.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl> */}
                        <Switch
                            checked={this.state.isActive}
                            onChange={this.handleActiveChange.bind(this)}
                            name="isActive"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        <label>{this.state.isActive ? "On": "Off"}</label>
                    </FormContainer>
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
    isOpen : states.deviceState.isEditDeviceDialogOpen,
    deviceTypes: states.deviceState.deviceTypes,
  })

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
    return {
        editDevice: async (device: any) => {
            await dispatch(editDevice(device))
        },
        toggleDialog: () => {
            dispatch(toggleEditDeviceDialog())
        },
        getDeviceTypes: () => {
            dispatch(getDeviceTypes())
        }
    }
}

export default connect<IStateProps, DispatchProps, OwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(EditDeviceDialog);

