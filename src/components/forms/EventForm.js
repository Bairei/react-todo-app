import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CategorySelector } from './CategorySelector';
import { TimePeriodSelector } from './TimePeriodSelector';

export class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date ? moment(props.date, 'YYYY-MM-DD') : moment(),
            title: props.title ? props.title : '',
            category: props.category ? props.category : -1,
            period: props.period ? props.period : -1,
            person: props.person ? props.person : -1,
            persons: [],
            isValid: false,
            isSubmitted: false
        }
    }

    componentDidMount() {
        fetch(STUDENTS_API)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({persons: data});
                })
            }
        });
    }

    handleInput(event) {
        let target = event.target;
        let name = target.name;
        // console.log(name);
        // console.log(event.target.value);
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
                date: this.state.date.format('YYYY-MM-DD')
            }
            console.log(body);

            fetch(EVENTS_POST_API, {
                body: JSON.stringify(body),
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
                
            }).then(response => {
                response.json().then(json => console.log(json));
                this.setState({isSubmitted: true});
            })

            
        }
    }

    validateData() {
        // console.log(this.state.date.isSameOrAfter(moment(), 'day'));
        if (this.state.date.isSameOrAfter(moment(), 'day') && this.state.title &&
            this.state.category > 0 && this.state.period > 0 && this.state.person > 0) {
                this.setState({isValid: true});
            } else {
                this.setState ({isValid: false});
            }
    }

    render() {

        if(this.state.isSubmitted) {
            return (
                <Redirect to="/"/>
            );
        }

        let personsOptions = this.state.persons.map(person => {
            return(
                <option value={person.id} key={person.id}>#{person.id} - {person.firstName} {person.lastName}</option>
            );
        })

        return(
            <div className="col-sm">
                <div className="alert alert-warning" role="alert">
                    Tworzysz nowe wydarzenie.
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="title">
                            <input  
                                    type="text" className="form-control" 
                                    id="title" placeholder="Wpisz tytuł"
                                    value={this.state.title}
                                    name="title" onChange={this.handleInput.bind(this)}/>
                        </label>
                    </div>                  

                    <div className="form-group">
                        <label htmlFor="event-category">Kategoria</label>
                        {/* TODO: categoryselector */}
                        <CategorySelector onUpdateHandler={this.handleInput.bind(this)} />
                        {/* <CategorySelector name="category" id="event-category" onCategoryChange={this.handleInput.bind(this)}/> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Data</label>
                        <DatePicker dateFormat='YYYY-MM-DD' className="form-control" selected={this.state.date} onChange={this.handleDateChange.bind(this)} name="date" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="period">Przedział czasowy</label>
                        {/* TODO: time period */}
                        <TimePeriodSelector onUpdateHandler={this.handleInput.bind(this)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="person">Osoba</label>
                        <select name="person" className="form-control col-sm-4" id="person" onInput={this.handleInput.bind(this)}>
                            <option value="-1" defaultValue disabled>---</option>
                            {personsOptions}
                        </select>
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary" disabled={!this.state.isValid}>Stwórz wydarzenie</button>
                </form>
            </div>
        );
    }
}

const STUDENTS_API = 'http://localhost:4000/students';
const EVENTS_POST_API = 'http://localhost:4000/events/';