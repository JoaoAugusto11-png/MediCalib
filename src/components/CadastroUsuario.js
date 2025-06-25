import React, { useState } from 'react';

export default function CadastroUsuario({ onCadastroSucesso, onBack }) {
  const [form, setForm] = useState({
    nome: '',
    login: '',
    senha: '',
    empresa: ''
  });
  const [token, setToken] = useState('');
  const [mensagem, setMensagem] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
   
    const resposta = await window.api.cadastrarUsuario({ ...form, tipo: 'usuario' });
    if (resposta.success) {
      setToken(resposta.token);
      setMensagem('Usuário cadastrado com sucesso!');
      setForm({
        nome: '',
        login: '',
        senha: '',
        empresa: ''
      });
    } else {
      alert(resposta.error || "Erro ao cadastrar usuário!");
    }
  }

  function handleVoltar() {
    setToken('');
    setMensagem('');
    if (onCadastroSucesso) onCadastroSucesso();
    if (onBack) onBack();
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#f7fbff', padding: 32, borderRadius: 8 }}>
      {onBack && (
        <button type="button" onClick={handleVoltar} style={{
          marginBottom: 16,
          background: '#b3d7f7',
          border: '1px solid #222',
          borderRadius: 4,
          fontFamily: 'Oswald',
          fontWeight: 'bold',
          fontSize: 16,
          padding: '8px 0',
          cursor: 'pointer'
        }}>
          ⟵ Voltar
        </button>
      )}
      <h2 style={{ fontFamily: 'Oswald', fontSize: 28, marginBottom: 24 }}>Cadastro de Técnico</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontWeight: 'bold' }}>
          Nome do Técnico:
          <input
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, marginTop: 4 }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          E-mail:
          <input
            name="login"
            type="email"
            value={form.login}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, marginTop: 4 }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Senha:
          <input
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, marginTop: 4 }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Empresa:
          <input
            name="empresa"
            type="text"
            value={form.empresa}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, marginTop: 4 }}
          />
        </label>
        <button type="submit" style={{
          marginTop: 16,
          padding: '12px 0',
          background: '#94c8f7',
          border: '1px solid #222',
          fontFamily: 'Oswald',
          fontSize: 18,
          fontWeight: 'bold',
          borderRadius: 4,
          cursor: 'pointer'
        }}>
          Cadastrar
        </button>
        {mensagem && <div style={{ marginTop: 12, color: mensagem.includes('sucesso') ? 'green' : 'red' }}>{mensagem}</div>}
      </form>
      {token && (
        <div style={{ marginTop: 16, padding: 12, background: '#e0f7fa', border: '1px solid #0074d9' }}>
          <strong>Token de acesso do usuário:</strong>
          <div style={{ fontSize: 20, marginTop: 8 }}>{token}</div>
          <div style={{ marginTop: 8, color: '#0074d9' }}>Anote este token e entregue ao usuário!</div>
        </div>
      )}
    </div>
  );
}