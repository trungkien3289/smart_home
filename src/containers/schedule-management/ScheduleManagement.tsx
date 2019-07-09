import React, { Component } from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { IAppState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import LayoutDisplayListItem from '../../layout/DisplayListItem';
import { Button } from '@material-ui/core';
// using for css props in styled-components components.
import * as types from 'styled-components/cssprop'
import 'styled-components/macro'
import { ScheduleList } from '../../components/schedule/ScheduleList';
import { ISchedule } from '../../store/schedule/reducers';
import { getAllSchedule, updateScheduleStatus, toggleAddScheduleDialog, deleteSchedule, toggleEditScheduleDialog } from '../../store/schedule/actions';
import AddScheduleDialog from '../../components/schedule/AddScheduleDialog';
// import EditPingScheduleDialog from '../../components/ping-network-schedule/add-schedule-dialog/EditPingScheduleDialog';

interface State {
  isOpenScheduleDialog: boolean;
  schedules: ISchedule[]
  editingItem: ISchedule
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
  schedules: ISchedule[]
}

type Props = StateProps & OwnProps & DispatchProps

class ScheduleManagement extends React.Component<Props, State>{
  private defaultEditingItem: ISchedule = {
    id: "",
    name: "",
    description: "",
    expression: "",
    createdDate: "",
    isActive: false,
    actions: [],
  };

  constructor(prop: Props) {
    super(prop)
    this.state = {
      isOpenScheduleDialog: false,
      schedules: [],
      editingItem: this.defaultEditingItem,
    }
  }

  componentDidMount() {
    this.props.getAllSchedules();
  }

  openScheduleDialog = () => {
    this.props.openAddScheduleDialog();
  }

  onScheduleStatusChange = (id: string, isActive: boolean) => {
    this.props.updateScheduleStatus(id, isActive);
  }

  onDeleteScheduleItem = (id: string) => {
    this.props.deleteSchedule(id);
  }

  onEditScheduleItem = (id: string) => {
    try {
      let found = this.findScheduleById(id)
      this.setState({
        editingItem: {...found}
      }, this.props.openEditScheduleDialog)
    } catch (err) {
      console.log(err);
    }
  }

  findScheduleById = (id: string): ISchedule => {
    let results = this.props.schedules.filter((item) => {
      return item.id === id
    });
    if (results.length > 0) {
      return results[0];
    } else {
      throw new Error(`Cannot find schedule in list`);
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
            <ScheduleList
              schedules={this.props.schedules}
              onScheduleChangeStatus={this.onScheduleStatusChange}
              onDeleteSchedule={this.onDeleteScheduleItem}
              onEditSchedule={this.onEditScheduleItem}
            ></ScheduleList>
          }
        ></LayoutDisplayListItem>
         <AddScheduleDialog />
        {/* <EditPingScheduleDialog selectedItem={this.state.editingItem} /> */}
      </>
    );
  }
}

const mapStateToProps = (states: IAppState, ownProps: OwnProps): StateProps => ({
  schedules: states.scheduleState.schedules
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    getAllSchedules: async () => {
      await dispatch(getAllSchedule())
      console.log('Get all schedule completed [UI]')
    },
    updateScheduleStatus: async (id: string, isActive: boolean) => {
      await dispatch(updateScheduleStatus(id, isActive));
      console.log('Finish update status')
    },
    openAddScheduleDialog: () => {
      dispatch(toggleAddScheduleDialog());
    },
    deleteSchedule: async (id: string) => {
      let result = await dispatch(deleteSchedule(id));
      if (!result) {
        console.log("Delete schedule item fail");
      }
    },
    openEditScheduleDialog: () => {
      dispatch(toggleEditScheduleDialog());
    },
  }
}

export default connect<StateProps, DispatchProps, OwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(ScheduleManagement);