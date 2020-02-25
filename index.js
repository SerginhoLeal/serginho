require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const cors = require('cors');
const server = express();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

server.use(cors());

server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3000);