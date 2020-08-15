import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import firebase from '../firebase';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

/* Validaciones */
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
  email: '',
  password: ''
};

const Login = () => {

  const [error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      const usuario = await firebase.login(email, password);
      
      Router.push('/');
    } catch (error) {
      console.error('HUBO UN ERROR AL INICIAR SESION', error);
      guardarError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <h1 css={css`text-align: center; margin-top: 5rem;`}>Iniciar sesion</h1>
        <Formulario onSubmit={handleSubmit}>

          <Campo>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Tu email" name="email" value={email} onChange={handleChange} onBlur={handleBlur} />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}

          <Campo>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Tu password" name="password" value={password} onChange={handleChange} onBlur={handleBlur} />
          </Campo>

          {errores.password && <Error>{errores.password}</Error>}

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Iniciar sesion" />

        </Formulario>
      </Layout>
    </div>
  )
};

export default Login;