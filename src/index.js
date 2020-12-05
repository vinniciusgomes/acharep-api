const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(routes);

app.listen(process.env.PORT || 3333);
