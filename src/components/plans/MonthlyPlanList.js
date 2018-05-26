import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Link } from 'react-router-dom';

import { MonthDisplay } from './MonthDisplay';

export class MonthlyPlanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: props.match.params.month,
            events: [],
            persons: []
        }
    }

    componentDidMount() {
        fetch(STUDENTS_API)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    this.setState({persons: data});
                });
            }
        });

        fetch(`${EVENTS_API}/${this.state.month}`)
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
                <div>Przepraszamy, ale w tym miesiącu nie ma żadnych wydarzeń. Możesz jednak stworzyć nowe wydarzenie, używając przycisków na dole.</div>
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
    // month: PropTypes.any.isRequired
}