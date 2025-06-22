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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e6f2fb'
    }}>
      <div style={{
        background: '#b3d7f7',
        padding: 32,
        borderRadius: 24,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        minWidth: 380,
        maxWidth: 420,
        width: '100%'
      }}>
        <h2 style={{
          fontFamily: 'Oswald',
          fontSize: 28,
          textAlign: 'center',
          marginBottom: 24,
          letterSpacing: 1
        }}>
          Recuperar Senha
        </h2>
        {etapa === 1 && (
          <form onSubmit={handleValidarToken} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ fontWeight: 'bold', fontSize: 16 }}>
              Login:
              <input
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #8bbbe8',
                  marginTop: 4,
                  fontSize: 16
                }}
                value={login}
                onChange={e => setLogin(e.target.value)}
                required
                autoFocus
              />
            </label>
            <label style={{ fontWeight: 'bold', fontSize: 16 }}>
              Token de acesso:
              <input
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #8bbbe8',
                  marginTop: 4,
                  fontSize: 16
                }}
                value={token}
                onChange={e => setToken(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8,
                padding: '12px 0',
                background: '#0074d9',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontFamily: 'Oswald',
                fontSize: 18,
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {loading ? 'Validando...' : 'Validar Token'}
            </button>
          </form>
        )}
        {etapa === 2 && (
          <form onSubmit={handleRedefinirSenha} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ fontWeight: 'bold', fontSize: 16 }}>
              Nova Senha:
              <input
                type="password"
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #8bbbe8',
                  marginTop: 4,
                  fontSize: 16
                }}
                value={novaSenha}
                onChange={e => setNovaSenha(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8,
                padding: '12px 0',
                background: '#0074d9',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontFamily: 'Oswald',
                fontSize: 18,
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>
          </form>
        )}
        <button
          onClick={onVoltar}
          style={{
            marginTop: 24,
            width: '100%',
            padding: '10px 0',
            background: '#e0e7ef',
            color: '#222',
            border: '1px solid #8bbbe8',
            borderRadius: 8,
            fontFamily: 'Oswald',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer'
          }}
          disabled={loading}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}