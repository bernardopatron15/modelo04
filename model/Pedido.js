const conexao = require('../config/conexao');
const Schema = conexao.Schema;

let PedidoSchema = new Schema({
    usuario: { type: conexao.Schema.Types.ObjectId, ref: 'Usuario' },
    nome: String,
    cpf: String,
    email: String,
    endereco: String,
    cidade: String,
    cep: String,
    celular: String,
    produtos: [{
        produto: { type: conexao.Schema.Types.ObjectId, ref: 'Produto' },
        quantidade: { type: Number, required: true },
        preco: { type: Number, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = conexao.model("Pedido", PedidoSchema);
