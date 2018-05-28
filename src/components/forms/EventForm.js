import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

import { CategorySelector } from './CategorySelector';
import { TimePeriodSelector } from './TimePeriodSelector';

export class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id ? props.match.params.id : -1,
            date: props.match.params.date ? moment(props.match.params.date, 'MM-DD-YYYY') : moment(),
            originalDate: props.match.params.date ? moment(props.match.params.date, 'MM-DD-YYYY') : null,
            title: props.title ? props.title : '',
            category: props.category ? props.category : -1,
            period: props.period ? props.period : -1,
            person: props.match.params.personId ? props.match.params.personId : -1,
            persons: [],
            isValid: false,
            isSubmitted: false
        }
    }

    componentDidMount() {
        axios.get(STUDENTS_API)
        .then(response => this.setState({persons: response.data}))
        .catch(err => console.error(err));

        if (this.state.id !== -1) {
            axios.get(EVENTS_API + `/${this.state.id}`)
            .then(response => {
                let data = response.data;
                this.setState({
                    date: moment(data.date, 'MM-DD-YYYY'),
                    originalDate: moment(data.date, 'MM-DD-YYYY'),
                    title: data.title,
                    category: data.category,
                    period: data.period,
                    person: data.person
                });
            }).then (() => this.validateData()) // validate everything after fetching from API when editing, so the save button will be available if everything's ok
            .catch(err => console.error(err));
        }
    }

    handleInput(event) {
        let target = event.target;
        let name = target.name;
        this.setState({
            [name]: target.value,
        }, () => { this.validateData() });
    }
    
    handleDateChange(event) {
        this.setState({date: event},
        () => { this.validateData() });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.isValid){
            console.log('data sent');

            const body = {
                title: this.state.title,
                category: this.state.category,
                person: this.state.person,
                period: this.state.period,
                date: this.state.date.format('MM-DD-YYYY')
            }
            let SUBMIT_API = EVENTS_API;
            let method = 'post';

            if (this.props.match.params.id) {
                SUBMIT_API = EVENTS_API + `/${this.props.match.params.id}`;
                method = 'put';
            }
            
            axios(SUBMIT_API, {
                method: method,
                url: SUBMIT_API,
                data: body
            }).then(response => this.setState({isSubmitted: true}))
            .catch(err => console.error(err));

            
        }
    }

    validateData() {
        let dateToValidate = this.state.originalDate === null ? moment() : this.state.originalDate; // when editing,
        // allow users to choose a date that is either the same as previously chosen or a later one
        if (this.state.date.isSameOrAfter(dateToValidate, 'day') && this.state.title &&
            this.state.category > 0 && this.state.period > 0 && this.state.person > 0) {
                this.setState({isValid: true});
            } else {
                this.setState ({isValid: false});
            }
    }

    render() {

        if(this.state.isSubmitted) {
            return (
                <Redirect to={{
                    pathname: `/events/persons-plan/${this.state.person}`,
                    state: {
                        redirected: true,
                        id: this.state.id,
                        person: this.state.person
                    }
                }}/>
            );
        }
        let eventAlert = (
            <div className="alert alert-warning" role="alert">
                Tworzysz nowe wydarzenie.
            </div>
        );
        if(this.state.id !== -1) {
            eventAlert = (
                <div className="alert alert-warning" role="alert">
                    Edytujesz wydarzenie o id <strong>{this.state.id}</strong>.
                </div>
            );
        }

        let personsOptions = this.state.persons.map(person => {
            return(
                <option value={person.id} key={person.id}>#{person.id} - {person.firstName} {person.lastName}</option>
            );
        });

        let saveButtonText = this.state.id !== -1 ? 'Zapisz zmiany' : 'Utwórz wydarzenie';

        return(
            <div className="col-sm">
                {eventAlert}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="title">Tytuł:</label>
                        <input  
                                    type="text" className="form-control col-sm-6" 
                                    id="title" placeholder="Wpisz tytuł"
                                    value={this.state.title}
                                    name="title" onChange={this.handleInput.bind(this)}/>
                    </div>                  

                    <div className="form-group">
                        <label htmlFor="event-category">Kategoria</label>
                        <CategorySelector onUpdateHandler={this.handleInput.bind(this)} selectorValue={this.state.category}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Data</label>
                        <DatePicker dateFormat='DD.MM.YYYY' className="form-control" selected={this.state.date} onChange={this.handleDateChange.bind(this)} name="date" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="period">Przedział czasowy</label>
                        <TimePeriodSelector onUpdateHandler={this.handleInput.bind(this)} selectorValue={this.state.period}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="person">Osoba</label>
                        <select name="person" className="form-control col-sm-4" id="person" onChange={this.handleInput.bind(this)} value={this.state.person}>
                            <option value="-1" defaultValue disabled>---</option>
                            {personsOptions}
                        </select>
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary" disabled={!this.state.isValid}>{ saveButtonText }</button>
                </form>
            </div>
        );
    }
}



const STUDENTS_API = 'http://localhost:4000/students';
const EVENTS_API = 'http://localhost:4000/events';
