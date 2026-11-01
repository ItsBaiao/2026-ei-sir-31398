// JS para operações CRUD com Fetch API

// URL base da API. Na Parte 5 só vais precisar de mudar esta linha.
const API_URL = "http://localhost:3000";

// Lista de cursos em memória (para mostrar o nome do curso em vez do número).
let cursos = [];

// ---------- Elementos da página ----------
const form = document.getElementById("aluno-form");
const inputId = document.getElementById("aluno-id");
const inputNome = document.getElementById("nome");
const inputApelido = document.getElementById("apelido");
const selectCurso = document.getElementById("curso");
const inputAno = document.getElementById("ano");
const inputIdade = document.getElementById("idade");
const formTitulo = document.getElementById("form-titulo");
const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");
const tabela = document.getElementById("tabela-alunos");
const mensagem = document.getElementById("mensagem");

// ---------- Mensagens para o utilizador ----------
function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.className = erro ? "erro" : "sucesso";
}

// ---------- Cursos ----------
async function carregarCursos() {
  const resposta = await fetch(`${API_URL}/cursos`);
  if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
  cursos = await resposta.json();

  selectCurso.innerHTML = "";
  selectCurso.add(new Option("Escolhe um curso", ""));
  cursos.forEach(curso => selectCurso.add(new Option(curso.nomeDoCurso, curso.id)));
}

function nomeDoCurso(idCurso) {
  const curso = cursos.find(c => c.id === idCurso);
  return curso ? curso.nomeDoCurso : "Sem curso";
}

// ---------- Ver alunos ----------
async function carregarAlunos() {
  const resposta = await fetch(`${API_URL}/alunos`);
  if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
  const alunos = await resposta.json();
  mostrarAlunos(alunos);
}

function mostrarAlunos(alunos) {
  tabela.innerHTML = "";

  alunos.forEach(aluno => {
    const tr = document.createElement("tr");

    const valores = [
      aluno.nome,
      aluno.apelido,
      nomeDoCurso(aluno.idCurso),
      aluno.anoCurricular,
      aluno.idade
    ];
    valores.forEach(valor => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });

    const tdAcoes = document.createElement("td");

    // BLOCO 3 (botão Editar) entra aqui

    // BLOCO 2 (botão Apagar) entra aqui

    tr.appendChild(tdAcoes);
    tabela.appendChild(tr);
  });
}

// BLOCOS 2 e 3 (funções novas) entram aqui, acima de iniciar()

// ---------- Arranque ----------
async function iniciar() {
  try {
    await carregarCursos();
    await carregarAlunos();
  } catch (erro) {
    mostrarMensagem(`Não foi possível ligar à API (${erro.message}). O servidor está a correr?`, true);
  }
}

iniciar();