// API real a ser implementada
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conectarBD = require("./config/db");
const cursoRoutes = require("./routes/cursoRoutes");

const app = express();

app.use(cors());          // permite que o front-end (outro endereço) chame esta API
app.use(express.json());  // lê o corpo dos pedidos em JSON

app.get("/", (req, res) => {
  res.json({ mensagem: "API de Alunos a funcionar" });
});

app.use("/cursos", cursoRoutes);

// Rota inexistente
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// JSON mal formado ou outros erros não tratados
app.use((erro, req, res, next) => {
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido no corpo do pedido" });
  }
  console.error(erro);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 3001;

conectarBD()
  .then(() => {
    app.listen(PORT, () => console.log(`API a correr em http://localhost:${PORT}`));
  })
  .catch((erro) => {
    console.error("Não foi possível ligar à base de dados:", erro.message);
    process.exit(1);
  });