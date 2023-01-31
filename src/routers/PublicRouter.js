import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

export const PublicRouter = ({ children }) => {
    const {uid} = useSelector(state => state.auth);
    return (!uid)
        ?  children
        : <Navigate to={'/'} />
}

PublicRouter.propTypes = {
    children: PropTypes.element.isRequired,
}