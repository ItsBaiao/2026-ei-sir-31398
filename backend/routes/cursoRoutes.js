const express = require("express");
const { listarCursos, obterCurso } = require("../controllers/cursoController");

const router = express.Router();

router.get("/", listarCursos);
router.get("/:id", obterCurso);

module.exports = router;