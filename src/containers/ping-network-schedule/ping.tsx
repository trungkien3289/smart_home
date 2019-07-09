import React, { Component } from 'react';
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
import { getAllSchedule, updateScheduleStatus, toggleAddScheduleDialog as toggleAddScheduleDialog, deleteSchedule, toggleEditScheduleDialog } from '../../store/ping-network/actions';
import AddPingScheduleDialog from '../../components/ping-network-schedule/add-schedule-dialog/AddPingScheduleDialog';
import EditPingScheduleDialog from '../../components/ping-network-schedule/add-schedule-dialog/EditPingScheduleDialog';

interface State {
  isOpenScheduleDialog: boolean;
  editingItem: IPingNetworkSchedule
}

interface OwnProps {
}

interface DispatchProps {
  getAllSchedules: () => void;
  updateScheduleStatus: (name: string, status: boolean) => any;
  openAddScheduleDialog: () => void;
  deleteSchedule: (name: string) => void;
  openEditScheduleDialog: () => void;
}

interface StateProps {
  schedules: IPingNetworkSchedule[]
}

type Props = StateProps & OwnProps & DispatchProps

class PingNetWorkSchedule extends React.Component<Props, State>{
  private defaultEditingItem: IPingNetworkSchedule = {
    name: "",
    expression: "",
    active: false,
    hosts: [],
    description: "",
    createdDate: ""
  };

  constructor(prop: Props) {
    super(prop)
    this.state = {
      isOpenScheduleDialog: false,
      editingItem: this.defaultEditingItem
    }
  }

  componentDidMount() {
    this.props.getAllSchedules();
  }

  openScheduleDialog = () => {
    this.props.openAddScheduleDialog();
  }

  onScheduleStatusChange = (scheduleName: string, status: boolean) => {
    this.props.updateScheduleStatus(scheduleName, status);
  }

  onDeleteScheduleItem = (name: string) => {
    this.props.deleteSchedule(name);
  }

  onEditScheduleItem = (name: string) => {
    try {
      let found = this.findScheduleByName(name)
      this.setState({
        editingItem: {...found}
      }, this.props.openEditScheduleDialog)
    } catch (err) {
      console.log(err);
    }
  }

  findScheduleByName = (name: string): IPingNetworkSchedule => {
    let results = this.props.schedules.filter((item) => {
      return item.name === name
    });
    if (results.length > 0) {
      return results[0];
    } else {
      throw new Error(`Cannot find schedule with name ${name} in list`);
    }
  }

  public render() {
    return (
      <>
        <LayoutDisplayListItem
          toolbar={
            <Button variant="contained" color="primary" onClick={this.openScheduleDialog.bind(this)}>Add Schedule</Button>
          }
          listItems={
            <PingNetworkScheduleList
              schedules={this.props.schedules}
              onScheduleChangeStatus={this.onScheduleStatusChange}
              onDeleteSchedule={this.onDeleteScheduleItem}
              onEditSchedule={this.onEditScheduleItem}

            ></PingNetworkScheduleList>
          }
        ></LayoutDisplayListItem>
        <AddPingScheduleDialog />
        <EditPingScheduleDialog selectedItem={this.state.editingItem} />
      </>
    );
  }
}

const mapStateToProps = (states: IAppState, ownProps: OwnProps): StateProps => ({
  schedules: states.pingNetworkState.schedules
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    getAllSchedules: async () => {
      await dispatch(getAllSchedule())
      console.log('Get all schedule completed [UI]')
    },
    updateScheduleStatus: async (name: string, status: boolean) => {
      await dispatch(updateScheduleStatus(name, status));
      console.log('Finish update status')
    },
    openAddScheduleDialog: () => {
      dispatch(toggleAddScheduleDialog());
    },
    deleteSchedule: async (name: string) => {
      let result = await dispatch(deleteSchedule(name));
      if (!result) {
        console.log("Delete schedule item fail");
      }
    },
    openEditScheduleDialog: () => {
      dispatch(toggleEditScheduleDialog());
    },
  }
}

export default connect<StateProps, DispatchProps, OwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(PingNetWorkSchedule);