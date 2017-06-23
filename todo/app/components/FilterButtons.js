import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../actions/todo';
import { NavLink } from 'react-router-dom';

const FilterLink = ({filter, children}) => (
    <NavLink
        exact
        to={`/${filter === "all" ? "" : filter}`}
        activeStyle={{
            textDecoration: 'none',
            color: 'black',
        }}
    >
        {children}
    </NavLink>
);

const FilterButtons = ({onFilterUpdate}) => {
    return (
        <div>
            Update filter: 
            {
            ["all", "pending", "completed"].map(filter => {
                return [
                    <FilterLink filter={filter}>{filter}</FilterLink>,
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
    onFilterUpdate(filter) { dispatch(setFilter(filter)) },
});

export default connect(null, mapDispatchToProps, null, {pure:false})(FilterButtons)