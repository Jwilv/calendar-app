import React from 'react'

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'


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



const startDate = moment().minutes(0).seconds(0).add(1,'hours')

export const CalendarModal = () => {

    const closeModal = () => {

    }

    const handleStartDateChange = (event)=>{
    console.log(event);
    }

    return (
        <Modal
            isOpen={true}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className={'modal'}
            closeTimeoutMS={200}
            overlayClassName={'modal-fondo'}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                    onChange={handleStartDateChange} 
                    value={startDate.toDate()} 
                    className={'form-control'}
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <input className="form-control" placeholder="Fecha inicio" />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
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
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
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
