// Dependencies for routing middleware
const router = require('express').Router();
const path = require('path');

//write before '*' bc router will stop reading the routes that follow if the first one matches
// when the route reads /notes in the URL, render file notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html' ))
})


module.exports = router