import React from 'react';
import {  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, InputBase, Divider, Button, Fab, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBaseHostList from './action-list/InputBaseHostList'
import AddIcon from '@material-ui/icons/Add';
import ActionListContainer from './action-list/ActionListContainer';
import { DataTypeEnum } from '../../appConstants/enum';
import { IDevice } from '../../store/device/reducers';
import ActionParameterInput from './action-list/ActionParameterInput';
import * as _ from 'lodash'
import * as uuidv1 from 'uuid/v1';

const TabContainer = styled.div`
    width: 800px;
    height: 500px;
`;

const AddHostContainer = styled.div`
    display:flex;
`;

const ActionCreatorContainer = styled.div`
    flex: 1 1 auto;  
    display:flex;
    flex-direction: column;
`;

const FuntionalButtonPanel = styled.div`
    flex: 0 0 50px;
    display:flex;
    justify-content:space-around;
    flex-direction:column;
`;

const ActionList  = styled((props) => <List {...props}/>)`
    flex: 1 1 auto;
`;

interface IParameter {
    name: string;
    dataType: DataTypeEnum;
    value: any;
}

interface IActionType {
    name: string;
    description: string;
    parameters: IParameter[];
}

interface State {
    actions: any[];
    selectedDeviceId: string;
    selectedDeviceType: string;
    selectedActionType: string;
    selectedActionTypeName: string;
    parameters: IParameter[];
    deviceActionTypes: IActionType[];
}

interface Props {
    onChanged: (actions: any[]) => void;
    // className: string;
    actions: any[];
    deviceDictionary: any;
    devices: IDevice[];
}

export class ActionGenerator extends React.Component<Props, State> {

    defaultValue = Object.freeze({
        selectedActionType: "",
        selectedActionTypeName: "",
        parameters: [],
    })

    constructor(props: Props) {
        super(props);
        this.state = {
            actions: this.props.actions || [],
            selectedDeviceId: "",
            selectedDeviceType: "",
            selectedActionType: "",
            selectedActionTypeName:"",
            parameters: [],
            deviceActionTypes: [],
        }
    }

    componentWillReceiveProps(nextProps: Props){
        this.setState({
            actions: nextProps.actions
        })
    }

    onAddBtnClick = (e:any) => {
        let newAction = {
            type: this.state.selectedActionType,
            parameters: _.cloneDeep(this.state.parameters),
            name: this.state.selectedActionTypeName,
            deviceType: this.state.selectedDeviceType,
            guid: uuidv1()
        };

        this.setState((state) => {
            actions: state.actions.push(newAction);
        }, () => {
            this.setState({
                ...this.defaultValue
            });
        });
    }

    onDeleteBtnClick = (guid: string) => {
        let copyActions = this.state.actions.slice();
        copyActions = copyActions.filter((action) => {
            return action.guid !== guid;
        })
        this.setState({
            actions: copyActions
        });
    }

    updateHost(){
        this.props.onChanged(this.state.actions);
    }

    handleChange = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.type == 'checkbox'? event.target.checked : event.target.value
        });
    };

    handleDeviceChange = (event: any) => {
        let listActionTypes = [];
        let deviceType = "";
        if(event.target.value){
            let device = this.findDeviceById(event.target.value)
            if(device){
                listActionTypes = this.props.deviceDictionary[device.type].actionTypes
                deviceType = this.props.deviceDictionary[device.type].name
            }
        }

        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            deviceActionTypes: listActionTypes,
            selectedDeviceType: deviceType,
        });
    };

    handleActionTypesChange = (event: any) => {
        let listParameters: IParameter[] = [];
        if(event.target.value && event.target.value !=""){
            let actionType = this.findActionTypeByName(event.target.value);
            listParameters = actionType.parameters;
        }

        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            selectedActionTypeName:event.target.value,
            parameters: listParameters,
        });
    };

    onParameterChange = (name: string, value: any) => {
        let parameter = this.findParamaterByName(name);
        parameter.value = value;

        this.setState(state => ({
            parameters: state.parameters
        }))
    }

    findParamaterByName = (name: string) => {
        let results = this.state.parameters.filter((parameter) => {
            return parameter.name === name;
        })

        if(results.length >= 0){
            return results[0];
        }else{
            throw new Error("Cannot found parameter");
        }
    }

    findActionTypeByName = (name: string) => {
        let results = this.state.deviceActionTypes.filter((item) => {
            return item.name === name;
        })

        if(results.length >= 0){
            return results[0];
        }else{
            throw new Error("Cannot found");
        }
    }

    findDeviceById = (id: string) => {
        let results = this.props.devices.filter((item) => {
            return item.id === id;
        })

        if(results.length >= 0){
            return results[0];
        }else{
            throw new Error("Cannot found");
        }
    }

    render() {
        return (
            <ActionListContainer>
                <ActionCreatorContainer>
                    <FormControl>
                        <InputLabel htmlFor="device">Device</InputLabel>
                        <Select
                            value={this.state.selectedDeviceId}
                            onChange={this.handleDeviceChange.bind(this)}
                            inputProps={{
                                name: 'selectedDeviceId',
                                id: 'device',
                            }}
                        >
                            {this.props.devices.map(device => {
                                return <MenuItem key={device.id} value={device.id}>{device.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="action-tpe">Action Type</InputLabel>
                        <Select
                            value={this.state.selectedActionType}
                            onChange={this.handleActionTypesChange.bind(this)}
                            inputProps={{
                                name: 'selectedActionType',
                                id: 'action-type',
                            }}
                        >
                            {this.state.deviceActionTypes.map(actionType => {
                                return <MenuItem key={actionType.name} value={actionType.name}>{actionType.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Divider />
                    {this.state.parameters && this.state.parameters.map(paramater => {
                        return <ActionParameterInput dataType={paramater.dataType} name={paramater.name} onChange={this.onParameterChange.bind(this)}/>
                    })}
                </ActionCreatorContainer>
                    
                <FuntionalButtonPanel>
                    <Button onClick={this.onAddBtnClick}>></Button>
                </FuntionalButtonPanel>
                <ActionList>
                    {this.state.actions.map(action => {
                        return (
                            <ListItem key={action.guid}>
                                <ListItemText
                                    primary={action.name}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={this.onDeleteBtnClick.bind(this, action.guid)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </ActionList>
            </ActionListContainer>
        )
    }
}