import * as React from 'react'
import { DataTypeEnum } from '../../../appConstants/enum';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

interface IState {
    value: string;
}

interface IProps {
    name: string;
    dataType: DataTypeEnum;
    onChange: (name: string, value: any) => void; 
}

export default class ActionParameterInput extends React.Component<IProps, IState>{

    state = {
        value: ""
    }

    handleChange = (event) => {
        this.setState({
            value : event.target.type === 'checkbox'? event.target.checked: event.target.value
        },() => {
            this.props.onChange(this.props.name, this.state.value);
        })
    }

    render(){
        {
            switch(this.props.dataType){
                case DataTypeEnum.NUMBER:{
                    return (
                        <TextField
                            id="standard-description"
                            label={this.props.name}
                            name={this.props.name}
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                            margin="normal"
                        />
                    )
                }
                case DataTypeEnum.STRING:{
                    return (
                        <TextField
                            id="standard-description"
                            label={this.props.name}
                            name="value"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                            margin="normal"
                        />
                    )
                }
                case DataTypeEnum.BOOLEAN:{
                    return (
                        <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.value}
                            onChange={this.handleChange.bind(this)}
                            color="primary"
                          />
                        }
                        label={this.props.name}
                      />
                    )
                }
                default: return (<></>)
            }
        }
    }
}