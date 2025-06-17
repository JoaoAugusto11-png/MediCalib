const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  cadastrarUsuario: (dadosUsuario) => ipcRenderer.invoke('cadastrar-usuario', dadosUsuario),
  loginUsuario: (dadosLogin) => ipcRenderer.invoke('login-usuario', dadosLogin),
  sair: () => ipcRenderer.send('sair-app'),
});