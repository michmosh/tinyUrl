const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

const Url = require('./models/Url.model');
const {UrlHelper} = require('./helpers/tinyUrl.helper');

// Load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});

/* LIST ROUTES */
app.get('/:short_url', (req , res)=>{
    UrlHelper.redirect(req,res)
 });;

app.post('/url',async (req, res)=> {
    try {
        let short_url = await UrlHelper.createNewUrl(req.body.long_url);
        res.send({url:short_url});
      } catch (err) {
        return res.status(400).send('invalid URL');
      }
});

// Url.find()
// .then(res=>{
//     console.log(res);
// });

// mongoose.connection.dropCollection('urls',((err , res)=>{
//     console.log(res);
// }));

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})