import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export class DayMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            isRedirected: false
        };
    }

    handleInput(event) {
        this.setState({
            date: event.target.value
        });
    }

    clearChoice() {
        this.props.onModeSwitched('');
    }

    goToDayMode() {
        this.setState({ isRedirected: true });
    }

    render() {
        if(this.state.isRedirected) {
            return(
                <Redirect to={"/events/day-plan/" + this.state.date}/>
            );
        }

        return(
            <div>
                <p className="lead">
                    Proszę wprowadzić datę, z której chcesz obejrzeć wydarzenia (możesz wybrać tylko daty, z którymi powiązane są jakieś wydarzenia):
                </p>
                <div>
                    {/* TODO: datepicker handler */}
                    <datepicker date-format="MM-dd-yyyy">
                        <input name="date" className="form-control" type="text" onChange={ this.handleInput.bind(this) }/>
                    </datepicker>
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

DayMode.propTypes = {
    date: PropTypes.string
}