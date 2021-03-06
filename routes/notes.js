const Router = require('express').Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router()

router.get('/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);

    const note = await db.getDb()
        .db()
        .collection('notes')
        .findOne({_id: id});
    
    res.render('notes/detail', {note})
})

router.get('/', (req, res) => {
    res.render('notes/create')
});

router.post('/', (req, res) => {

    const {
        title,
        description
    } = req.body;

    db.getDb()
    .db()
    .collection('notes')
    .insertOne({title: title, desc: description})

  res.redirect(301, '/');
    
});

router.get('/edit/:id', async (req, res) => {
    const id = new ObjectId(req.params.id); 

    const note = await db.getDb()
        .db()
        .collection('notes')
        .findOne({_id: id});

    res.render('notes/edit', {note})

})

router.post ('/update', async (req, res) => {

    const { title, description, id} = req.body;
    const objId = new ObjectId(id);

    console.log(objId)

    db.getDb()
        .db()
        .collection('notes')
        .updateOne({_id: objId}, {$set: {title:title, desc: description}});

    res.redirect(301, '/')
})

router.post('/delete', (req, res) => {

    const data = req.body;    
    const id = new ObjectId(data.id);
    
    db.getDb()
    .db()
    .collection('notes')
    .deleteOne({_id: id});

    res.redirect(301, '/')
})

module.exports = router;