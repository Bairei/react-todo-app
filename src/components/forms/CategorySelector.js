import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CategorySelector extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            category: props.category ? props.category: 0,
            categories: [
                {id: 1, title: 'Zakupy'},
                {id: 2, title: 'Nauka'},
                {id: 3, title: 'Odpoczynek'}
            ]
        }
    }

    handleCategorySwitch(event) {
        this.setState({category: event.target.value});
        this.props.onUpdateHandler(event);
    }

    render() {

        const categoryOptions = this.state.categories.map(obj => {
            return <option value={obj.id} key={obj.id}>{obj.title}</option>
        });

        return (
            <select className="form-control col-sm-2" name="category" onChange={this.handleCategorySwitch.bind(this)} value={this.props.selectorValue}>
                <option value="-1" disabled="true" defaultValue>---</option>
                {categoryOptions}
            </select>
        );
    }
}

CategorySelector.propTypes = {
    onUpdateHandler: PropTypes.func.isRequired
}
