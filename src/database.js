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

function gerarToken() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Função para cadastrar usuário (apenas admin deve poder usar)
function cadastrarUsuario({ nome, login, senha, tipo, empresa }) {
  const token = gerarToken(); // Função que gera o token
  const stmt = db.prepare(`
    INSERT INTO usuarios (nome, login, senha, tipo, empresa, token)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(nome, login, senha, tipo, empresa, token);
  return { success: true, token }; // <-- IMPORTANTE: retorna o token
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

// Excluir equipamento
function excluirEquipamento(id) {
  const stmt = db.prepare('DELETE FROM equipamentos WHERE id = ?');
  stmt.run(id);
  return { success: true };
}

// Editar equipamento
function editarEquipamento({ id, nome, fabricante, modelo, numero_serie }) {
  const stmt = db.prepare(`
    UPDATE equipamentos
    SET nome = ?, fabricante = ?, modelo = ?, numero_serie = ?
    WHERE id = ?
  `);
  stmt.run(nome, fabricante, modelo, numero_serie, id);
  return { success: true };
}

// Validar token de recuperação de senha
function validarToken({ login, token }) {
  const stmt = db.prepare(`
    SELECT id FROM usuarios
    WHERE LOWER(TRIM(login)) = LOWER(TRIM(?)) AND LOWER(TRIM(token)) = LOWER(TRIM(?))
  `);
  const usuario = stmt.get(login.trim(), token.trim());
  console.log('Tentando validar token:', login, token, 'Encontrado:', usuario);
  return !!usuario;
}

// Redefinir senha usando token
function redefinirSenha({ login, token, novaSenha }) {
  const stmt = db.prepare(`
    UPDATE usuarios
    SET senha = ?
    WHERE LOWER(TRIM(login)) = LOWER(TRIM(?)) AND LOWER(TRIM(token)) = LOWER(TRIM(?))
  `);
  stmt.run(novaSenha, login.trim(), token.trim());
  return { success: true };
}

module.exports = {
  db,
  inserirManutencao,
  cadastrarUsuario,
  autenticarUsuario,
  cadastrarEquipamento,
  listarEquipamentosPorUsuario,
  excluirEquipamento,
  editarEquipamento,
  validarToken,
  redefinirSenha
};