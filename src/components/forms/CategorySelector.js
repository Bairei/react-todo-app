import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CategorySelector extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            // period: props.period ? props.period : 0,
            // periods: [
            //     {id: 1, startHour: 8, endHour: 10},
            //     {id: 2, startHour: 10, endHour: 12},
            //     {id: 3, startHour: 12, endHour: 14},
            //     {id: 4, startHour: 14, endHour: 16},
            //     {id: 5, startHour: 16, endHour: 18},
            //     {id: 6, startHour: 18, endHour: 20},
            //     {id: 7, startHour: 20, endHour: 22},
            //     {id: 8, startHour: 22, endHour: 24}
            // ]
            category: props.category ? props.category: 0,
            categories: [
                {id: 1, title: 'Zakupy'},
                {id: 2, title: 'Nauka'},
                {id: 3, title: 'Odpoczynek'}
            ]
        }
    }

    handleCategorySwitch(event) {
        // console.log(event.target.value);
        this.setState({category: event.target.value});
        this.props.onUpdateHandler(event);
    }

    render() {

        const categoryOptions = this.state.categories.map(obj => {
            return <option value={obj.id} key={obj.id}>{obj.title}</option>
        });

        return (
            <select className="form-control col-sm-2" name="category" onChange={this.handleCategorySwitch.bind(this)}>
                <option value="-1" disabled="true" defaultValue>---</option>
                {categoryOptions}
            </select>
        );
    }
}

CategorySelector.propTypes = {
    onUpdateHandler: PropTypes.func.isRequired
}
