const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const cors = require('cors');
const express = require('express');

dotenv.config();

const app = express();
const port = process.env.PORT;
const apiRouter = require('./routes/apiRouter').router;


app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/', apiRouter);

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>ソフィアン <span>・</span> ハジャジ</h1>');
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server listening on port : ${port}`);
    });
}

module.exports = app;