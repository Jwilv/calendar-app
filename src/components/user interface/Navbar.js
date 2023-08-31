import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../redux/auth.slice';

import { Online, Offline} from 'react-detect-offline'

export const Navbar = () => {

    const dispatch = useDispatch();

    const {name} = useSelector(state => state.auth)

    const handleLogout = ()=>{
        dispatch(startLogout());
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand ms-3'>
                {name}
            </span>

            <Online>
            <span className='text-success'>Online</span>
            </Online>
            <Offline>
            <span className='text-danger'>Offline</span>
            </Offline>

            <button 
            className='btn btn-outline-danger me-3'
            onClick={handleLogout}
            >
                <i className='fas fa-sign-out-alt'></i>
                <span> Salir</span>
            </button>
        </div>
    )
}
