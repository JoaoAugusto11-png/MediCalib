const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  cadastrarUsuario: (dadosUsuario) => ipcRenderer.invoke('cadastrar-usuario', dadosUsuario),
  loginUsuario: (dadosLogin) => ipcRenderer.invoke('login-usuario', dadosLogin),
  sair: () => ipcRenderer.send('sair-app'),
  cadastrarEquipamento: (dados) => ipcRenderer.invoke('cadastrar-equipamento', dados),
  listarEquipamentosUsuario: (usuario_id) => ipcRenderer.invoke('listar-equipamentos-usuario', usuario_id),
  excluirEquipamento: (id) => ipcRenderer.invoke('excluir-equipamento', id),
  editarEquipamento: (dados) => ipcRenderer.invoke('editar-equipamento', dados),
  validarToken: (dados) => ipcRenderer.invoke('validar-token', dados),
  redefinirSenha: (dados) => ipcRenderer.invoke('redefinir-senha', dados),
  autenticarUsuario: (dados) => ipcRenderer.invoke('autenticar-usuario', dados),
  agendarManutencao: (dados) => ipcRenderer.invoke('agendar-manutencao', dados),
  gerarPdfCalibracao: (dados) => ipcRenderer.invoke('gerar-pdf-calibracao', dados),
});