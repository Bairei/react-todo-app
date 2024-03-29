import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { EventCard } from '../event/EventCard';


export class DailyPlanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.match.params.date,
            events: [],
            persons: []
        }
    }

    componentWillMount() {
        axios.get(STUDENTS_API)
        .then(response => {
            this.setState({persons: response.data});
            axios.get(`${EVENTS_API}/${this.state.date}`)
            .then(response => this.setState({events: response.data}))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }

    render() {
        let recordsComponent = '';
        if (this.state.events.length < 1) {
            recordsComponent = (
                <div>Przepraszamy, ale w tym dniu nie ma żadnych wydarzeń. Możesz jednak stworzyć nowe wydarzenie, używając przycisków na dole.</div>
            );
        } else {
            let recordsList = this.state.events.map(event => {
                let person = this.state.persons.find(person => {
                    return person.id === event.person;
                });
                return (
                    <EventCard  key={event.id} id={event.id} title={event.title} date={moment(event.date, 'MM-DD-YYYY')} 
                                period={event.period} person={person} category={event.category}/>
                );
            });

            recordsComponent = (
                <div>
                    <ul className="list-group">
                        {recordsList}
                    </ul>
                </div>
            );
        }

        return (
            <div>
                <h1>Przeglądasz wydarzenia dla dnia {moment(this.state.date, 'MM-DD-YYYY').format('DD.MM.YYYY')}</h1>
                {recordsComponent}
                <br/><br/>
                <div className="text-right">
                    <Link to={`/event/createWithDate/${this.state.date}`} className="btn btn-primary pull-right">Stwórz nowe wydarzenie</Link>
                </div>
            </div>

        );
    }
}

const EVENTS_API = 'http://localhost:4000/events/dayPlan';
const STUDENTS_API = 'http://localhost:4000/students';
