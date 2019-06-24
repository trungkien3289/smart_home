import React from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';
import { InformationForm } from './InformationForm';

interface IState {
    name: string;
    description: string;
}

interface IProps {
    name: string;
    description: string;
    onChanged: (name: string, description: string) => void;
    className: string;
}

export default class ScheduleInformation extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            name: "",
            description: "",
        };
    }

    componentWillReceiveProps(nextProps: IProps){
        if(this.props.name != nextProps.name || this.props.description != nextProps.description){
            this.setState({
                name: nextProps.name,
                description: nextProps.description
            })
        }
    }

    handleChange = (event: any) => {
        this.setState({
                ...this.state,
                [event.target.name]: event.target.value 
            });
    };

    updateValue = () => {
        this.props.onChanged(this.state.name, this.state.description);
    }

    render() {
        return(
            <InformationForm className={this.props.className}>
                <TextField
                    id="standard-name"
                    label="Name"
                    name="name"
                    value={this.state.name}
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
            </InformationForm>
        );
    }
}