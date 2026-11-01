const mongoose = require("mongoose");
const Curso = require("./Curso");

const alunoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório"],
      trim: true
    },
    apelido: {
      type: String,
      required: [true, "O apelido é obrigatório"],
      trim: true
    },
    idCurso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
      required: [true, "O curso é obrigatório"],
      validate: {
        validator: async (valor) => !!(await Curso.exists({ _id: valor })),
        message: "O curso indicado não existe"
      }
    },
    anoCurricular: {
      type: Number,
      required: [true, "O ano curricular é obrigatório"],
      min: [1, "O ano curricular tem de ser pelo menos 1"],
      max: [6, "O ano curricular não pode ser superior a 6"]
    },
    idade: {
      type: Number,
      required: [true, "A idade é obrigatória"],
      min: [15, "A idade tem de ser pelo menos 15"],
      max: [120, "A idade não pode ser superior a 120"]
    }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => { delete ret._id; }
    }
  }
);

module.exports = mongoose.model("Aluno", alunoSchema);