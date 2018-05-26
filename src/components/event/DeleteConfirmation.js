import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import moment from 'moment';

export class DeleteConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id ? props.match.params.id : -1,
            date: props.match.params.date ? moment(props.match.params.date, 'MM-DD-YYYY') : moment(),
            title: props.title ? props.title : '',
            person: 0,
            isCancelled: false,
            isSubmitted: false
        }

        this.handleCancellation = this.handleCancellation.bind(this);
    }

    componentDidMount() {
        fetch(EVENTS_API + `/${this.state.id}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        this.setState({
                            date: moment(data.date, 'MM-DD-YYYY'),
                            title: data.title,
                            person: data.person
                        })
                    })
                }
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(EVENTS_API + `/${this.props.match.params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(() => {
            this.setState({isSubmitted: true});
        })
    }

    handleCancellation() {
        this.setState({
            isSubmitted: true,
            isCancelled: true
        });
    }

    render() {
        if (this.state.isSubmitted) {
            return (
                <Redirect to={{
                    pathname: `/events/persons-plan/${this.state.person}`,
                    state: {
                        redirected: true,
                        deletionStatus: !this.state.isCancelled, // if true, then display info that it was deleted, if false, display that nothing has been done (instead of Edited info)
                        id: this.state.id,
                        person: this.state.person
                    }
                }}/>
            );
        }

        return (
            <div className="col-sm">
                <div className="alert alert-warning" role="alert">
                    <p>Czy jesteś pewien, że chcesz usunąć wydarzenie <strong>{this.state.title}</strong> o ID <strong>{this.state.id}</strong>?</p>
                    <p>Wydarzenie to pochodzi z dnia {this.state.date.format('DD.MM.YYYY')}.</p>
                </div>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <button id="submit" type="submit" className="btn btn-danger">Tak, usuń!</button>
                    <button onClick={this.handleCancellation} className="btn btn-primary">Nie, nie usuwaj</button>
                </form>
            </div>
        )
    }
}

const EVENTS_API = 'http://localhost:4000/events';
