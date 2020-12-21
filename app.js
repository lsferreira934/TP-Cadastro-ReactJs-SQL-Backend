// Getting essentials settings
const http = require('http');
const express = require('express');
const status = require('http-status');
const sequelize = require('./src/database/database');
const app = express();
const routes = require('./src/routes/routes.js');
const cors = require('cors');

// enable JSON
app.use(express.json());

// Adding cors (to use API's)
app.use(cors());

//
app.get('/api', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
});

app.get('/', function (req, res, next) {
  res.json({
    Bem_Vindo: 'BEM VINDO A API NODEJS-SEQUELIZE-SQL TPBACKEND',
    Link_frontend: 'https://tpfrontendunip.herokuapp.com/',
    Link_gitHub:
      'https://github.com/lsferreira934/TP-Cadastro-ReactJs-SQL-Backend',

    Todas_as_rotas_dispoiveis: {
      Rotas_de_Cliente: {
        post: 'https://tpbackendunip.herokuapp.com/api/cliente',
        get: 'https://tpbackendunip.herokuapp.com/api/cliente',
        get: 'https://tpbackendunip.herokuapp.com/api/cliente/:id',
        put: 'https://tpbackendunip.herokuapp.com/api/cliente/:id',
        delete: 'https://tpbackendunip.herokuapp.com/api/cliente/:id',
      },
      Rotas_de_Produto: {
        post: 'https://tpbackendunip.herokuapp.com/api/produto',
        get: 'https://tpbackendunip.herokuapp.com/api/produto',
        get: 'https://tpbackendunip.herokuapp.com/api/produto/:id',
        put: 'https://tpbackendunip.herokuapp.com/api/produto/:id',
        delete: 'https://tpbackendunip.herokuapp.com/api/produto/:id',
      },
      Rotas_de_Pedido: {
        post: 'https://tpbackendunip.herokuapp.com/api/novopedido',
        put: 'https://tpbackendunip.herokuapp.com/api/atualizarpedido/:id',
        get: 'https://tpbackendunip.herokuapp.com/api/todospedidos',
        put:
          'https://tpbackendunip.herokuapp.com/api/alterarprimeiropedido/:id',
      },
      Rotas_de_Atendimento_reltório: {
        post: 'https://tpbackendunip.herokuapp.com/api/pedidoproduto',
      },
      Rotas_de_relatórios: {
        get: 'https://tpbackendunip.herokuapp.com/api/relatoriocompras',
        post: 'https://tpbackendunip.herokuapp.com/api/pesquisacompra',
        get: 'https://tpbackendunip.herokuapp.com/api/compras',
        post: 'https://tpbackendunip.herokuapp.com/api/compradetalhe',
        get: 'https://tpbackendunip.herokuapp.com/api/agrupamento',
        delete:
          'https://tpbackendunip.herokuapp.com/api/apagarpedidovarios/:id',
        delete: 'https://tpbackendunip.herokuapp.com/api/apagarpedido/:id',
      },
      Rotas_teste: {
        get: 'https://tpbackendunip.herokuapp.com/api/relatorio/:id',
      },
    },
  });
});

// setting group's routes
app.use('/api', routes);

// Error's server, parser.json
app.use((req, res, next) => {
  res.status.apply(status.INTERNAL_SERVER_ERROR).json({ error });
});

// verify table at db_usuario and starting node server
sequelize.sync({ force: false }).then(() => {
  const port = process.env.PORT || 3003;
  app.set('port', port);
  const server = http.createServer(app);
  server.listen(port);
});
