import React, { Component } from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { IAppState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import LayoutDisplayListItem from '../../layout/DisplayListItem';
import { Button } from '@material-ui/core';
// using for css props in styled-components components.
import * as types from 'styled-components/cssprop'
import 'styled-components/macro'
import { DeviceList } from '../../components/device/DeviceList';
import { IDevice } from '../../store/device/reducers';
import {  getAllDevice, updateDeviceStatus, toggleAddDeviceDialog, deleteDevice, toggleEditDeviceDialog } from '../../store/device/actions';
import AddDeviceDialog from '../../components/device/AddDeviceDialog';
import EditDeviceDialog from '../../components/device/EditDeviceDialog';

interface State {
  isOpenDeviceDialog: boolean;
  editingItem: IDevice
}

interface OwnProps {
}

interface DispatchProps {
  getAllDevices: () => void;
  updateDeviceStatus: (name: string, isActive: boolean) => any;
  openAddDeviceDialog: () => void;
  deleteDevice: (id: string) => void;
  openEditDeviceDialog: () => void;
}

interface StateProps {
  devices: IDevice[]
}

type Props = StateProps & OwnProps & DispatchProps

class DeviceManagement extends React.Component<Props, State>{
  private defaultEditingItem: IDevice = {
    id: "",
    name: "",
    description: "",
    isActive: false,
    createdDate: "",
    type: "",
    //owner: "",
  };

  constructor(prop: Props) {
    super(prop)
    this.state = {
      isOpenDeviceDialog: false,
      editingItem: this.defaultEditingItem
    }
  }

  componentDidMount() {
    this.props.getAllDevices();
  }

  openDeviceDialog = () => {
    this.props.openAddDeviceDialog();
  }

  onStatusChange = (id: string, isActive: boolean) => {
    this.props.updateDeviceStatus(id, isActive);
  }

  onDeleteItem = (id: string) => {
    this.props.deleteDevice(id);
  }

  onEditItem = (id: string) => {
    try {
      let found = this.findDeviceById(id)
      this.setState({
        editingItem: {...found}
      }, this.props.openEditDeviceDialog)
    } catch (err) {
      console.log(err);
    }
  }

  findDeviceById = (id: string): IDevice => {
    let results = this.props.devices.filter((item) => {
      return item.id === id
    });
    if (results.length > 0) {
      return results[0];
    } else {
      throw new Error(`Cannot find device in list`);
    }
  }

  public render() {
    return (
      <>
        <LayoutDisplayListItem
          toolbar={
            <Button variant="contained" color="primary" onClick={this.openDeviceDialog.bind(this)}>Add Device</Button>
          }
          listItems={
            <DeviceList
              devices={this.props.devices}
              onChangeStatus={this.onStatusChange}
              onDelete={this.onDeleteItem}
              onEdit={this.onEditItem}
            ></DeviceList>
          }
        ></LayoutDisplayListItem>
        <AddDeviceDialog />
        <EditDeviceDialog selectedItem={this.state.editingItem} />
      </>
    );
  }
}

const mapStateToProps = (states: IAppState, ownProps: OwnProps): StateProps => ({
  devices: states.deviceState.devices
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    getAllDevices: async () => {
      await dispatch(getAllDevice())
      console.log('Get all devices completed [UI]')
    },
    updateDeviceStatus: async (id: string, isActive: boolean) => {
      await dispatch(updateDeviceStatus(id, isActive));
      console.log('Finish update status')
    },
    openAddDeviceDialog: () => {
      dispatch(toggleAddDeviceDialog());
    },
    deleteDevice: async (id: string) => {
      let result = await dispatch(deleteDevice(id));
      if (!result) {
        console.log("Delete device item fail");
      }
    },
    openEditDeviceDialog: () => {
      dispatch(toggleEditDeviceDialog());
    },
  }
}

export default connect<StateProps, DispatchProps, OwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(DeviceManagement);