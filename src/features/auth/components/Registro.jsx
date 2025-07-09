import React from 'react';
import { Link } from 'react-router-dom';
import { useRegistrationForm } from '../hooks/useAuthForms';

const Registro = () => {
    const { formData, errors, handleChange, handleSubmit } = useRegistrationForm();

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Crear Cuenta</h2>
                    <div className="form-group">
                        <label>Cédula</label>
                        <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} required />
                        {errors.cedula && <span className="error-message">{errors.cedula}</span>}
                    </div>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                        {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                    </div>
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                        {errors.correo && <span className="error-message">{errors.correo}</span>}
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="clave" value={formData.clave} onChange={handleChange} required />
                        {errors.clave && <span className="error-message">{errors.clave}</span>}
                    </div>
                    <div className="form-group">
                        <label>Rol</label>
                        <select name="role" value={formData.role} onChange={handleChange} required>
                            <option value="customer">Cliente</option>
                            <option value="admin">Administrador</option>
                        </select>
                        {errors.role && <span className="error-message">{errors.role}</span>}
                    </div>
                    <button type="submit">Registrarse</button>
                    <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Registro;