import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Link } from 'react-router-dom';

import { CategoryBar } from './CategoryBar';

export class EventCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            id: props.id,
            category: props.category,
            date: props.date,
            period: props.period,
            person: props.person
        }
    }

    render() {
        let periodStr = '';
        switch (this.state.period){
            case 1:
                periodStr = '8 - 10';
                break;
            case 2:
                periodStr = '10 - 12';
                break;
            case 3:
                periodStr = '12 - 14';
                break;
            case 4:
                periodStr = '14 - 16';
                break;
            case 5:
                periodStr = '16 - 18';
                break;
            case 6:
                periodStr = '18 - 20';
                break;
            case 7:
                periodStr = '20 - 22';
                break;
            case 8:
                periodStr = '22 - 24';
                break;
            default:
                periodStr = '<unknown>';
                break;
        }

        return(
            <div className="card">
                <CategoryBar category={this.state.category}/>
                <div className="card-body">
                    <h5 className="card-title"><b>Tytuł wydarzenia:</b> {this.state.title}</h5>
                    <h5 className="card-title"><b>Data: </b>{this.state.date.format('DD.MM.YYYY')}</h5>
                    <p className="card-text"><b>Przedział czasowy:</b> {periodStr}</p>
                    <p className="card-text">
                        <b>Osoba: </b> 
                        <Link to={`/events/persons-plan/${this.state.person.id}`}>{this.state.person.firstName} {this.state.person.lastName}</Link>
                    </p>
                    <div className="btn-group">
                        <Link to={`/event/edit/${this.state.id}`} className="btn btn-primary">Edytuj</Link>
                        <Link to={`/event/delete/${this.state.id}`} className="btn btn-danger">Usuń</Link>
                    </div>
                </div>
            </div>
        );
    }
}

EventCard.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    category: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    period: PropTypes.number.isRequired,
    person: function(props, propName, componentName) {
        let checkedProp = props[propName];
        
        if (typeof(checkedProp.id) === 'undefined' || checkedProp.id < 1 ) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed. Reason: invalid person\'s id was provided.'
              );
        }
        if (typeof(checkedProp.firstName) === 'undefined' || checkedProp.firstName.length < 1) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed. Reason: invalid person\'s first name was provided.'
              );
        }
        if (typeof(checkedProp.lastName) === 'undefined' || checkedProp.lastName.length < 1) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed. Reason: invalid person\'s last name was provided.'
              );
        }

    }
}