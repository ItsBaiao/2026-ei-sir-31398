// Documentação OpenAPI (Swagger) da API.
// É mostrada na rota /api-docs através do swagger-ui-express.

const json = (ref) => ({ "application/json": { schema: { $ref: ref } } });

const respostaErro = (descricao, exemplo) => ({
  description: descricao,
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/Erro" },
      example: exemplo
    }
  }
});

module.exports = {
  openapi: "3.0.3",
  info: {
    title: "API de Alunos e Cursos",
    version: "1.0.0",
    description:
      "API RESTful para gerir alunos e consultar cursos. " +
      "Trabalho Prático #1 de Sistemas de Informação em Rede (Node.js, Express e MongoDB Atlas)."
  },
  // "/" = o próprio servidor onde esta página está a correr (local ou Render)
  servers: [{ url: "/", description: "Servidor atual" }],
  tags: [
    { name: "Alunos", description: "Criar, consultar, editar e apagar alunos" },
    { name: "Cursos", description: "Consultar cursos (só leitura)" }
  ],
  paths: {
    "/alunos": {
      get: {
        tags: ["Alunos"],
        summary: "Listar todos os alunos",
        responses: {
          200: {
            description: "Lista de alunos",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Aluno" } }
              }
            }
          },
          500: { $ref: "#/components/responses/ErroInterno" }
        }
      },
      post: {
        tags: ["Alunos"],
        summary: "Criar um aluno",
        requestBody: {
          required: true,
          content: json("#/components/schemas/AlunoEntrada")
        },
        responses: {
          201: { description: "Aluno criado", content: json("#/components/schemas/Aluno") },
          400: { $ref: "#/components/responses/DadosInvalidos" },
          500: { $ref: "#/components/responses/ErroInterno" }
        }
      }
    },
    "/alunos/{id}": {
      parameters: [{ $ref: "#/components/parameters/IdAluno" }],
      get: {
        tags: ["Alunos"],
        summary: "Obter um aluno pelo id",
        responses: {
          200: { description: "O aluno pedido", content: json("#/components/schemas/Aluno") },
          400: { $ref: "#/components/responses/IdInvalido" },
          404: { $ref: "#/components/responses/AlunoNaoEncontrado" },
          500: { $ref: "#/components/responses/ErroInterno" }
        }
      },
      put: {
        tags: ["Alunos"],
        summary: "Editar um aluno",
        requestBody: {
          required: true,
          content: json("#/components/schemas/AlunoEntrada")
        },
        responses: {
          200: { description: "Aluno atualizado", content: json("#/components/schemas/Aluno") },
          400: { $ref: "#/components/responses/DadosInvalidos" },
          404: { $ref: "#/components/responses/AlunoNaoEncontrado" },
          500: { $ref: "#/components/responses/ErroInterno" }
        }
      },
      patch: {
        tags: ["Alunos"],
        summary: "Editar alguns campos de um aluno",
        requestBody: {
          required: true,
          content: json("#/components/schemas/AlunoEntrada")
        },
        responses: {
          200: { description: "Aluno atualizado", content: json("#/components/schemas/Aluno") },
          400: { $ref: "#/components/responses/DadosInvalidos" },
          404: { $ref: "#/components/responses/AlunoNaoEncontrado" },
          500: { $ref: "#/components/responses/ErroInterno" }
        }
      },
      delete: {
        tags: ["Alunos"],
        summary: "Apagar um aluno",
        responses: {
          200: { description: "Aluno apagado", content: json("#/components/schemas/Mensagem") },
          400: { $ref: "#/components/responses/IdInvalido" },
          404: { $ref: "#/components/responses/AlunoNaoEncontrado" },
          500: { $ref: "#/components/responses/ErroInterno" }
        }
      }
    },
    "/cursos": {
      get: {
        tags: ["Cursos"],
        summary: "Listar todos os cursos",
        responses: {
          200: {
            description: "Lista de cursos",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Curso" } }
              }
            }
          },
          500: { $ref: "#/components/responses/ErroInterno" }
        }
      }
    },
    "/cursos/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Id do curso (texto do MongoDB, 24 caracteres)",
          schema: { type: "string", example: "6ae797854040691132bcbea3" }
        }
      ],
      get: {
        tags: ["Cursos"],
        summary: "Obter um curso pelo id",
        responses: {
          200: { description: "O curso pedido", content: json("#/components/schemas/Curso") },
          400: { $ref: "#/components/responses/IdInvalido" },
          404: {
            description: "Curso não encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Erro" },
                example: { erro: "Curso não encontrado" }
              }
            }
          },
          500: { $ref: "#/components/responses/ErroInterno" }
        }
      }
    }
  },
  components: {
    parameters: {
      IdAluno: {
        name: "id",
        in: "path",
        required: true,
        description: "Id do aluno (texto do MongoDB, 24 caracteres)",
        schema: { type: "string", example: "6ae797864040691132bcbea8" }
      }
    },
    schemas: {
      Aluno: {
        type: "object",
        properties: {
          id: { type: "string", example: "6ae797864040691132bcbea8" },
          nome: { type: "string", example: "Joana" },
          apelido: { type: "string", example: "Silva" },
          idCurso: {
            type: "string",
            description: "Id de um curso existente",
            example: "6ae797854040691132bcbea3"
          },
          anoCurricular: { type: "integer", minimum: 1, maximum: 6, example: 2 },
          idade: { type: "integer", minimum: 15, maximum: 120, example: 21 }
        }
      },
      AlunoEntrada: {
        type: "object",
        required: ["nome", "apelido", "idCurso", "anoCurricular", "idade"],
        properties: {
          nome: { type: "string", example: "Joana" },
          apelido: { type: "string", example: "Silva" },
          idCurso: {
            type: "string",
            description: "Id de um curso existente (obtém-no em GET /cursos)",
            example: "6ae797854040691132bcbea3"
          },
          anoCurricular: { type: "integer", minimum: 1, maximum: 6, example: 2 },
          idade: { type: "integer", minimum: 15, maximum: 120, example: 21 }
        }
      },
      Curso: {
        type: "object",
        properties: {
          id: { type: "string", example: "6ae797854040691132bcbea3" },
          nomeDoCurso: {
            type: "string",
            example: "Engenharia da Computação Gráfica e Multimédia"
          }
        }
      },
      Mensagem: {
        type: "object",
        properties: {
          mensagem: { type: "string", example: "Aluno apagado com sucesso" }
        }
      },
      Erro: {
        type: "object",
        properties: {
          erro: { type: "string", example: "Dados inválidos" },
          detalhes: {
            type: "array",
            items: { type: "string" },
            example: ["A idade tem de ser pelo menos 15"]
          }
        }
      }
    },
    responses: {
      DadosInvalidos: respostaErro("Dados inválidos (campo em falta ou fora dos limites, ou curso inexistente)", {
        erro: "Dados inválidos",
        detalhes: ["A idade tem de ser pelo menos 15"]
      }),
      IdInvalido: respostaErro("O id não tem o formato correto", { erro: "ID inválido" }),
      AlunoNaoEncontrado: respostaErro("Aluno não encontrado", { erro: "Aluno não encontrado" }),
      ErroInterno: respostaErro("Erro interno do servidor", { erro: "Erro interno do servidor" })
    }
  }
};