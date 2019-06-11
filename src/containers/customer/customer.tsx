import React, {Component} from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { ICustomer } from '../../store/customers/reducers';
import { IAppState } from '../../store/rootReducer';
import { getAllCustomers } from '../../store/customers/actions';
import { connect } from 'react-redux';
import { CustomerList } from '../../components/customer/List';
import LayoutDisplayListItem from '../../layout/DisplayListItem';
import { Button } from '@material-ui/core';
// using for css props in styled-components components.
import * as types from 'styled-components/cssprop'
import 'styled-components/macro'

interface State {
}

interface OwnProps {
}

interface DispatchProps {
  getAllCustomers: () => void
}

interface StateProps {
  customers: ICustomer[]
}

type Props = StateProps & OwnProps & DispatchProps

class Customer extends React.Component<Props, State>{
    constructor(prop:Props) {
        super(prop)
        this.state = {
        }
      }

    componentDidMount(){
        this.props.getAllCustomers();
    }
    public render(){
        return (
          <LayoutDisplayListItem
            toolbar = {
              <Button variant="contained" color="primary">Thêm Khách Hàng</Button>
            }
            listItems = {
              <CustomerList customers = {this.props.customers}></CustomerList>
            }
          ></LayoutDisplayListItem>
         
        );
    }
}

 const mapStateToProps = (states: IAppState, ownProps: OwnProps): StateProps => ({
      customers : states.customerState.customers
  })

  const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
    return {
        getAllCustomers: async () => {
        await dispatch(getAllCustomers())
        console.log('Get all customers completed [UI]')
      }
    }
  }
  
  export default connect<StateProps, DispatchProps, OwnProps, IAppState>(mapStateToProps, mapDispatchToProps)(Customer);