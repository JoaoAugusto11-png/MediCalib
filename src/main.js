const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { cadastrarUsuario, autenticarUsuario, cadastrarEquipamento, listarEquipamentosPorUsuario } = require('./database'); // ajuste o caminho se necessário

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Recomendado: use preload.js para segurança
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

// IPC para cadastro de usuário
ipcMain.handle('cadastrar-usuario', async (event, dadosUsuario) => {
  return cadastrarUsuario(dadosUsuario);
});

// IPC para login de usuário
ipcMain.handle('login-usuario', async (event, dadosLogin) => {
  return autenticarUsuario(dadosLogin);
});

// IPC para cadastro de equipamento
ipcMain.handle('cadastrar-equipamento', async (event, dados) => {
  return cadastrarEquipamento(dados);
});

// IPC para listar equipamentos de um usuário
ipcMain.handle('listar-equipamentos-usuario', async (event, usuario_id) => {
  return listarEquipamentosPorUsuario(usuario_id);
});

ipcMain.on('sair-app', () => {
  app.quit();
});