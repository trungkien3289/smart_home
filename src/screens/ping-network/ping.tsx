import React from 'react';
import {Paper, InputBase, IconButton, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import styled from 'styled-components';
import axios from 'axios';
import CronBuilder from  'react-cron-builder';
import 'react-cron-builder/dist/bundle.css'

const useStyles = {
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  };

interface IProps {
}

interface IState {
  host: string;
}

const PingContainer = styled.div`
  display : 'flex';
  align-content : 'center';
`

export default class PingNetWorkScreen extends React.Component<IProps, IState> {

  constructor(prop : IProps){
    super(prop);
    this.state = {
      host: ""
    }
  }

  handleClick = (e: any) => {
    axios.get("/api/pingnetwork");
  }

  onChangeHostInput = (e: any) => {
    this.setState({
      host: e.value
    })
  }

  onCronChange = (e) => {
    console.log(e);
  }

  render() {
    const classes = useStyles;
      return (
        <PingContainer>
          <Paper style={classes.root}>
            <InputBase
              style={classes.input}
              placeholder="Input host"
              inputProps={{ 'aria-label': 'Input host' }}
              value={this.state.host}
              onChange = {this.onChangeHostInput.bind(this)}
            />
            <IconButton color="primary" style={classes.iconButton} aria-label="Directions" onClick={this.handleClick.bind(this)}>
              <DirectionsIcon />
            </IconButton>
          </Paper>
          <CronBuilder 
        cronExpression="*/4 2,12,22 * * 1-5"
          onChange={this.onCronChange.bind(this)}
          showResult={false}
        />
        </PingContainer>
      );
    }
}