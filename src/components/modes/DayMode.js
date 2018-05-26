import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export class DayMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
            isRedirected: false,
            availableDates: []
        };
    }

    handleInput(event) {
        console.log(event.format('MM-DD-YYYY'));
        //console.log(event.target.value);
        this.setState({
            date: event
        });
    }

    clearChoice() {
        this.props.onModeSwitched('');
    }

    goToDayMode() {
        this.setState({ isRedirected: true });
    }

    componentDidMount() {
        fetch(EVENTS_API)
            .then(response => {
                if(response.ok) {
                    response.json().then(data => {
                        let dates = data.map(item => {
                            return moment(item.date, 'MM-DD-YYYY');
                        });

                        let found = dates.find(function (value) {
                            return value.format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
                        });
                        this.setState({
                            availableDates: dates,
                            date: typeof found === 'undefined' ? null : moment()
                        });
                    });
                }
            })
    }

    render() {
        if(this.state.isRedirected) {
            return(
                <Redirect to={"/events/day-plan/" + this.state.date.format('MM-DD-YYYY')}/>
            );
        }

        return(
            <div>
                <p className="lead">
                    Proszę wprowadzić datę, z której chcesz obejrzeć wydarzenia (możesz wybrać tylko daty, z którymi powiązane są jakieś wydarzenia):
                </p>
                <div>
                    {/* TODO: datepicker handler */}
                    <DatePicker selected={this.state.date}
                        className="form-control"
                        onChange={this.handleInput.bind(this)}
                        includeDates={this.state.availableDates}
                        dateFormat="DD.MM.YYYY"/>
                    {/* <datepicker date-format="MM-dd-yyyy">
                        <input name="date" className="form-control" type="text" onChange={ this.handleInput.bind(this) }/>
                    </datepicker> */}
                    <br/><br/>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => this.goToDayMode()}>Przejdź dalej</button>
                        <button className="btn btn-warning" onClick={() => { this.clearChoice(); }}>Cofnij wybór</button>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

const EVENTS_API = 'http://localhost:4000/events';

DayMode.propTypes = {
    date: PropTypes.string
};