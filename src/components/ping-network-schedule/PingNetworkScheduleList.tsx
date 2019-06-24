import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// using for css props in styled-components components.
import 'styled-components/macro'
import { IPingNetworkSchedule } from '../../store/ping-network/reducers';
import AddPingScheduleDialog from './add-schedule-dialog/AddPingScheduleDialog';
import { Switch, Grid, Typography } from '@material-ui/core';
import { AntSwitch } from './AntSwitch';
import styled from 'styled-components/macro';

const StatusSwitchContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
`
interface State {

}

interface OwnProps {
    schedules: IPingNetworkSchedule[];
    onScheduleChangeStatus: (scheduleName:string, status: boolean) => void;
}

interface DispatchProps {
}

type Props = OwnProps & DispatchProps

export class PingNetworkScheduleList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpenScheduleDialog: false
        }
    }
    handleChange = () => {

    }
    handleChangeStatus = (event: any) => {
        let scheduleName = event.target.name;
        this.props.onScheduleChangeStatus(event.target.name, event.target.checked);
    }

    public render() {
        return (
            <Paper className='root' css="flex: 1 1 auto">
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Expression</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.schedules.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.expression}</TableCell>
                                <TableCell align="right">
                                    <StatusSwitchContainer>
                                        <label>Off</label>
                                        <Switch
                                            checked={row.active}
                                            onChange={this.handleChangeStatus.bind(this)}
                                            name={row.name}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        <label>On</label>
                                    </StatusSwitchContainer>
                                </TableCell>
                                <TableCell align="right">{row.createdDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}
