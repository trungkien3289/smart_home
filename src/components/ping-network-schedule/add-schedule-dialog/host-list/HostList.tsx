import React from 'react';
import {  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, InputBase, Divider, Button, Fab } from '@material-ui/core';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBaseHostList from './InputBaseHostList'
import AddIcon from '@material-ui/icons/Add';
import HostListContainer from './HostListContainer';

const TabContainer = styled.div`
    width: 800px;
    height: 500px;
`;

const AddHostContainer = styled.div`
    display:flex;
`;

interface State {
    hosts: string[];
    hostInputValue: string;
    isAddHostBtnDisabled: boolean;
}

interface Props {
    onChanged: (hosts: string[]) => void;
    className: string;
    hosts: string[];
}

export class HostList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            hosts: this.props.hosts || [],
            hostInputValue: "",
            isAddHostBtnDisabled: true
        }
    }

    componentWillReceiveProps(nextProps: Props){
        this.setState({
            hosts: nextProps.hosts
        })
    }

    onHostInputChange = (e: any) => {
        let inputVal = e.target.value;
        let _isAddHostBtnDisabled = inputVal !== "" ? false: true;
     
        this.setState({
            hostInputValue: inputVal,
            isAddHostBtnDisabled: _isAddHostBtnDisabled
        });

    }

    onAddBtnClick = (e:any) => {
        if (this.state.hostInputValue!= "" && this.state.hosts.indexOf(this.state.hostInputValue) < 0) {
            // this.state.hosts.unshift(this.state.hostInputValue);
            this.setState({
                hosts: [this.state.hostInputValue, ...this.state.hosts]
            }, this.updateHost);
            this.setState({
                hostInputValue: "",
                isAddHostBtnDisabled: true
            })
        }else{
            throw("Host is existed in list.");
        }
    }

    onDeleteBtnClick = (selectedItem: string) => {
        let position = this.state.hosts.indexOf(selectedItem);
        if(position >= 0){
            let temps = this.state.hosts.slice();
            temps = temps.splice(position, 1);
            this.setState({
                hosts: temps
            }, this.updateHost);
        }
    }

    updateHost(){
        this.props.onChanged(this.state.hosts);
    }

    render() {
        return (
            <HostListContainer className={this.props.className}>
                <AddHostContainer>
                    <InputBaseHostList
                        placeholder="Add Host"
                        inputProps={{ 'aria-label': 'Add Host' }}
                        onChange = {this.onHostInputChange.bind(this)}
                        value = {this.state.hostInputValue}
                    />
                    <Divider />
                     <Fab color="primary" aria-label="Add" disabled={this.state.isAddHostBtnDisabled} onClick={this.onAddBtnClick.bind(this)}>
                        <AddIcon />
                    </Fab>
                </AddHostContainer>
                <List>
                    {this.state.hosts.map(host => {
                        return (
                            <ListItem>
                                <ListItemText
                                    primary={host}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={this.onDeleteBtnClick.bind(this, host)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </HostListContainer>
        )
    }
}