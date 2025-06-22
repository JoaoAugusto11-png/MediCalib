import React, { useState } from "react";
import RegisterEquipment from "./RegisterEquipment"; // Certifique-se de que o caminho está correto

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

export default function AgendarManutencao({ onBack, username, userType, empresa, userId, onRegister }) {
  const [form, setForm] = useState({
    equipamento: "",
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

  const [tab, setTab] = useState('agendar'); // Estado para controlar a aba atual

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!window.api || !window.api.inserirManutencao) {
      alert("API do backend não disponível!");
      return;
    }
    const resposta = await window.api.inserirManutencao(form);
    if (resposta.success) {
      alert("Manutenção agendada com sucesso!");
      setForm({
        equipamento: "",
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
    } else {
      alert("Erro ao agendar: " + resposta.error);
    }
  };

  const handleRegister = () => {
    // Lógica para lidar com o registro do equipamento
    alert("Equipamento registrado com sucesso!"); // Exemplo de ação após registro
    setTab('agendar'); // Volta para a aba de agendar manutenção
  };

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
            <input name="equipamento" value={form.equipamento} onChange={handleChange} required style={inputStyle} />
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
            <input name="tecnico" value={form.tecnico} onChange={handleChange} required style={inputStyle} />
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