import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PublicRouter = ({ children, logged }) => {

    return (logged)
        ? <Navigate to={'/'} />
        : children
}

PublicRouter.propTypes = {
    children: PropTypes.element.isRequired,
}