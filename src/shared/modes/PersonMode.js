import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export class PersonMode extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            person: -1,
            isRedirected: false
        }
    }
    
    handleMonthSwitched(value) {
        this.setState({
            person: value
        });
    }

    clearChoice() {
        this.props.onModeSwitched('');
    }

    goToPersonMode() {
        this.setState({ isRedirected: true });
    }

    render() {

        if(this.state.isRedirected) {
            // TODO: redirect to correct page
            return(
                <Redirect to={"/events/persons-plan/" + this.state.person}/>
            );
        }

        return(
            <div>
                <p className="lead">
                    Proszę wybierz osobę, której wydarzenia chcesz obejrzeć:
                </p>
                <div className="lead">
                    {/* TODO: select for persons */}
                    {/* <select name="personSelect" class="form-control" id="personSelect" ng-model="person">
                        <option ng-repeat="person in people" value="{{person.id}}">{{person.firstName}} {{person.lastName}}</option>
                    </select> */}
                    <br/>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => this.goToPersonMode()}>Przejdź dalej</button>
                        <button className="btn btn-warning" onClick={() => this.clearChoice()}>Cofnij wybór</button>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}