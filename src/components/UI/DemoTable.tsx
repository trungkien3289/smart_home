import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { AnyAaaaRecord } from 'dns';

let counter = 0;
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array: any[], cmp: Function) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order: any, orderBy: any) {
  return order === 'desc' ? (a: any, b: any) => desc(a, b, orderBy) : (a: any, b: any) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

interface IEnhancedTableHeadProps {
    numSelected: number,
    onRequestSort: Function,
    onSelectAllClick?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined,
    order: "desc" | "asc",
    orderBy: string,
    rowCount: number,
}

class EnhancedTableHead extends React.Component<IEnhancedTableHeadProps> {
    createSortHandler = (property: any) => (event: any) => {
      this.props.onRequestSort(event, property);
    };
  
    render() {
      const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
  
      return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={this.props.onSelectAllClick}
              />
            </TableCell>
            {rows.map(
              row => (
                <TableCell
                  key={row.id}
                  align={row.numeric ? 'right' : 'left'}
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ),
              this,
            )}
          </TableRow>
        </TableHead>
      );
    }
  }
  
  const toolbarStyles = (theme:Theme) => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });
  
interface IEnhancedTableToolbarProps {
    classes: any,
    numSelected: number,
}
  let EnhancedTableToolbar : React.SFC<IEnhancedTableToolbarProps> = (props) => {
    const { numSelected, classes } = props;
  
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              Nutrition
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  };
  
  let EnhancedTableToolbarWithStyle = withStyles(toolbarStyles)(EnhancedTableToolbar);
  
  const styles = (theme : Theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto' as "hidden" | "inherit" | "clip" | "-moz-initial" | "initial" | "revert" | "unset" | "auto" | "visible" | "scroll" | undefined ,
    },
  });
  



interface IEnhancedTableProps {
    classes: any,
    // scheme:
}

interface IEnhancedTableStates {
    order: "asc" | "desc",
    orderBy: string,
    selected: any[],
    data: any[],
    page: number,
    rowsPerPage: number,
}

  class EnhancedTable extends React.Component<IEnhancedTableProps, IEnhancedTableStates> {
      constructor(props: IEnhancedTableProps){
          super(props);
          this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data: [
              createData('Cupcake', 305, 3.7, 67, 4.3),
              createData('Donut', 452, 25.0, 51, 4.9),
              createData('Eclair', 262, 16.0, 24, 6.0),
              createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
              createData('Gingerbread', 356, 16.0, 49, 3.9),
              createData('Honeycomb', 408, 3.2, 87, 6.5),
              createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
              createData('Jelly Bean', 375, 0.0, 94, 0.0),
              createData('KitKat', 518, 26.0, 65, 7.0),
              createData('Lollipop', 392, 0.2, 98, 0.0),
              createData('Marshmallow', 318, 0, 81, 2.0),
              createData('Nougat', 360, 19.0, 9, 37.0),
              createData('Oreo', 437, 18.0, 63, 4.0),
            ],
            page: 0,
            rowsPerPage: 5,
          }
      }
   
  
    handleRequestSort = (event: any, property: any) => {
      const orderBy = property;
      let order: "desc" | "asc" = 'desc';
  
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }
  
      this.setState({ order, orderBy });
    };
  
    handleSelectAllClick = (event: any) => {
      if (event.target.checked) {
        this.setState(state => ({ selected: state.data.map(n => n.id) }));
        return;
      }
      this.setState({ selected: [] });
    };
  
    handleClick = (event: any, id: number) => {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected: any[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      this.setState({ selected: newSelected });
    };
  
    handleChangePage = (event: any, page: any) => {
      this.setState({ page });
    };
  
    handleChangeRowsPerPage = (event: any) => {
      this.setState({ rowsPerPage: event.target.value });
    };
  
    isSelected = (id: number | undefined) => this.state.selected.indexOf(id) !== -1;
  
    render() {
      const { classes } = this.props;
      const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
      return (
        <Paper className={classes.root}>
          <EnhancedTableToolbarWithStyle numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.name}
                        </TableCell>
                        <TableCell align="right">{n.calories}</TableCell>
                        <TableCell align="right">{n.fat}</TableCell>
                        <TableCell align="right">{n.carbs}</TableCell>
                        <TableCell align="right">{n.protein}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      );
    }
  }
  
  export default withStyles(styles)(EnhancedTable);
