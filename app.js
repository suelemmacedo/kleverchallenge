const express = require('express');

const app = express();
app.use(express.json()); // configuração para lidar com dados json nas solicitações.

const port = 3000;


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Roteadores

const detailsRoutes = require('./src/routes/details');
const balanceRoutes = require('./src/routes/balance');
const sendRoutes = require('./src/routes/send'); 

// Configuração Roteadores

app.use('/details', detailsRoutes);
app.use('/balance', balanceRoutes);
app.use('/send', sendRoutes);
