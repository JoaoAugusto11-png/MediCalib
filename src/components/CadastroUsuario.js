import React, { useState } from 'react';

export default function CadastroUsuario({ onCadastroSucesso }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const resposta = await window.api.cadastrarUsuario({
      nome,
      login: email,
      senha,
      tipo: 'usuario',
      empresa
    });
    if (resposta.success) {
      setMensagem('Usuário cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setEmpresa('');
      if (onCadastroSucesso) onCadastroSucesso();
    } else {
      setMensagem(resposta.error || 'Erro ao cadastrar usuário.');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#f7fbff', padding: 32, borderRadius: 8 }}>
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
        {mensagem && <div style={{ marginTop: 12, color: resposta?.success ? 'green' : 'red' }}>{mensagem}</div>}
      </form>
      <div style={{ background: '#94c8f7', width: 320, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>
          <h1 style={{ fontFamily: 'Oswald', fontSize: 32, marginBottom: 32 }}>MEDICALIB</h1>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{username?.toUpperCase()}</div>
            <div style={{ fontSize: 14 }}>{userType === 'admin' ? 'ADMINISTRADOR' : 'ESTAGIÁRIO'} (EMPRESA X)</div>
          </div>
          <button style={menuBtn} onClick={() => setTab('register')}>REGISTRAR EQUIPAMENTO</button>
          <button style={menuBtn} onClick={() => setTab('list')}>LISTA DE EQUIPAMENTOS</button>
          <button style={menuBtn} onClick={() => setTab('manutencao')}>AGENDAR MANUTENÇÃO</button>
          <button style={menuBtn} onClick={() => setTab('calibracao')}>REGISTRAR CALIBRAÇÃO</button>
          {/* Adicione aqui o botão de cadastro de usuário, só para admin */}
          {userType === 'admin' && (
            <button style={menuBtn} onClick={() => setTab('cadastroUsuario')}>
              CADASTRAR NOVO USUÁRIO
            </button>
          )}
        </div>
        <button style={{ ...submitBtn, background: '#f7c8c8', color: '#222' }} onClick={() => window.api.sair()}>
          ← SAIR
        </button>
      </div>
    </div>
  );
}