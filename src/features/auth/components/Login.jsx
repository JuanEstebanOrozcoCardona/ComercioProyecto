import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/useAuthForms';

const Login = () => {
    const { formData, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Iniciar Sesión</h2>
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="clave" value={formData.clave} onChange={handleChange} required />
                    </div>
                    <button type="submit">Ingresar</button>
                    <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;