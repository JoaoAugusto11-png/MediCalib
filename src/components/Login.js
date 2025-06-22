import React, { useState, useEffect, useRef } from 'react';
import './Login.css';

export default function Login({ onLogin, onEsqueceuSenha }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const loginInputRef = useRef(null);

  useEffect(() => {
    setLogin('');
    setSenha('');
    // Garante o foco após a montagem do componente
    requestAnimationFrame(() => {
      if (loginInputRef.current) {
        loginInputRef.current.value = '';
        loginInputRef.current.focus();
      }
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(login, senha);
  }

  return (
    <div className="login-bg" onClick={() => {
      if (loginInputRef.current) loginInputRef.current.focus();
    }}>
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
            ref={loginInputRef}
            autoComplete="username"
          />

          <label className="login-label" htmlFor="senha">SENHA</label>
          <input
            className="login-input"
            id="senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            autoComplete="current-password"
          />

          <div
            className="login-forgot"
            style={{ cursor: 'pointer', color: '#0074d9', marginTop: 8 }}
            onClick={onEsqueceuSenha}
          >
            ESQUECEU A SENHA?
          </div>
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
      </div>
    </div>
  );
}