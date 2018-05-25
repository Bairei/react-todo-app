import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export class PersonMode extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            isRedirected: false,
            persons: [],
        }
    }

    componentDidMount() {
        fetch(API).then(response => {
            response.json().then(data => this.setState({persons: data}));
        });
    }
    
    handlePersonSwitched(event) {
        this.setState({
            id: event.target.value
        });
    }

    clearChoice() {
        this.props.onModeSwitched('');
    }

    goToPersonMode() {
        this.setState({ isRedirected: true });
    }

    render() {

        let personOptions = this.state.persons.map((item) => {
            return <option value={item.id} key={item.id}> #{item.id}: {item.firstName} {item.lastName} </option>;
        });

        if(this.state.isRedirected) {
            // TODO: redirect to correct page
            let redirectedPerson = this.state.persons.find(item => {
                return item.id === parseInt(this.state.id, 10); 
            });
            return(
                <Redirect to={{
                    pathname:"/events/persons-plan/" + redirectedPerson.id,
                    state: {
                        person: redirectedPerson
                    }
                }}/>
            );
        }

        return (
            <div>
                <p className="lead">
                    Proszę wybierz osobę, której wydarzenia chcesz obejrzeć:
                </p>
                <div className="lead">
                    <select name="person" className="form-control" id="personSelect" onChange={this.handlePersonSwitched.bind(this)}>
                        {personOptions}
                    </select>
                    <br/>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => this.goToPersonMode()}>Przejdź dalej</button>
                        <button className="btn btn-warning" onClick={() => this.clearChoice()}>Cofnij wybór</button>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

PersonMode.propTypes = {
    id: PropTypes.number,
    persons: PropTypes.array
}

const API = 'http://localhost:4000/students';