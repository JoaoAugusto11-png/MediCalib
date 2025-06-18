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
  const [userId, setUserId] = useState(null); // <-- Adicionado
  const [tab, setTab] = useState('list');
  const [equipments, setEquipments] = useState([]);

  async function handleLogin(usuario) {
    setUsername(usuario.nome);
    setUserType(usuario.tipo);
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
      equipments={equipments}
      onRegisterClick={() => setTab('register')}
      onCalibracaoClick={() => setTab('calibracao')}
      onAgendarManutencaoClick={() => setTab('manutencao')}
      userType={userType}
      onCadastroUsuarioClick={() => setTab('cadastroUsuario')}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

{onBack && (
  <button type="button" onClick={onBack} style={{ marginBottom: 16 }}>
    ⟵ Voltar
  </button>
)}