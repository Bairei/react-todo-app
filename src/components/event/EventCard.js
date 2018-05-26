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
            personId: props.personId,
            personFirstName: props.personFirstName,
            personLastName: props.personLastName
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

        // console.log(this.state.date);
        return(
            <div className="card">
                <CategoryBar category={this.state.category}/>
                <div className="card-body">
                    <h5 className="card-title"><b>Tytuł wydarzenia:</b> {this.state.title}</h5>
                    <h5 className="card-title"><b>Data: </b>{this.state.date.format('DD.MM.YYYY')}</h5>
                    <p className="card-text"><b>Przedział czasowy:</b> {periodStr}</p>
                    <p className="card-text">
                        <b>Osoba: </b> 
                        <Link to={`/event/persons-plan/${this.state.personId}`}>{this.state.personFirstName} {this.state.personLastName}</Link>
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
    personId: PropTypes.number.isRequired,
    personFirstName: PropTypes.string.isRequired,
    personLastName: PropTypes.string.isRequired
}