const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  inserirManutencao: (manutencao) => ipcRenderer.invoke('inserir-manutencao', manutencao),
  sair: () => ipcRenderer.send('sair-app'),
});