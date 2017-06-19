import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../actions/todo';

const FilterButtons = ({onFilterUpdate}) => {
    return (
        <div>
            Update filter: 
            {
            ["SHOW_ALL", "SHOW_COMPLETED", "SHOW_PENDING"].map(filter => {
                return [
                    <button onClick={onFilterUpdate.bind(null, filter)}>{filter}</button>,
                    " ",
                ];
            })
            }
        </div>
    );
}

FilterButtons.propTypes = {
    onFilterUpdate: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onFilterUpdate: filter => { dispatch(setFilter(filter)) },
});

export default connect(null, mapDispatchToProps)(FilterButtons)