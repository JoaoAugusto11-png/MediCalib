import React, { useState } from 'react';

export default function EquipmentList({
  username,
  equipments,
  onRegisterClick,
  onCalibracaoClick,
  onAgendarManutencaoClick,
  userType,
  onCadastroUsuarioClick,
  empresa,
  onDelete,
  onUpdate,
  onLogout 
}) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    nome: '',
    fabricante: '',
    modelo: '',
    numero_serie: ''
  });

  function startEdit(eq) {
    setEditId(eq.id);
    setEditForm({
      nome: eq.nome,
      fabricante: eq.fabricante,
      modelo: eq.modelo,
      numero_serie: eq.numero_serie
    });
  }

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  async function saveEdit(id) {
    await window.api.editarEquipamento({ id, ...editForm });
    setEditId(null);
    if (onUpdate) onUpdate(); 
  }

  function cancelEdit() {
    setEditId(null);
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
            <div style={{ fontSize: 14 }}>
              {userType === 'admin' ? 'ADMINISTRADOR' : 'TÉCNICO'}
              {empresa && ` - ${empresa.toUpperCase()}`}
            </div>
          </div>
          <button style={menuBtn} onClick={onRegisterClick}>REGISTRAR EQUIPAMENTO</button>
          <button style={menuBtn}>LISTA DE EQUIPAMENTOS</button>
          <button style={menuBtn} onClick={onAgendarManutencaoClick}>AGENDAR MANUTENÇÃO</button>
          <button style={menuBtn} onClick={onCalibracaoClick}>REGISTRAR CALIBRAÇÃO</button>
          {userType === 'admin' && (
            <button style={menuBtn} onClick={onCadastroUsuarioClick}>
              CADASTRAR NOVO USUÁRIO
            </button>
          )}
        </div>
        <button
          style={exitBtn}
          onClick={onLogout}
        >
          ← SAIR
        </button>
      </div>
      <div style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontFamily: 'Oswald', fontSize: 36, textAlign: 'center' }}>LISTA DE EQUIPAMENTOS</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 32 }}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>Fabricante</th>
              <th style={th}>Modelo</th>
              <th style={th}>Nº de Série</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipments.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 16 }}>Nenhum equipamento cadastrado.</td>
              </tr>
            )}
            {equipments.map((eq) => (
              <tr key={eq.id}>
                {editId === eq.id ? (
                  <>
                    <td style={td}><input name="nome" value={editForm.nome} onChange={handleEditChange} /></td>
                    <td style={td}><input name="fabricante" value={editForm.fabricante} onChange={handleEditChange} /></td>
                    <td style={td}><input name="modelo" value={editForm.modelo} onChange={handleEditChange} /></td>
                    <td style={td}><input name="numero_serie" value={editForm.numero_serie} onChange={handleEditChange} /></td>
                    <td style={td}>
                      <button onClick={async () => {
                        await window.api.editarEquipamento({ id: eq.id, ...editForm });
                        setEditId(null);
                        if (onUpdate) await onUpdate(); 
                      }}>Salvar</button>
                      <button onClick={cancelEdit}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={td}>{eq.nome}</td>
                    <td style={td}>{eq.fabricante}</td>
                    <td style={td}>{eq.modelo}</td>
                    <td style={td}>{eq.numero_serie}</td>
                    <td style={td}>
                      <button onClick={() => startEdit(eq)}>Editar</button>
                      <button onClick={() => onDelete(eq.id)}>Excluir</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
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

const th = {
  border: '1px solid #222',
  padding: 8,
  background: '#eee',
  fontFamily: 'Oswald',
  fontSize: 18
};

const td = {
  border: '1px solid #222',
  padding: 8,
  fontFamily: 'Oswald',
  fontSize: 16
};