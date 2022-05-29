// config
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

//
const db = require('./db/connection');


// Template Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

// Importacao de rotas
const notesRoutes = require('./routes/notes');

app.use('/notes', notesRoutes)

// Rotas
app.get('/',async (req, res) => {

    const notes = await db.getDb()
    .db()
    .collection('notes')
    .find({})
    .toArray();
    
    res.render('home', {notes});

})

db.initDb((err, db) => {
    if(err) {
        console.log(err);
    } else {
        console.log("O banco conectou")
        app.listen(PORT, () => {
            console.log(`Projeto rodando na PORT ${PORT}`);
    });
    }
});