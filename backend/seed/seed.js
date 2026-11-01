// Copia os dados de mock-data/bd.json para o MongoDB Atlas.
// ATENÇÃO: apaga primeiro o que já existe nas coleções alunos e cursos.
// Uso (dentro da pasta backend):  npm run seed
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const conectarBD = require("../config/db");
const Aluno = require("../models/Aluno");
const Curso = require("../models/Curso");

async function semear() {
  const caminho = path.join(__dirname, "..", "..", "mock-data", "bd.json");
  const bd = JSON.parse(fs.readFileSync(caminho, "utf8"));

  await conectarBD();

  await Aluno.deleteMany({});
  await Curso.deleteMany({});

  // O Mongo cria ids novos. Guardamos a correspondência: id antigo -> id novo.
  const novosIds = {};
  for (const curso of bd.cursos) {
    const criado = await Curso.create({ nomeDoCurso: curso.nomeDoCurso });
    novosIds[curso.id] = criado._id;
  }

  for (const aluno of bd.alunos) {
    await Aluno.create({
      nome: aluno.nome,
      apelido: aluno.apelido,
      idCurso: novosIds[aluno.idCurso],
      anoCurricular: aluno.anoCurricular,
      idade: aluno.idade
    });
  }

  console.log(`Importados ${bd.cursos.length} cursos e ${bd.alunos.length} alunos.`);
  await mongoose.disconnect();
}

semear().catch(async (erro) => {
  console.error("Erro ao importar dados:", erro.message);
  await mongoose.disconnect();
  process.exit(1);
});