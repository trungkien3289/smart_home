import React from 'react';
import { ICustomer } from '../../store/customers/reducers';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import './List.scss';
// using for css props in styled-components components.
import 'styled-components/macro'

interface State{

}

interface OwnProps {
    customers: ICustomer[];
}

interface DispatchProps {

}

type Props = OwnProps & DispatchProps

export class CustomerList extends React.Component<Props, State> {
    public render() {
        return (
        <Paper className='root' css="flex: 1 1 auto">
        <Table className='table'>
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Code</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">email</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.props.customers.map(row => (
                <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
        )
    }
}
