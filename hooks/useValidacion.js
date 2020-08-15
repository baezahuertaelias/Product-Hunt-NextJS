import React, { useState, useEffect } from 'react';

const useValidacion = (stateInicial, validar, fn) => {
    
    const [valores, guardarValores] = useState(stateInicial);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarSubmitForm] = useState(false);

    useEffect(()=> {
        if(submitForm){
            const noErrores = Object.keys(errores).length === 0;
            
            if(noErrores) {
                fn(); // fn => funcion que se ejecuta en el componente
            }

            guardarSubmitForm(false);
        }
    }, [errores]);

    /* Funcion que se ejecuta cada vez que el usuario escribe */
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        });
    };

    /* Funcion que se ejecuta cuando el usuario presiona submit */
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    };

    /* cuando se realiza el evento de desenfocar */
    const handleBlur = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    };

    return {
        valores,
        errores,
        submitForm,
        handleSubmit,
        handleChange,
        handleBlur
    };
}

export default useValidacion;