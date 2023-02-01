import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../redux/auth.slice';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChanGet] = useForm({
    loginEmail:'',
    loginPassword:''
    })

    const {loginEmail,loginPassword} = formLoginValues

        const [formRegisterValues, handleRegisterInputChanGet] = useForm({
        registerEmail:'',
        registerPassword:'',
        registerPasswordConfirm:'',
        registerName:'',
        })

    const {registerEmail,
        registerPassword,
        registerPasswordConfirm,
        registerName } = formRegisterValues

    const handleLogin = (event)=> {
    event.preventDefault();
    //console.log(formLoginValues);
    dispatch(startLogin(loginEmail,loginPassword))
    }

    const handleRegister = (event)=>{
    event.preventDefault();
    if(registerPassword !== registerPasswordConfirm){
        return Swal.fire('Error','las contraseñas deben ser iguales','error')
    }
    dispatch(startRegister(registerEmail,registerPassword,registerName))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={handleLoginInputChanGet}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                autoComplete='off'
                                name='loginPassword'
                                value={loginPassword}
                                onChange={handleLoginInputChanGet}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                autoComplete='off'
                                name='registerName'
                                value={registerName}
                                onChange={handleRegisterInputChanGet}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                autoComplete='off'
                                name='registerEmail'
                                value={registerEmail}
                                onChange={handleRegisterInputChanGet}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                autoComplete='off'
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={handleRegisterInputChanGet}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                autoComplete='off'
                                placeholder="Repita la contraseña" 
                                name='registerPasswordConfirm'
                                value={registerPasswordConfirm}
                                onChange={handleRegisterInputChanGet}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}