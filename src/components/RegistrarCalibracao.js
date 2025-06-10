import React, { useState } from 'react';

function calcularStatus(valorReferencia, valorMedido, tolerancia) {
  const diferenca = Math.abs(valorReferencia - valorMedido);
  return diferenca <= tolerancia ? 'Dentro' : 'Fora';
}

export default function RegistrarCalibracao({ username, onBack }) {
  const [dados, setDados] = useState({
    data: '',
    temperatura: '',
    umidade: '',
    tecnico: username || '',
    valorReferencia: '',
    valorCalibrado: '',
    tolerancia: '',
  });

  const [status, setStatus] = useState('');
  const [alerta, setAlerta] = useState('');

  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const statusCalc = calcularStatus(
      parseFloat(dados.valorReferencia),
      parseFloat(dados.valorCalibrado),
      parseFloat(dados.tolerancia)
    );
    setStatus(statusCalc);
    setAlerta(statusCalc === 'Fora' ? 'Atenção: Fora da tolerância!' : '');
  }

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>⟵ Voltar</button>
      <h2>Registrar Calibração</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 16 }}>
          <label>
            Data:
            <input
              type="date"
              name="data"
              value={dados.data}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Temperatura:
            <input
              type="number"
              name="temperatura"
              value={dados.temperatura}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Umidade:
            <input
              type="number"
              name="umidade"
              value={dados.umidade}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Técnico:
            <input
              type="text"
              name="tecnico"
              value={dados.tecnico}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Valor de Referência:
            <input
              type="number"
              name="valorReferencia"
              value={dados.valorReferencia}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Valor Calibrado:
            <input
              type="number"
              name="valorCalibrado"
              value={dados.valorCalibrado}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Tolerância:
            <input
              type="number"
              name="tolerancia"
              value={dados.tolerancia}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <button type="submit">Calcular Status</button>
      </form>
      {status && (
        <div style={{ marginTop: 32 }}>
          <h3>Status da Calibração: {status}</h3>
          {alerta && <p style={{ color: 'red' }}>{alerta}</p>}
        </div>
      )}
    </div>
  );
}