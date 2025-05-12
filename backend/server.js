const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hotelDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routes = require('./routes');
app.use('/', routes);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
