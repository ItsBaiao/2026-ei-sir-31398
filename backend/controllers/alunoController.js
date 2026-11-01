const Aluno = require("../models/Aluno");

// Trata os erros mais comuns e devolve o código HTTP adequado
function tratarErro(erro, res, acao) {
  if (erro.name === "CastError") {
    return res.status(400).json({ erro: "ID inválido" });
  }
  if (erro.name === "ValidationError") {
    const mensagens = Object.values(erro.errors).map((e) => e.message);
    return res.status(400).json({ erro: "Dados inválidos", detalhes: mensagens });
  }
  console.error(erro);
  return res.status(500).json({ erro: `Erro ao ${acao}` });
}

// GET /alunos
async function listarAlunos(req, res) {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (erro) {
    tratarErro(erro, res, "listar os alunos");
  }
}

// GET /alunos/:id
async function obterAluno(req, res) {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (erro) {
    tratarErro(erro, res, "obter o aluno");
  }
}

// POST /alunos
async function criarAluno(req, res) {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (erro) {
    tratarErro(erro, res, "criar o aluno");
  }
}

// PUT /alunos/:id  (e PATCH)
async function atualizarAluno(req, res) {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,            // devolve o aluno já atualizado
      runValidators: true   // aplica as regras do modelo também na edição
    });
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (erro) {
    tratarErro(erro, res, "atualizar o aluno");
  }
}

// DELETE /alunos/:id
async function apagarAluno(req, res) {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json({ mensagem: "Aluno apagado com sucesso" });
  } catch (erro) {
    tratarErro(erro, res, "apagar o aluno");
  }
}

module.exports = { listarAlunos, obterAluno, criarAluno, atualizarAluno, apagarAluno };