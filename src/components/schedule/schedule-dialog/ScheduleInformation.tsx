import React from 'react';
import { Grid, Paper, TextField, Switch } from '@material-ui/core';
import { InformationForm } from './InformationForm';

interface IState {
    name: string;
    description: string;
    active: boolean;
}

interface IProps {
    name: string;
    description: string;
    active: boolean;
    onChanged: (name: string, description: string, active: boolean) => void;
    className: string;
    isEditMode:boolean;
}

export default class ScheduleInformation extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            name: this.props.name || "",
            description: this.props.description || "",
            active: this.props.active || false,
        };
    }

    componentWillReceiveProps(nextProps: IProps){
        if(this.props.name != nextProps.name || this.props.description != nextProps.description || this.props.active != nextProps.active){
            this.setState({
                name: nextProps.name,
                description: nextProps.description,
                active: nextProps.active
            })
        }
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
        }, () => {
            this.updateValue();
        });
    }

    updateValue = () => {
        this.props.onChanged(this.state.name, this.state.description, this.state.active);
    }

    render() {
        return(
            <InformationForm className={this.props.className}>
                <TextField
                    id="standard-name"
                    label="Name"
                    name="name"
                    value={this.state.name}
                    disabled={this.props.isEditMode}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.updateValue.bind(this)}
                    margin="normal"
                />
                <TextField
                    id="standard-description"
                    label="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.updateValue.bind(this)}
                    margin="normal"
                />
                <Switch
                    checked={this.state.active}
                    onChange={this.handleActiveChange.bind(this)}
                    name="active"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <label>{this.state.active ? "On": "Off"}</label>
            </InformationForm>
        );
    }
}