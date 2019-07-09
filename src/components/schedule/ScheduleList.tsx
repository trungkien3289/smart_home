import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// using for css props in styled-components components.
import 'styled-components/macro'
import { ISchedule } from '../../store/schedule/reducers';
import { Switch, IconButton} from '@material-ui/core';
import styled from 'styled-components/macro';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import cronstrue from 'cronstrue';

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
    schedules: ISchedule[];
    onScheduleChangeStatus: (scheduleName:string, status: boolean) => void;
    onDeleteSchedule: (name: string) => void;
    onEditSchedule: (name: string) => void;
}

interface DispatchProps {
}

type Props = OwnProps & DispatchProps

export class ScheduleList extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpenScheduleDialog: false
        }
    }
    handleChange = () => {

    }
    handleChangeStatus = (id: string, isActive: boolean) => {
        this.props.onScheduleChangeStatus(id, isActive);
    }

    public render() {
        let listScheduleViewModels =  this.props.schedules.map((item) => {
            let viewModel = {...item}
            viewModel.expression = cronstrue.toString(viewModel.expression);
            return viewModel;
        })
        return (
            <Paper className='root' css="flex: 1 1 auto">
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Expression</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listScheduleViewModels.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.expression}</TableCell>
                                <TableCell align="right">
                                    <StatusSwitchContainer>
                                        <label>Off</label>
                                        <Switch
                                            checked={row.isActive}
                                            onChange={(event) => this.handleChangeStatus(row.id, event.target.checked)}
                                            name={row.name}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        <label>On</label>
                                    </StatusSwitchContainer>
                                </TableCell>
                                <TableCell align="right">{row.createdDate}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="Delete"  onClick={() =>this.props.onDeleteSchedule(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="Edit"  onClick={() =>this.props.onEditSchedule(row.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}