import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Link } from 'react-router-dom';


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
        // console.log('hello');
        fetch(STUDENTS_API)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    this.setState({persons: data});
                });
            }
        });

        fetch(`${EVENTS_API}/${this.state.date}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        console.log(data);
                        this.setState({events: data});
                    });
                }
            });
    }

    render() {
        let recordsComponent = '';
        if (this.state.events.length < 1) {
            recordsComponent = (
                <div>Przepraszamy, ale w tym dniu nie ma żadnych wydarzeń. Możesz jednak stworzyć nowe wydarzenie, używając przycisków na dole.</div>
            );
        } else {
            // TODO: switch from creating an unordered list to EventComponent
            let recordsList = this.state.events.map(event => {
                // console.log(event);
                let person = this.state.persons.find(person => {
                    // console.log(`${person.id}`);
                    // console.log(event.person);
                    // console.log(`equals: ${person.id} ${event.person} == ${person.id == event.person}`);
                    return person.id == event.person;
                });
                // console.log(person);
                return (
                    <li key={event.id}>{event.id} - {event.title}, by: {person.firstName} {person.lastName}</li>
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
                <h1>Przeglądasz wydarzenia dla dnia {this.state.date}</h1>
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