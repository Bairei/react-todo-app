import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { EventCard } from '../event/EventCard';

export class PersonsPlanList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            person: props.location.state ? props.location.state.person : {},
            events: []
        }
    }

    componentWillMount(){
        axios.get(STUDENT_API + `/${this.state.id}`)
        .then(response => {
            this.setState({person: response.data})
            axios.get(EVENTS_API + `/${this.state.id}`)
            .then(response => this.setState({events: response.data}))
            .catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    render(){
        let submittedAlert = '';
        if(typeof this.props.location.state !== 'undefined' && this.props.location.state.redirected) {
            if (this.props.location.state.deletionStatus) {
                submittedAlert = (
                    <div className="alert alert-success">
                        Pomyślnie usunięto wydarzenie!
                    </div>
                );
            } else if (this.props.location.state.deletionStatus === false) {
                submittedAlert = (
                    <div className="alert alert-success">
                        Nie usunięto wybranego wydarzenia.
                    </div>
                );
            } else {
                submittedAlert = (
                    <div className="alert alert-success">
                        Wydarzenie pomyślnie zapisano!
                    </div>
                );
            }
        }
        let recordsComponent = '';
        let personComponent = '';
        if(this.state.events.length < 1) {
            recordsComponent = (
                <div>Przepraszamy, ale ta osoba nie ma żadnych wydarzeń. Możesz jednak stworzyć nowe wydarzenie, używając przycisków na dole.</div>
            );
        } else {
            let recordsList = this.state.events.map(event => {
                return (
                    <EventCard  key={event.id} id={event.id} title={event.title} date={moment(event.date, 'MM-DD-YYYY')} 
                                period={event.period} personId={this.state.person.id} personFirstName={this.state.person.firstName}
                                personLastName={this.state.person.lastName} category={event.category}/>
                );
            });
            recordsComponent = (
                <div>
                    {recordsList}
                </div>
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
                    {submittedAlert}
                    {personComponent}
                    {/* TODO: create Events navigation bar, or skip it */}
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

PersonsPlanList.propTypes = {
    id: PropTypes.number || PropTypes.string,
    person: PropTypes.object,
    events: PropTypes.array
}

const STUDENT_API = 'http://localhost:4000/students'
const EVENTS_API = 'http://localhost:4000/events/personsPlan';