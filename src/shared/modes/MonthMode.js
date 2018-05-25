import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export class MonthMode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            month: -1,
            isRedirected: false
        }
    }

    handleMonthSwitched(value) {
        this.setState({
            month: value
        });
    }

    clearChoice() {
        this.props.onModeSwitched('');
    }

    goToMonthMode() {
        this.setState({ isRedirected: true });
    }

    render() {

        if(this.state.isRedirected) {
            return(
                <Redirect to={"/events/monthly-plan/" + this.state.month}/>
            );
        }

        return(
            <div>
                <p className="lead">
                    Proszę wybierz miesiąc:
                </p>
                <div>
                    {/* TODO: MonthSelector component */}
                    {/* <MonthSelector onUpdateHandler={this.handleMonthSwitched.bind(this)}/> */}
                    <br/>
                    <div className="btn-group">
                        <button className="btn btn-primary" type="button" onClick={() => this.goToMonthMode()}>Przejdź dalej</button>
                        <button className="btn btn-warning" type="button" onClick={() => this.clearChoice()}>Cofnij wybór</button>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

MonthMode.propTypes = {
    month: PropTypes.number
}