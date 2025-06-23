import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import RecuperarSenha from './components/RecuperarSenha';
import EquipmentList from './components/EquipmentList';
import RegisterEquipment from './components/RegisterEquipment';
import RegistrarCalibracao from './components/RegistrarCalibracao';
import AgendarManutencao from './components/AgendarManutencao';
import CadastroUsuario from './components/CadastroUsuario';

function App() {
  const [logged, setLogged] = useState(false);
  const [showRecuperarSenha, setShowRecuperarSenha] = useState(false);
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState(''); // 'admin' ou 'usuario'
  const [empresa, setEmpresa] = useState('');   // <-- Adicionado
  const [userId, setUserId] = useState(null);
  const [tab, setTab] = useState('list');
  const [equipments, setEquipments] = useState([]);
  const [editingEquipamento, setEditingEquipamento] = useState(null);

  async function handleLogin(login, senha) {
    const resposta = await window.api.autenticarUsuario({ login, senha });
    if (resposta.success) {
      const usuario = resposta.usuario;
      setUsername(usuario.nome);
      setUserType(usuario.tipo);
      setEmpresa(usuario.empresa || '');
      setUserId(usuario.id);
      setLogged(true);
      const equipamentos = await window.api.listarEquipamentosUsuario(usuario.id);
      setEquipments(equipamentos);
      return true;
    } else {
      alert('Login ou senha inválidos!');
      return false;
    }
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

  function handleVoltarRecuperarSenha() {
    setShowRecuperarSenha(false);
    // Não precisa mais do setLoginKey
  }

  function handleLogout() {
    setLogged(false);
    setUsername('');
    setUserType('');
    setEmpresa('');
    setUserId('');
    setEquipments([]);
    // Se tiver outros estados do usuário, limpe aqui também
  }

  if (!logged) {
    if (showRecuperarSenha) {
      return (
        <RecuperarSenha
          onLoginDireto={handleLogin}
          onVoltar={handleVoltarRecuperarSenha}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onEsqueceuSenha={() => setShowRecuperarSenha(true)}
      />
    );
  }

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
        key={tab} // Isso força o React a desmontar e remontar o componente ao trocar de tela
        username={username}
        userType={userType}
        empresa={empresa}
        userId={userId}
        equipamentos={equipments}
        onBack={() => setTab('list')}
        onRegister={() => {}}
      />
    );
  }

  if (tab === 'manutencao') {
    return (
      <AgendarManutencao
        username={username}
        userType={userType}
        empresa={empresa}
        userId={userId}
        equipamentos={equipments}
        onBack={() => setTab('list')}
        onRegister={() => {}}
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

  const equipamentosList = Array.isArray(equipments) ? equipments : [];

  return (
    <EquipmentList
      username={username}
      userType={userType}
      empresa={empresa}
      equipments={equipamentosList}
      onRegisterClick={() => setTab('register')}
      onCalibracaoClick={() => setTab('calibracao')}
      onAgendarManutencaoClick={() => setTab('manutencao')}
      onCadastroUsuarioClick={() => setTab('cadastroUsuario')}
      onDelete={handleDeleteEquipamento}
      onUpdate={atualizarEquipamentos}
      onLogout={handleLogout}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
