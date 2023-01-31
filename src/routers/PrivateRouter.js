
import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PrivateRouter = ({ children, logged }) => {

    return (logged)
        ? children
        : <Navigate to={'/login'} />
}

PrivateRouter.propTypes = {
    children: PropTypes.element.isRequired,
}