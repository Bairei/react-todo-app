import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PersonsPlanList } from './components/plans/PersonsPlanList';

const Routes = () => {
    return (
        // define routes here
        <div className="jumbotron">
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/events/persons-plan/:id" component={PersonsPlanList}/>
        </div>
    );
}

export default Routes;