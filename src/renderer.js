import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import EquipmentList from './components/EquipmentList';
import RegisterEquipment from './components/RegisterEquipment';
import RegistrarCalibracao from './components/RegistrarCalibracao';
import AgendarManutencao from './components/AgendarManutencao';
import CadastroUsuario from './components/CadastroUsuario';

function App() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState(''); // 'admin' ou 'usuario'
  const [empresa, setEmpresa] = useState('');   // <-- Adicionado
  const [userId, setUserId] = useState(null);
  const [tab, setTab] = useState('list');
  const [equipments, setEquipments] = useState([]);
  const [editingEquipamento, setEditingEquipamento] = useState(null);

  async function handleLogin(usuario) {
    setUsername(usuario.nome);
    setUserType(usuario.tipo);
    setEmpresa(usuario.empresa || ''); // <-- Salva a empresa do usuário
    setUserId(usuario.id);
    setLogged(true);

    // Busque os equipamentos do usuário logado
    const equipamentos = await window.api.listarEquipamentosUsuario(usuario.id);
    setEquipments(equipamentos);
  }

  async function handleRegister() {
    const equipamentos = await window.api.listarEquipamentosUsuario(userId);
    setEquipments(equipamentos);
    setTab('list');
  }

  async function atualizarEquipamentos() {
    const equipamentos = await window.api.listarEquipamentosUsuario(userId);
    setEquipments(equipamentos);
  }

  async function handleDeleteEquipamento(id) {
    await window.api.excluirEquipamento(id);
    await atualizarEquipamentos();
  }

  async function handleEditEquipamento(equipamentoEditado) {
    await window.api.editarEquipamento(equipamentoEditado);
    await atualizarEquipamentos();
  }

  if (!logged) return <Login onLogin={handleLogin} />;

  if (tab === 'register') {
    return (
      <RegisterEquipment
        userId={userId}
        onRegister={handleRegister}
        onBack={() => setTab('list')}
      />
    );
  }

  if (tab === 'calibracao') {
    return (
      <RegistrarCalibracao
        username={username}
        onBack={() => setTab('list')}
      />
    );
  }

  if (tab === 'manutencao') {
    return (
      <AgendarManutencao
        onBack={() => setTab('list')}
      />
    );
  }

  if (tab === 'cadastroUsuario') {
    return (
      <CadastroUsuario
        onCadastroSucesso={() => setTab('list')}
        onBack={() => setTab('list')}
      />
    );
  }

  return (
    <EquipmentList
      username={username}
      userType={userType}
      empresa={empresa} // <-- Passe a empresa para o menu lateral
      equipments={equipments}
      onRegisterClick={() => setTab('register')}
      onCalibracaoClick={() => setTab('calibracao')}
      onAgendarManutencaoClick={() => setTab('manutencao')}
      onCadastroUsuarioClick={() => setTab('cadastroUsuario')}
      onDelete={handleDeleteEquipamento}
      onUpdate={atualizarEquipamentos}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

{onBack && (
  <button type="button" onClick={onBack} style={{ marginBottom: 16 }}>
    ⟵ Voltar
  </button>
)}