import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export const MonthDisplay = (props) => {
    let month = '';
    switch(props.month) {
        case '0':
            month = "Styczeń";
            break;
        case '1':
            month = "Luty";
            break;
        case '2':
            month = "Marzec";
            break;
        case '3':
            month = "Kwiecień";
            break;
        case '4':
            month = "Maj";
            break;
        case '5':
            month = "Czerwiec";
            break;
        case '6':
            month = "Lipiec";
            break;
        case '7':
            month = "Sierpień";
            break;
        case '8':
            month = "Wrzesień";
            break;
        case '9':
            month = "Październik";
            break;
        case '10':
            month = "Listopad";
            break;
        case '11':
            month = "Grudzień";
            break;    
        default: 
            month = '<unknown>';
            break;
    }

    return(
        <h1>Przeglądasz wydarzenia z miesiąca {month}</h1>
    );

}

MonthDisplay.propTypes = {
    month: PropTypes.string .isRequired
}