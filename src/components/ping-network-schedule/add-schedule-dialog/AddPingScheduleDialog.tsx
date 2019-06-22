import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, AppBar, Tabs, Tab } from '@material-ui/core';
import styled from 'styled-components';
import { HostList } from './host-list/HostList';
import ScheduleSetup from './schedule-setup/index'
import { IAppState } from '../../../store/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { addSchedule } from '../../../store/ping-network/actions';
import { connect } from 'react-redux';

const TabContainer = styled((props) => <div {...props}/>)`
    width: 800px;
    height: 500px;
    padding: 10px;
    display: ${props => props.hidden?"none":"flex"};
    flex-direction: column;
`
interface State {
    open: boolean;
    tabIndex: number;
    hosts: string[],
    expression: string,
    createdDate: string
}

interface OwnProps {
    open: boolean;
}

interface DispatchProps {
    addSchedule: (newSchedule: any) => void;
}

interface IStateProps {

}

type Props = OwnProps & DispatchProps & IStateProps

class AddPingScheduleDialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            tabIndex: 0,
            hosts: [],
            expression: "* * * * * *",
            createdDate:new Date().toString()
        }
    }
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.open !== this.state.open) {
            this.setState({
                open: nextProps.open
            })
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleSaveBtnClick = () => {
        this.props.addSchedule({
            name:"ping manually",
            active: true,
            expression : this.state.expression,
            hosts : this.state.hosts,
            createdDate: new Date().toString()
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

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="customized-dialog-title"
                open={this.state.open}
                maxWidth='lg'
            >
                <DialogTitle id="customized-dialog-title">
                    Add Ping Schedule
                </DialogTitle>
                <DialogContent>
                <div>
                    <AppBar position="static" color="default">
                        <Tabs value={this.state.tabIndex} onChange={this.handleTabChange.bind(this)}>
                        <Tab label="Host" />
                        <Tab label="Schedule" />
                        </Tabs>
                    </AppBar>
                    <TabContainer hidden={this.state.tabIndex != 0}>
                        <HostList className="hostlist-scheduledialog" onChanged={this.onHostListChanged.bind(this)} hosts={this.state.hosts}/>
                    </TabContainer>
                    <TabContainer hidden={this.state.tabIndex != 1}>
                        <ScheduleSetup onChanged={this.onScheduleSettingChanged.bind(this)} expression={this.state.expression}/>
                    </TabContainer>
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSaveBtnClick.bind(this)} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    addSchedule: async (newSchedule) => {
      await dispatch(addSchedule(newSchedule))
      console.log('Get all customers completed [UI]')
    }
  }
}

export default connect<IStateProps, DispatchProps, OwnProps, IAppState>(null, mapDispatchToProps)(AddPingScheduleDialog);