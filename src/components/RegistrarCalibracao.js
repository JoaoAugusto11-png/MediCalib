import React, { useState } from 'react';

export default function RegistrarCalibracao({
  username, userType, empresa, userId, equipamentos = [], onBack, onRegister
}) {
  const [equipamentoId, setEquipamentoId] = useState('');
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
  const hasEquipamentos = equipamentos && equipamentos.length > 0;

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

  function calcularStatus(valoresReferencia, valoresCalibrado, tolerancia) {
    for (let i = 0; i < 3; i++) {
      const dif = Math.abs(valoresReferencia[i] - valoresCalibrado[i]);
      if (dif > tolerancia) return 'Fora';
    }
    return 'Dentro';
  }

  function gerarLaudoPDF(dados, status) {
    const doc = new jsPDF();

    // Cabeçalho com fundo azul
    doc.setFillColor(148, 200, 247); // azul claro
    doc.rect(0, 0, 210, 25, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(33, 33, 33);
    doc.text("Laudo de Calibração", 105, 17, { align: "center" });

    // Dados principais
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Data: ${dados.data}`, 10, 35);
    doc.text(`Técnico: ${dados.tecnico}`, 10, 43);
    doc.text(`Temperatura: ${dados.temperatura} °C`, 10, 51);
    doc.text(`Umidade: ${dados.umidade} %`, 10, 59);
    doc.text(`Tolerância: ${dados.tolerancia}`, 10, 67);

    // Tabela de valores
    doc.setFont("helvetica", "bold");
    doc.text("Valores", 10, 80);
    doc.setFont("helvetica", "normal");
    doc.text("Referência", 40, 80);
    doc.text("Calibrado", 90, 80);

    for (let i = 0; i < 3; i++) {
      doc.text(`Valor ${i + 1}:`, 10, 90 + i * 10);
      doc.text(String(dados.valoresReferencia[i]), 45, 90 + i * 10);
      doc.text(String(dados.valoresCalibrado[i]), 95, 90 + i * 10);
    }

    // Status com cor
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    if (status === "Dentro") {
      doc.setTextColor(0, 128, 0);
    } else {
      doc.setTextColor(200, 0, 0);
    }
    doc.text(`Status da Calibração: ${status}`, 10, 130);

    // Linha de assinatura
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 160, 80, 160);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Assinatura do Técnico", 10, 165);

    doc.save("laudo_calibracao.pdf");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!hasEquipamentos) return;
    const valoresRef = dados.valoresReferencia.map(Number);
    const valoresCal = dados.valoresCalibrado.map(Number);
    const tolerancia = parseFloat(dados.tolerancia);
    const statusCalc = calcularStatus(valoresRef, valoresCal, tolerancia);
    setStatus(statusCalc);
    setAlerta(statusCalc === 'Fora' ? 'Atenção: Fora da tolerância!' : '');
    gerarLaudoPDF(dados, statusCalc); // <-- Gera o PDF após o submit
    onRegister({ equipamentoId, ...dados });
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
          Registrar Calibração
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ fontWeight: 'bold', fontSize: 16 }}>
            Data:
            <input
              type="date"
              name="data"
              value={dados.data}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #8bbbe8',
                marginTop: 4,
                fontSize: 16
              }}
            />
          </label>
          <label style={{ fontWeight: 'bold', fontSize: 16 }}>
            Temperatura (°C):
            <input
              type="number"
              name="temperatura"
              value={dados.temperatura}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #8bbbe8',
                marginTop: 4,
                fontSize: 16
              }}
            />
          </label>
          <label style={{ fontWeight: 'bold', fontSize: 16 }}>
            Umidade (%):
            <input
              type="number"
              name="umidade"
              value={dados.umidade}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #8bbbe8',
                marginTop: 4,
                fontSize: 16
              }}
            />
          </label>
          <label style={{ fontWeight: 'bold', fontSize: 16 }}>
            Técnico Responsável:
            <input
              type="text"
              name="tecnico"
              value={dados.tecnico}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #8bbbe8',
                marginTop: 4,
                fontSize: 16
              }}
            />
          </label>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>Valores de Referência:</div>
            <div style={{
              display: 'flex',
              gap: 16,
              marginTop: 8,
              marginBottom: 8
            }}>
              {[0, 1, 2].map(i => (
                <input
                  key={i}
                  type="number"
                  name={`valorReferencia${i}`}
                  value={dados.valoresReferencia[i]}
                  onChange={handleChange}
                  required
                  placeholder={`Valor ${i + 1}`}
                  style={{
                    width: 100,
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid #8bbbe8',
                    fontSize: 16,
                    margin: 0
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>Valores Calibrados:</div>
            <div style={{
              display: 'flex',
              gap: 16,
              marginTop: 8,
              marginBottom: 8
            }}>
              {[0, 1, 2].map(i => (
                <input
                  key={i}
                  type="number"
                  name={`valorCalibrado${i}`}
                  value={dados.valoresCalibrado[i]}
                  onChange={handleChange}
                  required
                  placeholder={`Valor ${i + 1}`}
                  style={{
                    width: 100,
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid #8bbbe8',
                    fontSize: 16,
                    margin: 0
                  }}
                />
              ))}
            </div>
          </div>
          <label style={{ fontWeight: 'bold', fontSize: 16 }}>
            Tolerância Permitida:
            <input
              type="number"
              name="tolerancia"
              value={dados.tolerancia}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #8bbbe8',
                marginTop: 4,
                fontSize: 16
              }}
            />
          </label>
          <label style={{ fontWeight: 'bold', fontSize: 16 }}>
            Equipamento a calibrar:
            <select
              value={equipamentoId}
              onChange={e => setEquipamentoId(e.target.value)}
              disabled={!hasEquipamentos}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #8bbbe8',
                marginTop: 4,
                fontSize: 16,
                background: hasEquipamentos ? '#fff' : '#f0f0f0',
                color: hasEquipamentos ? '#222' : '#888',
                outline: 'none'
              }}
            >
              <option value="">Selecione um equipamento</option>
              {equipamentos.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.nome}
                </option>
              ))}
            </select>
          </label>
          {!hasEquipamentos && (
            <div style={{ color: 'red', marginTop: 8, fontWeight: 'bold' }}>
              Você ainda não cadastrou nenhum equipamento.
            </div>
          )}
          <button
            type="submit"
            disabled={!hasEquipamentos}
            style={{
              marginTop: 8,
              padding: '12px 0',
              background: hasEquipamentos ? '#0074d9' : '#b0b0b0',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'Oswald',
              fontSize: 18,
              fontWeight: 'bold',
              cursor: hasEquipamentos ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s'
            }}
          >
            Registrar Calibração
          </button>
        </form>
        <button
          onClick={onBack}
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
        >
          Voltar
        </button>
      </div>
    </div>
  );
}