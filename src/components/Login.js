import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [login, setLogin] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(login);
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="login-title">MEDICALIB</h1>
        <form onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="login">LOGIN</label>
          <input
            className="login-input"
            id="login"
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />

          <label className="login-label" htmlFor="senha">SENHA</label>
          <input className="login-input" id="senha" type="password" />

          <div className="login-forgot">ESQUECEU A SENHA?</div>
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
        <div className="login-footer">
          AINDA NÃO TEM LOGIN? <span className="login-register">CADASTRE-SE</span>
        </div>
      </div>
    </div>
  );
}