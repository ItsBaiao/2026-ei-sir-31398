const mongoose = require("mongoose");

async function conectarBD() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("A variável MONGODB_URI não está definida no ficheiro .env");
  }
  await mongoose.connect(uri);
  console.log("Ligado ao MongoDB Atlas");
}

module.exports = conectarBD;