import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="login-title">MEDICALIB</h1>
        <form>
          <label className="login-label" htmlFor="login">LOGIN</label>
          <input className="login-input" id="login" type="text" />

          <label className="login-label" htmlFor="senha">SENHA</label>
          <input className="login-input" id="senha" type="password" />

          <div className="login-forgot">ESQUECEU A SENHA?</div>
        </form>
        <div className="login-footer">
          AINDA NÃO TEM LOGIN? <span className="login-register">CADASTRE-SE</span>
        </div>
      </div>
    </div>
  );
}