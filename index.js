// config
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Projeto rodando na PORT ${PORT}`);
})