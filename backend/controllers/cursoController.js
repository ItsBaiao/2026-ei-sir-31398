const Curso = require("../models/Curso");

// GET /cursos
async function listarCursos(req, res) {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar os cursos" });
  }
}

// GET /cursos/:id
async function obterCurso(req, res) {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ erro: "Curso não encontrado" });
    res.json(curso);
  } catch (erro) {
    if (erro.name === "CastError") return res.status(400).json({ erro: "ID inválido" });
    res.status(500).json({ erro: "Erro ao obter o curso" });
  }
}

module.exports = { listarCursos, obterCurso };