import React, { useState } from 'react';

function calcularStatus(valoresReferencia, valoresCalibrado, tolerancia) {
  for (let i = 0; i < 3; i++) {
    const dif = Math.abs(valoresReferencia[i] - valoresCalibrado[i]);
    if (dif > tolerancia) return 'Fora';
  }
  return 'Dentro';
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: 16,
  border: '1px solid #bbb',
  borderRadius: 4,
  marginTop: 4,
  marginBottom: 8,
  fontFamily: 'Oswald'
};

const labelStyle = {
  fontWeight: 'bold',
  fontFamily: 'Oswald',
  fontSize: 18,
  marginBottom: 4
};

const blocoStyle = {
  display: 'flex',
  gap: 16,
  marginTop: 8,
  marginBottom: 8
};

const submitBtn = {
  padding: '12px 0',
  background: '#94c8f7',
  border: '1px solid #222',
  fontFamily: 'Oswald',
  fontSize: 18,
  fontWeight: 'bold',
  borderRadius: 4,
  cursor: 'pointer',
  marginTop: 16
};

// CSS para remover as setas dos inputs type="number"
const noSpinnerStyle = `
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export default function RegistrarCalibracao({ username, onBack }) {
  const [dados, setDados] = useState({
    data: '',
    temperatura: '',
    umidade: '',
    tecnico: username || '',
    valoresReferencia: ['', '', ''],
    valoresCalibrado: ['', '', ''],
    tolerancia: '',
  });

  const [status, setStatus] = useState('');
  const [alerta, setAlerta] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith('valorReferencia')) {
      const idx = Number(name.replace('valorReferencia', ''));
      const novos = [...dados.valoresReferencia];
      novos[idx] = value;
      setDados({ ...dados, valoresReferencia: novos });
    } else if (name.startsWith('valorCalibrado')) {
      const idx = Number(name.replace('valorCalibrado', ''));
      const novos = [...dados.valoresCalibrado];
      novos[idx] = value;
      setDados({ ...dados, valoresCalibrado: novos });
    } else {
      setDados({ ...dados, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const valoresRef = dados.valoresReferencia.map(Number);
    const valoresCal = dados.valoresCalibrado.map(Number);
    const tolerancia = parseFloat(dados.tolerancia);
    const statusCalc = calcularStatus(valoresRef, valoresCal, tolerancia);
    setStatus(statusCalc);
    setAlerta(statusCalc === 'Fora' ? 'Atenção: Fora da tolerância!' : '');
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'stretch' }}>
      {/* Adiciona o estilo global para remover os spinners */}
      <style>{noSpinnerStyle}</style>
      <div style={{
        background: '#94c8f7',
        width: 320,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%' // <-- Garante que a lateral azul vá até o fim
      }}>
        <div>
          <h1 style={{ fontFamily: 'Oswald', fontSize: 32, marginBottom: 32 }}>MEDICALIB</h1>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{username?.toUpperCase()}</div>
            <div style={{ fontSize: 14 }}>ESTAGIÁRIO (EMPRESA X)</div>
          </div>
          <button
            style={{
              ...submitBtn,
              width: '100%',
              marginTop: 0,
              marginBottom: 16,
              background: '#b3d7f7', // <-- azul claro igual ao da imagem
              color: '#222',
              position: 'relative',
              zIndex: 1
            }}
            onClick={onBack}
          >
            ⟵ VOLTAR
          </button>
        </div>
      </div>
      <div style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontFamily: 'Oswald', fontSize: 36, textAlign: 'center' }}>REGISTRAR CALIBRAÇÃO</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={labelStyle}>
            Data:
            <input
              type="date"
              name="data"
              value={dados.data}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Temperatura (°C):
            <input
              type="number"
              name="temperatura"
              value={dados.temperatura}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Umidade (%):
            <input
              type="number"
              name="umidade"
              value={dados.umidade}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Técnico Responsável:
            <input
              type="text"
              name="tecnico"
              value={dados.tecnico}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <div>
            <div style={labelStyle}>Valores de Referência:</div>
            <div style={blocoStyle}>
              {[0, 1, 2].map(i => (
                <input
                  key={i}
                  type="number"
                  name={`valorReferencia${i}`}
                  value={dados.valoresReferencia[i]}
                  onChange={handleChange}
                  required
                  placeholder={`Valor ${i + 1}`}
                  style={{ ...inputStyle, width: 100, margin: 0 }}
                />
              ))}
            </div>
          </div>
          <div>
            <div style={labelStyle}>Valores Calibrados:</div>
            <div style={blocoStyle}>
              {[0, 1, 2].map(i => (
                <input
                  key={i}
                  type="number"
                  name={`valorCalibrado${i}`}
                  value={dados.valoresCalibrado[i]}
                  onChange={handleChange}
                  required
                  placeholder={`Valor ${i + 1}`}
                  style={{ ...inputStyle, width: 100, margin: 0 }}
                />
              ))}
            </div>
          </div>
          <label style={labelStyle}>
            Tolerância Permitida:
            <input
              type="number"
              name="tolerancia"
              value={dados.tolerancia}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <button type="submit" style={submitBtn}>Registrar</button>
        </form>
        {status && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontFamily: 'Oswald', fontSize: 24 }}>
              Status da Calibração: {status}
            </h3>
            {alerta && <p style={{ color: 'red', fontFamily: 'Oswald', fontSize: 18 }}>{alerta}</p>}
          </div>
        )}
      </div>
    </div>
  );
}