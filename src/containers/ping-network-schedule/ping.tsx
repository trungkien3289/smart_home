import React, {Component} from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { IAppState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import LayoutDisplayListItem from '../../layout/DisplayListItem';
import { Button } from '@material-ui/core';
// using for css props in styled-components components.
import * as types from 'styled-components/cssprop'
import 'styled-components/macro'
import { PingNetworkScheduleList } from '../../components/ping-network-schedule/PingNetworkScheduleList';
import { IPingNetworkSchedule } from '../../store/ping-network/reducers';
import { getAllSchedule } from '../../store/ping-network/actions';
import AddPingScheduleDialog from '../../components/ping-network-schedule/add-schedule-dialog/AddPingScheduleDialog';

interface State {
  isOpenScheduleDialog: boolean;
}

interface OwnProps {
}

interface DispatchProps {
  getAllSchedules: () => void
}

interface StateProps {
  schedules: IPingNetworkSchedule[]
}

type Props = StateProps & OwnProps & DispatchProps

class PingNetWorkSchedule extends React.Component<Props, State>{
    constructor(prop:Props) {
        super(prop)
        this.state = {
          isOpenScheduleDialog:false
        }
      }

    componentDidMount(){
        this.props.getAllSchedules();
    }

    openScheduleDialog = () => {
        this.setState({
            isOpenScheduleDialog: true
        })
    }

    public render(){
        return (
          <>
            <LayoutDisplayListItem
              toolbar = {
                <Button variant="contained" color="primary" onClick={this.openScheduleDialog.bind(this)}>Add Schedule</Button>
              }
              listItems = {
                <PingNetworkScheduleList schedules = {this.props.schedules}></PingNetworkScheduleList>
              }
            ></LayoutDisplayListItem>
            <AddPingScheduleDialog open={this.state.isOpenScheduleDialog}/>
        </>
      );
    }
}

 const mapStateToProps = (states: IAppState, ownProps: OwnProps): StateProps => ({
      schedules : states.pingNetworkState.schedules
  })

  const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
    return {
      getAllSchedules: async () => {
        await dispatch(getAllSchedule())
        console.log('Get all schedule completed [UI]')
      }
    }
  }
  
  export default connect<StateProps, DispatchProps, OwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(PingNetWorkSchedule);