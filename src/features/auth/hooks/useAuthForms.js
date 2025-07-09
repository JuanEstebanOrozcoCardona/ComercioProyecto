import { useState } from 'react';
import Swal from 'sweetalert2';

const registrationValidations = {
    cedula: value => {
        if (!value.trim()) return 'La cédula es obligatoria.';
        return null;
    },
    nombre: value => {
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'El nombre solo debe contener letras y espacios.';
        return null;
    },
    apellido: value => {
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'El apellido solo debe contener letras y espacios.';
        return null;
    },
    correo: value => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'El formato del correo no es válido.';
        return null;
    },
    clave: value => {
        if (value.length < 7) return 'La contraseña debe tener al menos 7 caracteres.';
        if (!/[A-Z]/.test(value)) return 'La contraseña debe contener al menos una mayúscula.';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'La contraseña debe contener al menos un signo especial.';
        if (!/[0-9]/.test(value)) return 'La contraseña debe contener al menos un número.';
        return null;
    },
    role: value => {
        if (!value) return 'Debes seleccionar un rol.';
        return null;
    }
};

export const useRegistrationForm = () => {
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        correo: '',
        clave: '',
        role: 'customer'
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        for (const key in formData) {
            const error = registrationValidations[key]?.(formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const error = registrationValidations[name]?.(value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = existingUsers.some(
                user => user.correo === formData.correo || user.cedula === formData.cedula
            );

            if (userExists) {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario ya existe',
                    text: 'La cédula o el correo electrónico ya están registrados.',
                });
            } else {
                const newUsers = [...existingUsers, formData];
                localStorage.setItem('users', JSON.stringify(newUsers));
                localStorage.setItem('currentUser', JSON.stringify(formData));
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro Exitoso!',
                    text: 'Tu cuenta ha sido creada correctamente.',
                    timer: 2500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = '/';
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error en el formulario',
                text: 'Por favor, revisa los campos e inténtalo de nuevo.',
            });
        }
    };

    return { formData, errors, handleChange, handleSubmit };
};

export const useLoginForm = () => {
    const [formData, setFormData] = useState({
        correo: '',
        clave: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.correo === formData.correo && u.clave === formData.clave);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            Swal.fire({
                icon: 'success',
                title: `¡Bienvenido, ${user.nombre}!`,
                text: 'Has iniciado sesión correctamente.',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                if (user.role === 'admin') {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: 'Correo o contraseña incorrectos.',
            });
        }
    };

    return { formData, handleChange, handleSubmit };
};