const express = require('express');
const app = express();
const port = 3000;
const posts = require('./data/posts.js');
const comments = require('./data/comments.js');

const users = require('./routes/users');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.use('/posts', posts);
// app.use('/comments', comments);
app.use('/users', users);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})