import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// using for css props in styled-components components.
import 'styled-components/macro'
import { IDevice } from '../../store/device/reducers';
import { Switch, IconButton} from '@material-ui/core';
import styled from 'styled-components/macro';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
    devices: IDevice[];
    onChangeStatus: (id :string, status: boolean) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

interface DispatchProps {
}

type Props = OwnProps & DispatchProps

export class DeviceList extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
    }
    handleChangeStatus = (id: string, checked: boolean) => {
        this.props.onChangeStatus(id, checked);
    }

    public render() {
        let listdeviceViewModels =  this.props.devices.slice();
        return (
            <Paper className='root' css="flex: 1 1 auto">
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Descrition</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listdeviceViewModels.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">
                                    <StatusSwitchContainer>
                                        <label>Off</label>
                                        <Switch
                                            checked={row.isActive}
                                            onChange={(event) => {this.handleChangeStatus(row.id, event.target.checked)}}
                                            name={row.name}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        <label>On</label>
                                    </StatusSwitchContainer>
                                </TableCell>
                                <TableCell align="right">{row.createdDate}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="Delete"  onClick={() =>this.props.onDelete(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="Edit"  onClick={() =>this.props.onEdit(row.id)}>
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