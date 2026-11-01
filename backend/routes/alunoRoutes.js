const express = require("express");
const {
  listarAlunos,
  obterAluno,
  criarAluno,
  atualizarAluno,
  apagarAluno
} = require("../controllers/alunoController");

const router = express.Router();

router.get("/", listarAlunos);
router.get("/:id", obterAluno);
router.post("/", criarAluno);
router.put("/:id", atualizarAluno);
router.patch("/:id", atualizarAluno);
router.delete("/:id", apagarAluno);

module.exports = router;