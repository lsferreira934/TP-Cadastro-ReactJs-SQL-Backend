// carregando arquivos/depêndencias necessárias
const PedidoProduto = require('../models/pedidoProduto');
const Cliente = require('../models/cliente');
const Pedido = require('../models/pedido');
const Produto = require('../models/produto');
const sequelize = require('../database/database');

// route de cadastro
exports.Insert = async (req, res) => {
  try {
    const { id_cliente, id_pedido, id_produto, quantidade } = req.body;
    const cliente = await Cliente.findOne({ where: { id: id_cliente } });
    const pedido = await Pedido.findOne({ where: { id_pedido: id_pedido } });
    const produto = await Produto.findByPk(id_produto);

    if (!cliente) {
      res.status(400).json({
        Erro: `Cliente não encontrado!`,
      });
    }
    if (!pedido) {
      res.status(400).json({
        Erro: `Pedido não encontrado!`,
      });
    }
    if (!produto) {
      res.status(400).json({
        Erro: `Produto não encontrado!`,
      });
    }

    if (quantidade > produto.qtd_estoque) {
      throw new Error('Quantidade insuficiente no estoque!');
    }

    const novoPedido = await PedidoProduto.create({
      id_cliente: cliente.id,
      id_pedido: pedido.id,
      id_produto: produto.id,
      quantidade: quantidade,
      valor_unidade: produto.valor_venda,
      valor_total: produto.valor_venda * quantidade,
    });
    const removeEstoque = produto.qtd_estoque - quantidade;
    await produto.update(
      { qtd_estoque: removeEstoque },
      { where: { id_produto: id_produto } }
    );
    res.json(novoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Show = async (req, res) => {
  try {
    const [todasCompras] = await sequelize.query(
      `SELECT * FROM vw_relatorioCompra`
    );
    res.json(todasCompras);
  } catch (error) {
    res.status(400).json(`Erro ao emitir relatório: ${error}`);
  }
};

exports.Index = async (req, res) => {
  try {
    const idPesquisa = req.body.Codigo_Pedido;
    const verificaId = await Pedido.findOne({
      where: { id_pedido: idPesquisa },
    });

    if (!verificaId) {
      return res.json({ error: `Não existe compra com o código solicitado` });
    }

    //res.send(idPesquisa);

    const [pesquisaCompra] = await sequelize.query(
      `select * from vw_relatorioCompra where Codigo_Pedido = ${idPesquisa}`
    );
    console.log(pesquisaCompra);
    res.json(pesquisaCompra);
  } catch (error) {
    res.status(400).json(`Erro ao buscar relatório: ${error}`);
  }
};

exports.Compras = async (req, res) => {
  try {
    const [todasCompras] = await sequelize.query(`
  select 
    Codigo_Pedido , 
     Cliente, 
    Data_Pedido, 
    sum(Valor_Total) as 'Faturamento',
    Observação
  from vw_relatorioCompra 
  group by cliente;`);

    res.json(todasCompras);
  } catch (error) {
    res.status(400).json(`Erro ao puxar relatório: ${error}`);
  }
};

exports.PedidoDetalhe = async (req, res) => {
  try {
    const idPesquisa = req.body.Codigo_Pedido;
    const verificaId = await Pedido.findOne({
      where: { id_pedido: idPesquisa },
    });

    if (!verificaId) {
      return res.json({ error: `Não existe compra com o código solicitado` });
    }

    const [pedidoDetalhe] = await sequelize.query(`
    select 
      Codigo_Pedido, 
      Cliente,
      Data_Pedido,
      sum(Valor_Total) as 'Faturamento', 
      Observação 
    from vw_relatorioCompra 
    where Codigo_Pedido = ${idPesquisa}`);
    res.json(pedidoDetalhe);
  } catch (error) {
    res.status(400).json(`Erro ao buscar relatório: ${error}`);
  }
};

exports.All = async (req, res) => {
  try {
    const idPesquisa = req.params.id;

    const verificaId = await PedidoProduto.findAll({
      where: { id_pedido: idPesquisa },
    });

    if (!verificaId) {
      return res.json({ error: `Não existe compra com o código solicitado` });
    }
    res.send(verificaId);
  } catch (error) {
    res.status(400).json(`Erro ao buscar relatório: ${error}`);
  }
};

exports.Agrupamento = async (req, res) => {
  try {
    const [agrupamentoCompras] = await sequelize.query(`
    select Codigo_Pedido, cliente, group_concat(produto) as 'produtos',  
    group_concat(Valor_Unitário) as 'valor_unitario' ,
    group_concat(Quantidade) as 'quantidade_respectiva',
    sum(Valor_Total) as 'faturamento',  
    data_pedido, 
    Observação 
 from vw_relatorioCompra group by Codigo_Pedido`);

    res.json(agrupamentoCompras);
  } catch (error) {
    res.status(400).json(`Erro ao puxar relatório: ${error}`);
  }
};
exports.Destroy = async (req, res) => {
  try {
    const pedidoId = req.params.id;

    const pedido = await PedidoProduto.findOne({
      where: { id: pedidoId },
    });

    if (pedido === null) {
      return res.json({
        error: `Pedido não cadastrado! `,
      });
    }
    const deletarPedido = await pedido.destroy();
    res.json(deletarPedido);
  } catch (error) {
    res.status(400).json(`Erro ao apagar o pedido: ${error}`);
  }
};

exports.DestroyAll = async (req, res) => {
  try {
    await PedidoProduto.destroy({ where: { id_pedido: req.params.id } });
    res.json();
  } catch (error) {
    res.status(400).json(`Erro ao apagar o pedido: ${error}`);
  }
};
