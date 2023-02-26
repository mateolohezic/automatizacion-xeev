const express = require('express')
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const codigo = require('./routes/codigo');


app.use('/', codigo);

app.listen(8000, () =>  {
    console.log(`Estamos trabajando en el puerto 8000`);
});