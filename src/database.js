const Database = require('better-sqlite3');
const db = new Database('medicalib.db');

// Criação das tabelas (execute uma vez)
db.exec(`
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  login TEXT UNIQUE,
  senha TEXT,
  tipo TEXT,
  empresa TEXT
);

CREATE TABLE IF NOT EXISTS equipamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  fabricante TEXT,
  modelo TEXT,
  numero_serie TEXT,
  usuario_id INTEGER,
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS tecnicos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  funcao TEXT
);

CREATE TABLE IF NOT EXISTS manutencoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  equipamento_id INTEGER,
  tipo TEXT,
  prioridade TEXT,
  data_hora_prevista TEXT,
  causa TEXT,
  tecnico_id INTEGER,
  supervisor TEXT,
  duracao TEXT,
  janela_inicio TEXT,
  janela_fim TEXT,
  requer_aprovacao INTEGER,
  justificativa TEXT,
  status TEXT,
  usuario_id INTEGER,
  FOREIGN KEY(equipamento_id) REFERENCES equipamentos(id),
  FOREIGN KEY(tecnico_id) REFERENCES tecnicos(id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS pecas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  codigo TEXT
);

CREATE TABLE IF NOT EXISTS manutencao_pecas (
  manutencao_id INTEGER,
  peca_id INTEGER,
  quantidade INTEGER,
  FOREIGN KEY(manutencao_id) REFERENCES manutencoes(id),
  FOREIGN KEY(peca_id) REFERENCES pecas(id)
);

CREATE TABLE IF NOT EXISTS anexos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  manutencao_id INTEGER,
  nome_arquivo TEXT,
  caminho TEXT,
  FOREIGN KEY(manutencao_id) REFERENCES manutencoes(id)
);
`);

function inserirManutencao(manutencao) {
  const stmt = db.prepare(`
    INSERT INTO manutencoes (
      equipamento_id, tipo, prioridade, data_hora_prevista, causa, tecnico_id, supervisor, duracao, janela_inicio, janela_fim, requer_aprovacao, justificativa, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    manutencao.equipamento_id,
    manutencao.tipo,
    manutencao.prioridade,
    manutencao.data_hora_prevista,
    manutencao.causa,
    manutencao.tecnico_id,
    manutencao.supervisor,
    manutencao.duracao,
    manutencao.janela_inicio,
    manutencao.janela_fim,
    manutencao.requer_aprovacao ? 1 : 0,
    manutencao.justificativa,
    manutencao.status
  );
  return info.lastInsertRowid;
}

// Função para cadastrar usuário (apenas admin deve poder usar)
function cadastrarUsuario({ nome, login, senha, tipo, empresa }) {
  const stmt = db.prepare(`
    INSERT INTO usuarios (nome, login, senha, tipo, empresa)
    VALUES (?, ?, ?, ?, ?)
  `);
  try {
    stmt.run(nome, login, senha, tipo, empresa);
    return { success: true };
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, error: 'Login já existe.' };
    }
    return { success: false, error: err.message };
  }
}

// Função para autenticar login
function autenticarUsuario({ login, senha }) {
  const stmt = db.prepare(`
    SELECT id, nome, tipo, empresa FROM usuarios WHERE login = ? AND senha = ?
  `);
  const usuario = stmt.get(login, senha);
  if (usuario) {
    return { success: true, usuario };
  } else {
    return { success: false, error: 'Login ou senha inválidos.' };
  }
}

function cadastrarEquipamento({ nome, fabricante, modelo, numero_serie, usuario_id }) {
  const stmt = db.prepare(`
    INSERT INTO equipamentos (nome, fabricante, modelo, numero_serie, usuario_id)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(nome, fabricante, modelo, numero_serie, usuario_id);
  return { success: true };
}

function listarEquipamentosPorUsuario(usuario_id) {
  const stmt = db.prepare('SELECT * FROM equipamentos WHERE usuario_id = ?');
  return stmt.all(usuario_id);
}

module.exports = {
  db,
  inserirManutencao,
  cadastrarUsuario,
  autenticarUsuario,
  cadastrarEquipamento,
  listarEquipamentosPorUsuario,
};