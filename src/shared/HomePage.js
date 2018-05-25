import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DefaultMode } from './modes/DefaultMode';
import { PersonMode } from './modes/PersonMode';
import { DayMode } from './modes/DayMode';
import { MonthMode } from './modes/MonthMode';

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: ''
        }
    }

    handleSwitchMode(value) {
        // console.log('received value: ' + value);
        this.setState({
            mode: value
        })
    }

    render() {
        let modeComponent = (<DefaultMode onModeSwitched={this.handleSwitchMode.bind(this)}/>);
        switch(this.state.mode) {
            case 'person' : 
                modeComponent = (<PersonMode onModeSwitched={this.handleSwitchMode.bind(this)}/>);
                break;
            case 'month' :
                modeComponent = (<MonthMode onModeSwitched={this.handleSwitchMode.bind(this)}/>);
                break;
            case 'day' :
                modeComponent = (<DayMode onModeSwitched={this.handleSwitchMode.bind(this)}/>);
                break;
            default :
                modeComponent = (<DefaultMode onModeSwitched={this.handleSwitchMode.bind(this)}/>);
                break;        
        }

        return(
            <div>
                <h1 className="display-4">Witamy w aplikacji do zarządzania planem dnia!</h1>
                {modeComponent}
                <Link to="/event/create" className="btn btn-success">Stwórz nowe wydarzenie</Link>
            </div>
        );
    }
}

HomePage.propTypes = {
    mode: PropTypes.string
};