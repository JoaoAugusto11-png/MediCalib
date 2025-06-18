const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  cadastrarUsuario: (dadosUsuario) => ipcRenderer.invoke('cadastrar-usuario', dadosUsuario),
  loginUsuario: (dadosLogin) => ipcRenderer.invoke('login-usuario', dadosLogin),
  sair: () => ipcRenderer.send('sair-app'),
  cadastrarEquipamento: (dados) => ipcRenderer.invoke('cadastrar-equipamento', dados),
  listarEquipamentosUsuario: (usuario_id) => ipcRenderer.invoke('listar-equipamentos-usuario', usuario_id),
});