import React from 'react';

export default function EquipmentList({ username, equipments, onRegisterClick }) {
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
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{username.toUpperCase()}</div>
            <div style={{ fontSize: 14 }}>ESTAGIÁRIO (EMPRESA X)</div>
          </div>
          <button style={menuBtn} onClick={onRegisterClick}>REGISTRAR EQUIPAMENTO</button>
          <button style={menuBtn}>LISTA DE EQUIPAMENTOS</button>
          <button style={menuBtn}>AGENDAR MANUTENÇÃO</button>
          <button style={menuBtn}>REGISTRAR CALIBRAÇÃO</button>
        </div>
        <button style={exitBtn}>⟵ SAIR</button>
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
            </tr>
          </thead>
          <tbody>
            {equipments.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>Nenhum equipamento cadastrado.</td>
              </tr>
            )}
            {equipments.map((eq, idx) => (
              <tr key={idx}>
                <td style={td}>{eq.nome}</td>
                <td style={td}>{eq.fabricante}</td>
                <td style={td}>{eq.modelo}</td>
                <td style={td}>{eq.numeroSerie}</td>
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