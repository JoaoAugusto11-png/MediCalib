import React, { useState, useEffect } from "react";
import RegisterEquipment from "./RegisterEquipment"; 

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

export default function AgendarManutencao({ onBack, username, userType, empresa, userId, onRegister, equipamentos }) {
  
  const equipamentosList = Array.isArray(equipamentos) ? equipamentos : [];

  const [form, setForm] = useState({
    tipo: "",
    prioridade: "",
    dataHora: "",
    causa: "",
    tecnico: "",
    supervisor: "",
    duracao: "",
    janelaInicio: "",
    janelaFim: "",
    requerAprovacao: false,
    justificativa: "",
    status: "Agendada"
  });

  const [tab, setTab] = useState('agendar');
  const [equipamentoId, setEquipamentoId] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!window.api || !window.api.agendarManutencao) {
      alert("API do backend não disponível!");
      return;
    }
    try {
      const {
        tipo,
        prioridade,
        dataHora: data_hora_prevista,
        causa,
        tecnico, 
        supervisor,
        duracao,
        janelaInicio: janela_inicio,
        janelaFim: janela_fim,
        requerAprovacao: requer_aprovacao,
        justificativa,
        status
      } = form;

      if (!equipamentoId) {
        alert("Selecione um equipamento!");
        return;
      }

      const resposta = await window.api.agendarManutencao({
        equipamento_id: equipamentoId,
        tipo,
        prioridade,
        data_hora_prevista,
        causa,
        tecnico_id: userId, 
        supervisor,
        duracao,
        janela_inicio,
        janela_fim,
        requer_aprovacao,
        justificativa,
        status,
        usuario_id: userId 
      });
      if (resposta && resposta.success) {
        alert("Manutenção agendada com sucesso!");
        setForm({
          tipo: "",
          prioridade: "",
          dataHora: "",
          causa: "",
          tecnico: "",
          supervisor: "",
          duracao: "",
          janelaInicio: "",
          janelaFim: "",
          requerAprovacao: false,
          justificativa: "",
          status: "Agendada"
        });
        setEquipamentoId('');
      } else {
        alert('Erro ao agendar manutenção!');
      }
    } catch (err) {
      alert('Erro inesperado: ' + err.message);
      console.error(err);
    }
  };

  const handleRegister = () => {
    alert("Equipamento registrado com sucesso!");
    setTab('agendar');
  };

  useEffect(() => {
    return () => {
      // Limpeza de qualquer estado global ou efeito colateral
      // Exemplo: window.removeEventListener(...);
    };
  }, []);

  if (tab === 'register') {
    return (
      <RegisterEquipment
        username={username}
        userType={userType}
        empresa={empresa}
        userId={userId}
        onRegister={handleRegister}
        onBack={() => setTab('list')}
      />
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'stretch' }}>
      <div style={{
        background: '#94c8f7',
        width: 320,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%'
      }}>
        <h1 style={{ fontFamily: 'Oswald', fontSize: 32, marginBottom: 32 }}>MEDICALIB</h1>
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>
          {username ? username.toUpperCase() : ''}
        </div>
        <div style={{ fontSize: 14 }}>
          {userType ? userType.toUpperCase() : ''}{empresa ? ` (${empresa})` : ''}
        </div>
        <button
          style={{
            ...submitBtn,
            width: '100%',
            marginTop: 0,
            marginBottom: 16,
            background: '#b3d7f7',
            color: '#222'
          }}
          onClick={onBack}
        >
          ⟵ VOLTAR
        </button>
      </div>
      <div style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontFamily: 'Oswald', fontSize: 36, textAlign: 'center' }}>AGENDAR MANUTENÇÃO</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={labelStyle}>
            Equipamento:
            <select
              value={equipamentoId}
              onChange={e => setEquipamentoId(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecione um equipamento</option>
              {equipamentosList.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.nome}</option>
              ))}
            </select>
          </label>
          <label style={labelStyle}>
            Tipo:
            <select name="tipo" value={form.tipo} onChange={handleChange} required style={inputStyle}>
              <option value="">Selecione...</option>
              <option value="Preventiva">Preventiva</option>
              <option value="Corretiva">Corretiva</option>
              <option value="Preditiva">Preditiva</option>
            </select>
          </label>
          <label style={labelStyle}>
            Prioridade:
            <select name="prioridade" value={form.prioridade} onChange={handleChange} required style={inputStyle}>
              <option value="">Selecione...</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </label>
          <label style={labelStyle}>
            Data/Hora Prevista:
            <input type="datetime-local" name="dataHora" value={form.dataHora} onChange={handleChange} required style={inputStyle} />
          </label>
          {form.tipo === "Corretiva" && (
            <label style={labelStyle}>
              Causa:
              <input name="causa" value={form.causa} onChange={handleChange} style={inputStyle} />
            </label>
          )}
          <label style={labelStyle}>
            Técnico Responsável:
            <input
              value={username}
              disabled
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Supervisor:
            <input name="supervisor" value={form.supervisor} onChange={handleChange} required style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Duração Estimada:
            <input name="duracao" value={form.duracao} onChange={handleChange} required style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Janela de Execução:
            <input type="date" name="janelaInicio" value={form.janelaInicio} onChange={handleChange} required style={{ ...inputStyle, width: 150, display: 'inline-block', marginRight: 8 }} />
            até
            <input type="date" name="janelaFim" value={form.janelaFim} onChange={handleChange} required style={{ ...inputStyle, width: 150, display: 'inline-block', marginLeft: 8 }} />
          </label>
          <label style={labelStyle}>
            <input type="checkbox" name="requerAprovacao" checked={form.requerAprovacao} onChange={handleChange} style={{ marginRight: 8 }} />
            Requer Aprovação?
          </label>
          {form.requerAprovacao && (
            <label style={labelStyle}>
              Justificativa:
              <input name="justificativa" value={form.justificativa} onChange={handleChange} required style={inputStyle} />
            </label>
          )}
          <button type="submit" style={submitBtn}>Agendar</button>
        </form>
      </div>
    </div>
  );
}