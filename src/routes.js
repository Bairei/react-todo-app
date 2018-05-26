import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PersonsPlanList } from './components/plans/PersonsPlanList';
import { MonthlyPlanList } from './components/plans/MonthlyPlanList';

const Routes = () => {
    return (
        // define routes here
        <div className="jumbotron">
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/events/persons-plan/:id" component={PersonsPlanList}/>
            <Route exact path="/events/monthly-plan/:month" component={MonthlyPlanList}/>
        </div>
    );
}

export default Routes;