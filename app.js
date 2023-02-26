const express = require('express')
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });


const codigo = require('./routes/codigo');


app.use('/', codigo);

app.listen(8000, () =>  {
    console.log(`Estamos trabajando en el puerto 8000`);
});