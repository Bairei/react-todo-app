import React, { Component } from 'react';

export class DefaultMode extends Component {

    handleSwitchMode(value) {
        this.props.onModeSwitched(value);
    }

    render() {
        return (
            <div>
                <p className="lead">
                    Proszę wybrać, jakie wydarzenia chciałbyś zobaczyć. Możesz również użyć przycisku do stworzenia nowego wydarzenia.
                </p>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-primary" onClick={() => { this.handleSwitchMode('day') }}>Plan według dnia</button>
                    <button type="button" className="btn btn-info" onClick={() => { this.handleSwitchMode('month')}}>Plan według miesiąca</button>
                    <button type="button" className="btn btn-warning" onClick={() => { this.handleSwitchMode('person') }}>Plan dla wybranej osoby</button>
                </div>
                <br/> <br/>
            </div>
        );
    }
}