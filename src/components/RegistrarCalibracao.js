import React, { useState, useEffect } from 'react';

export default function RegistrarCalibracao(props) {
  const [dados, setDados] = useState({
    data: '',
    temperatura: '',
    umidade: '',
    tecnico: props.username || '',
    valoresReferencia: ['', '', ''],
    valoresCalibrado: ['', '', ''],
    tolerancia: '',
    observacoes: '',
  });
  const [equipamentoId, setEquipamentoId] = useState('');

  // Resetar o formulário ao abrir a tela
  useEffect(() => {
    setDados({
      data: '',
      temperatura: '',
      umidade: '',
      tecnico: props.username || '',
      valoresReferencia: ['', '', ''],
      valoresCalibrado: ['', '', ''],
      tolerancia: '',
      observacoes: '',
    });
    setEquipamentoId('');
  }, []); // [] garante que roda só ao montar

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

  async function gerarLaudoPDF(dadosParaPdf) {
    const resposta = await window.api.gerarPdfCalibracao(dadosParaPdf);
    if (resposta && resposta.success) {
      alert('PDF salvo em: ' + resposta.caminho);
    } else if (resposta && resposta.canceled) {
      alert('Operação cancelada pelo usuário.');
    } else {
      alert('Erro ao gerar PDF.');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!props.equipamentos) return;
    const valoresRef = dados.valoresReferencia.map(Number);
    const valoresCal = dados.valoresCalibrado.map(Number);
    const tolerancia = parseFloat(dados.tolerancia);
    const statusCalc = calcularStatus(valoresRef, valoresCal, tolerancia);
    props.setStatus(statusCalc);
    props.setAlerta(statusCalc === 'Fora' ? 'Atenção: Fora da tolerância!' : '');

    // Busca o nome do equipamento selecionado
    const equipamentoSelecionado = props.equipamentos.find(eq => eq.id === Number(equipamentoId));

    // Monta objeto para o PDF
    const dadosParaPdf = {
      ...dados,
      equipamento_nome: equipamentoSelecionado ? equipamentoSelecionado.nome : '',
      numero_serie: equipamentoSelecionado ? equipamentoSelecionado.numero_serie || '' : '',
      empresa: props.empresa,
      tecnico_nome: props.username,
      parametro: valoresRef.join(', '),
      valor_calibrado: valoresCal.join(', '),
      tolerancia: dados.tolerancia,
      resultado: statusCalc,
      dentro_padrao: statusCalc === 'Dentro',
      observacoes: dados.observacoes || '',
      data: dados.data,
    };

    await gerarLaudoPDF(dadosParaPdf);
    props.onRegister({ equipamentoId, ...dados });
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
              disabled
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #8bbbe8',
                marginTop: 4,
                fontSize: 16,
                background: '#f0f0f0'
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
                  type="number" // ou "text" se quiser permitir qualquer formato
                  name={`valorReferencia${i}`}
                  value={dados.valoresReferencia[i] || ''}
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
                  type="number" // ou "text" se quiser permitir qualquer formato
                  name={`valorCalibrado${i}`}
                  value={dados.valoresCalibrado[i] || ''}
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
            Observações:
            <input
              type="text"
              name="observacoes"
              value={dados.observacoes}
              onChange={handleChange}
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
              disabled={!props.equipamentos}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #8bbbe8',
                marginTop: 4,
                fontSize: 16,
                background: props.equipamentos ? '#fff' : '#f0f0f0',
                color: props.equipamentos ? '#222' : '#888',
                outline: 'none'
              }}
            >
              <option value="">Selecione um equipamento</option>
              {props.equipamentos && props.equipamentos.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.nome}
                </option>
              ))}
            </select>
          </label>
          {!props.equipamentos && (
            <div style={{ color: 'red', marginTop: 8, fontWeight: 'bold' }}>
              Você ainda não cadastrou nenhum equipamento.
            </div>
          )}
          <button
            type="submit"
            disabled={!props.equipamentos}
            style={{
              marginTop: 8,
              padding: '12px 0',
              background: props.equipamentos ? '#0074d9' : '#b0b0b0',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'Oswald',
              fontSize: 18,
              fontWeight: 'bold',
              cursor: props.equipamentos ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s'
            }}
          >
            Registrar Calibração
          </button>
        </form>
        <button
          onClick={props.onBack}
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