const Carrinho = require("../model/Carrinho");
const Pedido = require("../model/Pedido");

function add(req, res) {
    let carrinho = req.session.carrinho || { itens: [] };
    let pedido = new Pedido({
      nome: req.body.nome,
      cpf: req.body.cpf,
      email: req.body.email,
      endereco: req.body.endereco,
      cidade: req.body.cidade,
      cep: req.body.cep,
      celular: req.body.celular,
      produtos: carrinho.itens.map(item => ({
        produto: item.produto,
        quantidade: item.quantidade,
        preco: item.preco
      }))
    });
  
    pedido
      .save()
      .then(function (pedido) {
        // Limpar carrinho após salvar pedido
        req.session.carrinho = { itens: [] };
        res.redirect("/obrigado");
      })
      .catch(function (err) {
        res.send(err);
      });
  }

  function listar(req, res) {
    Pedido.find({})
      .populate("produtos.produto") // Populando o campo 'produtos.produto' para acessar os dados dos produtos associados
      .then(function (pedidos, err) {
        if (err) {
          res.send(err);
        } else {
          pedidos.forEach(pedido => {
            pedido.total = pedido.produtos.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
            pedido.itens = pedido.produtos.map(p => p.produto.titulo).join(", ");
          });
          console.log(pedidos);
          res.render("pedido/lst", {
            Pedidos: pedidos,
          });
        }
      });
  }
  

  function filtrar(req, res) {
    Pedido.find({
      "produtos.produto": req.body.produto_id // Ajuste para buscar pelo ID do produto corretamente
    })
      .populate("produtos.produto")
      .then(function (pedidos, err) {
        if (err) {
          res.send(err);
        } else {
          res.render("pedido/lst", {
            Pedidos: pedidos,
          });
        }
      });
  }
  

function del(req, res) {
  Pedido.findByIdAndDelete(req.params.id).then(function (pedido, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/pedido/lst");
    }
  });
}

module.exports = {
  add,
  listar,
  filtrar,
  del,
};
