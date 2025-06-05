import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import EquipmentList from './components/EquipmentList';

function App() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');

  function handleLogin(name) {
    setUsername(name);
    setLogged(true);
  }

  return logged
    ? <EquipmentList username={username} />
    : <Login onLogin={handleLogin} />;
}

ReactDOM.render(<App />, document.getElementById('root'));