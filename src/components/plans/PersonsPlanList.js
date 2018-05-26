import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Link } from 'react-router-dom';

export class PersonsPlanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            person: props.location.state ? props.location.state.person : {},
            events: []
        }
    }

    componentDidMount(){
        fetch(STUDENT_API + `/${this.state.id}`)
            .then(response => {
                if(response.ok) {
                    response.json().then(data => {
                        this.setState({person: data});
                    });
                }
            });

        fetch(EVENTS_API + `/${this.state.id}`)
            .then((response) => {
                if (response.ok) {
                    response.json().then(data => {
                        this.setState({events: data})
                    });
                }
            });
    }

    render(){
        let recordsComponent = '';
        let personComponent = '';
        if(this.state.events.length < 1) {
            recordsComponent = (
                <div>Przepraszamy, ale ta osoba nie ma żadnych wydarzeń. Możesz jednak stworzyć nowe wydarzenie, używając przycisków na dole.</div>
            );
        } else {
            // TODO: create EventComponent and replace unordered list component with iterated components
            let recordsList = this.state.events.map(event => {
                return (
                    <li key={event.id}>{event.id} - {event.title}</li>
                );
            });
            recordsComponent = (
                <ul className="list-group">
                    {recordsList}
                </ul>
            );
        }

        if(this.state.person.firstName != null && this.state.person.lastName) {
            personComponent = (
                <h1>Przeglądasz wydarzenia dla osoby {this.state.person.firstName} {this.state.person.lastName}:</h1>
            )
        }

        return(
            <div>
                <div>
                    {personComponent}
                    {/* TODO: create Events navigation bar, or skip it */}
                    {/* <events-navigation on-update-sort="setSort(key)" on-update-filter="setFilter(key)"></events-navigation> */}
                    {/* <div ng-repeat="event in events | filter: filterPhrase | orderBy: orderByPhrase">
                        <show-event id="event.id" title="event.title" category="event.category" date="event.date" period="event.period" person="event.person"></show-event>
                    </div> */}
                    {recordsComponent}
                </div>
                <br/>
                <div className="text-right">
                    <Link to={`/event/createWithPerson/${this.state.id}`} className="btn btn-primary">Stwórz nowe wydarzenie</Link>
                </div>
            </div>
        );
    }
}

const STUDENT_API = 'http://localhost:4000/students'
const EVENTS_API = 'http://localhost:4000/events/personsPlan';