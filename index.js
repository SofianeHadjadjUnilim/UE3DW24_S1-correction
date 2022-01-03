const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT;
const apiRouter = require('./routes/apiRouter').router;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/', apiRouter);

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>ソフィアン <span>・</span> ハジャジ</h1>');
});

app.listen(port, () => {
	console.log('Server listening on port : ' + port)
});
