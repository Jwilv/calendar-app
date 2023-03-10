import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/ui.slice'

export const AddNewFab = () => {

    const dispatch = useDispatch()

    const handleClickNew =()=>{
        dispatch(openModal())
    }
    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
