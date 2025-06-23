import React, { useState, useRef, useEffect } from 'react';
import './Login.css';

export default function Login({ onLogin, onEsqueceuSenha }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const loginInputRef = useRef(null);

  useEffect(() => {
    if (loginInputRef.current) {
      loginInputRef.current.focus();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await onLogin(login, senha);
      if (!result) {
        setLogin('');
        setSenha('');
        setTimeout(() => {
          if (loginInputRef.current) loginInputRef.current.focus();
        }, 0);
      }
    } finally {
      setLoading(false);
    }
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
            ref={loginInputRef}
            autoComplete="username"
            disabled={loading}
            placeholder="Usuário"
            autoFocus
          />

          <label className="login-label" htmlFor="senha">SENHA</label>
          <input
            className="login-input"
            id="senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            autoComplete="current-password"
            placeholder="Senha"
          />

          <div
            className="login-forgot"
            style={{ cursor: 'pointer', color: '#0074d9', marginTop: 8 }}
            onClick={onEsqueceuSenha}
          >
            ESQUECEU A SENHA?
          </div>
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}