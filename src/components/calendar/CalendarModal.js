import React, { useEffect, useState } from 'react'

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/ui.slice';
import { eventClearActive, startEventAddNew, startEventUpdate } from '../../redux/calendar.slice';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const nowDateStart = moment().minutes(0).seconds(0).add(1, 'hours')
const nowDateEnd = nowDateStart.clone().add(1, 'hours')

const initialEvent = {
    title: '',
    notes: '',
    start: nowDateStart.toDate(),
    end: nowDateEnd.toDate(),
    user: {
        id: '1234',
        name: 'juanceto'
    }
}

export const CalendarModal = () => {

    const dispatch = useDispatch()

    const { modalOpen } = useSelector(state => state.ui);
    const { active } = useSelector(state => state.calendar);

    const [dateStart, setDateStart] = useState(nowDateStart.toDate())
    const [dateEnd, setDateEnd] = useState(nowDateEnd.toDate())
    const [titleValid, setTitleValid] = useState(true)

    const [values, handleInputChanGet, setValues] = useForm(initialEvent);

    const { title, notes, start, end } = values;

    useEffect(() => {

        (active)  
            ? setValues(active) 
            : setValues(initialEvent)

    }, [setValues, active])

    const handleCloseModal = () => {
        dispatch(closeModal())
        dispatch(eventClearActive())
        setValues(initialEvent)
    }

    const handleStartDateChange = (event) => {
        setDateStart(event);
        setValues({
            ...values,
            start: event,
        })
    }

    const handleEndDateChange = (event) => {
        setDateEnd(event)
        setValues({
            ...values,
            end: event,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de finalización debe ser mayor que la fecha de inicio',
            })
            return;
        }

        if (title.trim().length < 2) {
            setTitleValid(false)
            return;
        }
        if (active) {
            dispatch(startEventUpdate(values))
        } else {
            dispatch(startEventAddNew(values))
        }
        setTitleValid(true)
        handleCloseModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className={'modal'}
            closeTimeoutMS={200}
            overlayClassName={'modal-fondo'}
        >
            <h1> {(active) ?'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                onSubmit={handleSubmit}
                className="container"
            >

                <div className="form-group mb-2">
                    <label>Fecha y hora de inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className={'form-control'}
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora de finalización</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className={'form-control'}
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && "is-invalid"}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChanGet}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChanGet}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">notesrmación adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
