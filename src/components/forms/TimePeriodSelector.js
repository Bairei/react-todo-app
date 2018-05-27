import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TimePeriodSelector extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            period: props.period ? props.period : 0,
            periods: [
                {id: 1, startHour: 8, endHour: 10},
                {id: 2, startHour: 10, endHour: 12},
                {id: 3, startHour: 12, endHour: 14},
                {id: 4, startHour: 14, endHour: 16},
                {id: 5, startHour: 16, endHour: 18},
                {id: 6, startHour: 18, endHour: 20},
                {id: 7, startHour: 20, endHour: 22},
                {id: 8, startHour: 22, endHour: 24}
            ]
        }
    }

    handlePeriodSwitch(event) {
        this.setState({period: event.target.value});
        this.props.onUpdateHandler(event);
    }

    render() {

        const periodOptions = this.state.periods.map(obj => {
            return <option value={obj.id} key={obj.id}>{obj.startHour} - {obj.endHour}</option>
        });

        return (
            <select className="form-control col-sm-3" name="period" onChange={this.handlePeriodSwitch.bind(this)} value={this.props.selectorValue}>
                <option value="-1" defaultValue disabled>---</option>
                {periodOptions}
            </select>
        );
    }
}

TimePeriodSelector.propTypes = {
    onUpdateHandler: PropTypes.func.isRequired
}
