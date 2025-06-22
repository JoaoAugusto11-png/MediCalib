import React, { useState } from 'react';

export default function RecuperarSenha({ onLoginDireto, onVoltar }) {
  const [login, setLogin] = useState('');
  const [token, setToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleValidarToken(e) {
    e.preventDefault();
    setLoading(true);
    const valido = await window.api.validarToken({ login, token });
    setLoading(false);
    if (valido) {
      setEtapa(2);
    } else {
      alert('Token inválido para este login!');
    }
  }

  async function handleRedefinirSenha(e) {
    e.preventDefault();
    setLoading(true);
    const resposta = await window.api.redefinirSenha({ login, token, novaSenha });
    setLoading(false);
    if (resposta && resposta.success) {
      if (onLoginDireto) {
        onLoginDireto(login, novaSenha);
      }
    } else {
      alert('Erro ao redefinir senha!');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Recuperar Senha</h2>
      {etapa === 1 && (
        <form onSubmit={handleValidarToken}>
          <label>Login:</label>
          <input value={login} onChange={e => setLogin(e.target.value)} required />
          <label>Token de acesso:</label>
          <input value={token} onChange={e => setToken(e.target.value)} required />
          <button type="submit" disabled={loading}>
            {loading ? 'Validando...' : 'Validar Token'}
          </button>
        </form>
      )}
      {etapa === 2 && (
        <form onSubmit={handleRedefinirSenha}>
          <label>Nova Senha:</label>
          <input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required />
          <button type="submit" disabled={loading}>
            {loading ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </form>
      )}
      <button onClick={onVoltar} style={{ marginTop: 16 }} disabled={loading}>Voltar</button>
    </div>
  );
}