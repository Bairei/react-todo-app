import React from 'react';
import PropTypes from 'prop-types';


export const CategoryBar = (props) => {
    let categoryStr = '';
    let categoryColor = '';
    switch(props.category) {
        case 1:
            categoryStr = 'Zakupy';
            categoryColor = 'bg-danger';
            break;
        case 2:
            categoryStr = 'Nauka';
            categoryColor = 'bg-success';
            break;
        case 3:
            categoryStr = 'Odpoczynek';
            categoryColor = 'bg-warning';
            break;
        default:
            categoryStr = '<unknown>';
            categoryColor = 'bg-default';
            break;
    }

    return (
        <h5 className={`card-header ${categoryColor}`}>{categoryStr}</h5>
    );
}

CategoryBar.propTypes = {
    category: PropTypes.number.isRequired
}