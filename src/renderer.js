import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import EquipmentList from './components/EquipmentList';
import RegisterEquipment from './components/RegisterEquipment';

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

  return (
    <EquipmentList
      username={username}
      equipments={equipments}
      onRegisterClick={() => setTab('register')}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));