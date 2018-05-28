import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';


import { MonthDisplay } from './MonthDisplay';
import { EventCard } from '../event/EventCard';

export class MonthlyPlanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: props.match.params.month,
            events: [],
            persons: []
        }
    }

    componentWillMount() {
        axios.get(STUDENTS_API)
        .then(response => {
            this.setState({persons: response.data});
            axios.get(`${EVENTS_API}/${this.state.month}`)
            .then(response => this.setState({events: response.data}))
            .catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    render() {
        let recordsComponent = '';
        if (this.state.events.length < 1) {
            recordsComponent = (
                <div>Przepraszamy, ale w tym miesiącu nie ma żadnych wydarzeń. Możesz jednak stworzyć nowe wydarzenie, używając przycisków na dole.</div>
            );
        } else {
            let recordsList = this.state.events.map(event => {
                let person = this.state.persons.find(person => {
                    return person.id === event.person;
                });
                return (
                    <EventCard  key={event.id} id={event.id} title={event.title} date={moment(event.date, 'MM-DD-YYYY')} 
                                period={event.period} personId={person.id} personFirstName={person.firstName}
                                personLastName={person.lastName} category={event.category}/>
                    
                );
            });

            recordsComponent = (
                <div>
                    {recordsList}
                </div>
            );
        }

        return (
            <div>
                <MonthDisplay month={this.state.month}/>
                {recordsComponent}
                <br/><br/>
                <div className="text-right">
                    <Link to="/event/create" className="btn btn-primary pull-right">Stwórz nowe wydarzenie</Link>
                </div>
            </div>

        );
    }
}

const EVENTS_API = 'http://localhost:4000/events/monthlyPlan';
const STUDENTS_API = 'http://localhost:4000/students';

MonthlyPlanList.propTypes = {
    events: PropTypes.array,
    persons: PropTypes.array,
}