import React, { useState } from 'react';

export default function RegisterEquipment({ username, userId, onBack, onRegister }) {
  const [form, setForm] = useState({
    nome: '',
    fabricante: '',
    modelo: '',
    numeroSerie: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { nome, fabricante, modelo, numeroSerie: numero_serie } = form;
      if (!userId) {
        alert('Erro: usuário não identificado!');
        return;
      }
      await window.api.cadastrarEquipamento({
        nome,
        fabricante,
        modelo,
        numero_serie,
        usuario_id: userId
      });
      onRegister();
    } catch (err) {
      alert('Erro ao cadastrar equipamento: ' + err.message);
    }
  }

  function handleLogin(usuario) {
    setUserId(usuario.id);
    // ...
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{
        background: '#94c8f7',
        width: 320,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ fontFamily: 'Oswald', fontSize: 32, marginBottom: 32 }}>MEDICALIB</h1>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{username ? username.toUpperCase() : ''}</div>
            <div style={{ fontSize: 14 }}>ESTAGIÁRIO (EMPRESA X)</div>
          </div>
          <button style={menuBtn} onClick={onBack}>LISTA DE EQUIPAMENTOS</button>
        </div>
        <button style={exitBtn}>⟵ SAIR</button>
      </div>
      <div style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontFamily: 'Oswald', fontSize: 36, textAlign: 'center' }}>REGISTRAR EQUIPAMENTO</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label>
            Nome:
            <input name="nome" value={form.nome} onChange={handleChange} required style={inputStyle} />
          </label>
          <label>
            Fabricante:
            <input name="fabricante" value={form.fabricante} onChange={handleChange} required style={inputStyle} />
          </label>
          <label>
            Modelo:
            <input name="modelo" value={form.modelo} onChange={handleChange} required style={inputStyle} />
          </label>
          <label>
            Número de Série:
            <input name="numeroSerie" value={form.numeroSerie} onChange={handleChange} required style={inputStyle} />
          </label>
          <button type="submit" style={submitBtn}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

const menuBtn = {
  width: '100%',
  padding: '16px 0',
  marginBottom: 8,
  background: '#b3d7f7',
  border: '1px solid #222',
  fontFamily: 'Oswald',
  fontSize: 18,
  fontWeight: 'bold',
  cursor: 'pointer'
};

const exitBtn = {
  width: '100%',
  padding: '16px 0',
  background: '#f7c8c8',
  border: '1px solid #222',
  fontFamily: 'Oswald',
  fontSize: 18,
  fontWeight: 'bold',
  cursor: 'pointer'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: 18,
  marginTop: 4,
  marginBottom: 12,
  borderRadius: 4,
  border: '1px solid #aaa',
  boxSizing: 'border-box'
};

const submitBtn = {
  padding: '12px',
  fontSize: 20,
  fontFamily: 'Oswald',
  fontWeight: 'bold',
  background: '#94c8f7',
  border: '1px solid #222',
  borderRadius: 4,
  cursor: 'pointer'
};