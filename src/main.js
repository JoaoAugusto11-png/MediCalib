const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { inserirManutencao } = require('./database'); // ajuste o caminho se necessário

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

// Adicione este bloco para receber requisições do frontend
ipcMain.handle('inserir-manutencao', async (event, manutencao) => {
  try {
    const id = inserirManutencao(manutencao);
    return { success: true, id };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.on('sair-app', () => {
  app.quit();
});