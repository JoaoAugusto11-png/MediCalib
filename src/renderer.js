import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import EquipmentList from './components/EquipmentList';
import RegisterEquipment from './components/RegisterEquipment';
import RegistrarCalibracao from './components/RegistrarCalibracao';

function App() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [tab, setTab] = useState('list');
  const [equipments, setEquipments] = useState([]);

  function handleLogin(name) {
    setUsername(name);
    setLogged(true);
  }

  function handleRegister(equipment) {
    setEquipments([...equipments, equipment]);
    setTab('list');
  }

  if (!logged) return <Login onLogin={handleLogin} />;

  if (tab === 'register') {
    return (
      <RegisterEquipment
        username={username}
        onBack={() => setTab('list')}
        onRegister={handleRegister}
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

  return (
    <EquipmentList
      username={username}
      equipments={equipments}
      onRegisterClick={() => setTab('register')}
      onCalibracaoClick={() => setTab('calibracao')}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

<button style={menuBtn} onClick={onCalibracaoClick}>REGISTRAR CALIBRAÇÃO</button>