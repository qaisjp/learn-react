import React from 'react';
import PropTypes from 'prop-types';
import {ReactRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Popular from './Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className='container'>
                    {this.props.message}
                    <Nav />
                    
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/popular' component={Popular} />
                        <Route component={() => <h1>This page could not be found</h1>} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    'message': PropTypes.string.isRequired,
}
