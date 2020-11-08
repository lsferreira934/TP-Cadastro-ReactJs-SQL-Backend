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
    Bem_Vindo: 'BEM VINDO A API SQUELIZE TPBACKEND',
    Link_frontend: 'https://tpfrontendunip.herokuapp.com/',
    Todas_as_rotas_dispoiveis: {
      Rotas_de_Cliente: {
        post: 'api/cliente',
        get: 'api/cliente',
        get: 'api/cliente/:id',
        put: 'api/cliente/:id',
        delete: 'api/cliente/:id',
      },
      Rotas_de_Produto: {
        post: 'api/produto',
        get: 'api/produto',
        get: 'api/produto/:id',
        put: 'api/produto/:id',
        delete: 'api/produto/:id',
      },
      Rotas_de_Pedido: {
        post: 'api/novopedido',
        put: 'api/atualizarpedido/:id',
        get: 'api/todospedidos',
        put: 'api/alterarprimeiropedido/:id',
      },
      Rotas_de_Atendimento_reltório: {
        post: '/pedidoproduto',
      },
      Rotas_de_relatórios: {
        get: '/relatoriocompras',
        post: '/pesquisacompra',
        get: '/compras',
        post: '/compradetalhe',
        get: '/agrupamento',
        delete: '/apagarpedidovarios/:id',
        delete: '/apagarpedido/:id',
      },
      Rotas_teste: {
        get: '/relatorio/:id',
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
