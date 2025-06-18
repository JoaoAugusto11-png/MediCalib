import React, { useState } from 'react';

export default function CadastroUsuario({ onCadastroSucesso, onBack }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // Supondo que você tem o usuário logado em userId
    await window.api.cadastrarUsuario({
      nome,
      login: nome, // aqui salva o nome como login
      senha,
      tipo: 'usuario',
      empresa,
      email // se quiser manter o e-mail separado (adicione o campo na tabela se for usar)
    });
    setMensagem('Usuário cadastrado com sucesso!');
    setNome('');
    setEmail('');
    setSenha('');
    setEmpresa('');
    if (onCadastroSucesso) onCadastroSucesso();
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#f7fbff', padding: 32, borderRadius: 8 }}>
      {onBack && (
        <button type="button" onClick={onBack} style={{
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
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, marginTop: 4 }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, marginTop: 4 }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, marginTop: 4 }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Empresa:
          <input
            type="text"
            value={empresa}
            onChange={e => setEmpresa(e.target.value)}
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
    </div>
  );
}