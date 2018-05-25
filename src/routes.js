import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from './shared/HomePage';

const Routes = () => {
    return (
        // define routes here
        <div className="jumbotron">
            <Route exact path="/" component={HomePage}/>
        </div>
    );
}

export default Routes;