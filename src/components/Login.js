import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // Chama o backend para autenticar
    const resposta = await window.api.loginUsuario({ login, senha });
    if (resposta.success) {
      onLogin(resposta.usuario); // Passe o objeto inteiro
    } else {
      alert(resposta.error || "Login ou senha inválidos!");
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
          />

          <label className="login-label" htmlFor="senha">SENHA</label>
          <input
            className="login-input"
            id="senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />

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