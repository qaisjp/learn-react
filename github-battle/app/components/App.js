import React from 'react';
import PropTypes from 'prop-types';

import Popular from './Popular';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                {this.props.message}
                <Popular />
            </div>
        )
    }
}

App.propTypes = {
    'message': PropTypes.string.isRequired,
}
