const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

server.use(cors());
mongoose.connect('mongodb://localhost/omnistack', { useNewUrlParser: true });
server.use(express.json()); //Informar pro servidor ler em json
server.use(routes);

server.listen(3333);
