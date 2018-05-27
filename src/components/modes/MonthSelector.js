import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MonthSelector extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            month: 0,
            months: [
                {id: 0, title: 'Styczeń'},
                {id: 1, title: 'Luty'},
                {id: 2, title: 'Marzec'},
                {id: 3, title: 'Kwiecień'},
                {id: 4, title: 'Maj'},
                {id: 5, title: 'Czerwiec'},
                {id: 6, title: 'Lipiec'},
                {id: 7, title: 'Sierpień'},
                {id: 8, title: 'Wrzesień'},
                {id: 9, title: 'Październik'},
                {id: 10, title: 'Listopad'},
                {id: 11, title: 'Grudzień'}
            ]
        }
    }

    handleMonthSwitch(event) {
        this.setState({month: event.target.value});
        this.props.onUpdateHandler(event.target.value);
    }

    render() {

        const monthOptions = this.state.months.map(obj => {
            return <option value={obj.id} key={obj.id}>{obj.title}</option>
        });

        return (
            <select className="form-control col-sm-3" name="month" value={this.state.month} onChange={this.handleMonthSwitch.bind(this)}>
                {monthOptions}
            </select>
        );
    }
}

MonthSelector.propTypes = {
    onUpdateHandler: PropTypes.func.isRequired
}
