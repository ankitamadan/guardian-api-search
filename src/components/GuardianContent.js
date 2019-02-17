import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {guardianAction} from '../actions/guardian';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography/Typography";
import moment from "moment";
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class GuardianContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allContent: [],
            pinnedContent: [],
            hasContentInfo: true,
            error: null,
            input: ''
        }
        this.handlePinned = this.handlePinned.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(guardianAction.getGuardianContent(null));
    }

    handlePinned(id) {
        const filter = this.props.guardian.results;
        filter[id].isPinned = !filter[id].isPinned;
        const pinned = filter.filter(item => item.isPinned);
        this.setState ({
            pinnedContent: pinned
        });
    }

    submit(e){
        e.preventDefault();
        this.props.dispatch(guardianAction.setIsLoading(false));
        this.props.dispatch(guardianAction.getGuardianContentWithQueryParam(this.state.input.toLowerCase(), this.state.pinnedContent));
    }

    handleFilterContent = input => event => {
        this.setState({ [input]: event.target.value });
    }

    render() {
        const {classes, guardian} = this.props;
        const { input } = this.state;

        const filterValue = guardian.results;

        if (!guardian.isLoading) {
            return (
                <React.Fragment>
                    <CircularProgress className={classes.progress} color="secondary" />
                </React.Fragment>
            );
        }

        if (filterValue.length > 0 ){
            return(
                <div className="container-fluid" style={{textAlign: "center"}}>
                    <div
                        className="titleRow"
                        style={{
                            color: "#4ac48f",
                            fontSize: "30px",
                            fontWeight: "bold"
                        }}
                    >
                        Guardian Content
                    </div>
                    <br/>

                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div className="form-group">
                            <form noValidate autoComplete="off" onSubmit={this.submit} >
                                <TextField
                                    id="standard-name"
                                    label="Search content"
                                    className={classes.textField}
                                    value={input}
                                    name={input}
                                    onChange={this.handleFilterContent('input')}
                                    margin="normal"
                                />
                            </form>
                            </div>
                        </div>
                    </div>
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Bookmark</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Link</TableCell>
                            <TableCell align="right">Publication Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterValue.map(content => (
                            <TableRow key={content.id}>
                                <Checkbox
                                    checked={content.isPinned}
                                    onChange={() => this.handlePinned(filterValue.indexOf(content))}
                                    value="checkedB"
                                    color="primary"
                                />
                                <TableCell >{content.webTitle}</TableCell>
                                <TableCell >{content.webUrl}</TableCell>
                                <TableCell >{moment(`${content.webPublicationDate}`).format("DD/MM/YYYY")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <Typography variant="body2" gutterBottom>No matched result</Typography>
                </React.Fragment>
            );
        }

    }
}

GuardianContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {

    return {
        guardian: state.guardians
    };
}

export default connect(mapStateToProps)(withStyles(styles)(GuardianContent));
