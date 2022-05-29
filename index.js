// config
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Template Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Importacao de rotas
const notesRoutes = require('./routes/notes');

app.use('/notes', notesRoutes)

// Rotas
app.get('/', (req, res) => {

    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Projeto rodando na PORT ${PORT}`);
})