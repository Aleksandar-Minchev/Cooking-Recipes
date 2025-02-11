import express from 'express';

const app = express();

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('It is working!')
});

app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));
