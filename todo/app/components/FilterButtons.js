import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

export default connect(null, null, null, {pure:false})(FilterButtons)