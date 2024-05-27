require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const posts = require("./controllers/posts");

app.use(express.json());

// Asset statico per la cartella public
app.use(express.static('public'));

// Rotte
app.get('/', (req, res) => {
    res.send('<h1>Benvenuto nel mio blog</h1>');
})
app.get('/posts', posts.index);
app.post('/posts', posts.create);

// Server in ascolto
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});