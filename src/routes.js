import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PersonsPlanList } from './components/plans/PersonsPlanList';
import { MonthlyPlanList } from './components/plans/MonthlyPlanList';
import { DailyPlanList } from './components/plans/DailyPlanList';
import { EventForm } from './components/forms/EventForm';

const Routes = () => {
    return (
        // define routes here
        <div className="jumbotron">
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/event/create" component={EventForm}/>
            <Route exact path="/event/edit/:id" component={EventForm}/>
            <Route exact path="/event/createWithPerson/:personId" component={EventForm}/>
            <Route exact path="/event/createWithDate/:date" component={EventForm}/>
            <Route exact path="/events/persons-plan/:id" component={PersonsPlanList}/>
            <Route exact path="/events/monthly-plan/:month" component={MonthlyPlanList}/>
            <Route exact path="/events/day-plan/:date" component={DailyPlanList}/>
        </div>
    );
}

export default Routes;