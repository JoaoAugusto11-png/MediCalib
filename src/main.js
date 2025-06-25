const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { cadastrarUsuario, autenticarUsuario, cadastrarEquipamento, listarEquipamentosPorUsuario, excluirEquipamento, editarEquipamento, validarToken, redefinirSenha, agendarManutencao } = require('./database'); // ajuste o caminho se necessário
const { gerarPdfCalibracao } = require('./pdf');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


ipcMain.handle('cadastrar-usuario', async (event, dadosUsuario) => {
  return cadastrarUsuario(dadosUsuario);
});


ipcMain.handle('autenticar-usuario', async (event, dados) => {
  return autenticarUsuario(dados);
});


ipcMain.handle('cadastrar-equipamento', async (event, dados) => {
  return cadastrarEquipamento(dados);
});


ipcMain.handle('listar-equipamentos-usuario', async (event, usuario_id) => {
  return listarEquipamentosPorUsuario(usuario_id);
});


ipcMain.handle('excluir-equipamento', async (event, id) => {
  return excluirEquipamento(id);
});

ipcMain.handle('editar-equipamento', async (event, dados) => {
  return editarEquipamento(dados);
});

ipcMain.handle('validar-token', async (event, dados) => {
  return validarToken(dados);
});

ipcMain.handle('redefinir-senha', async (event, dados) => {
  return redefinirSenha(dados);
});


ipcMain.handle('agendar-manutencao', async (event, dados) => {
  console.log('Chamando agendarManutencao com:', dados);
  return agendarManutencao(dados);
});


ipcMain.handle('gerar-pdf-calibracao', async (event, dados) => {
  return await gerarPdfCalibracao(dados);
});

ipcMain.on('sair-app', () => {
  app.quit();
});