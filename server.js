import express from 'express';
import mongoose from 'mongoose';
import Cards from './schema/dbCards.js'
import Cors from 'cors'

//App Config
const app = express();
const port = process.env.PORT || 8002;
const connection_url = 'mongodb+srv://admin-tinder:fFaRShMGjiiN9qcz@cluster0.asc7y.mongodb.net/tinder_clone-db?retryWrites=true&w=majority';

//Middleware
app.use(express.json());
app.use(Cors());
//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
//API Endpoints
app.get('/',(req,res) => res.status(200).send('Hello world!'));

app.post('/tinder/cards', (req, res) =>{
    const dbCard = req.body;

    Cards.create(dbCard, (err, data)=>{
        (err) ? res.status(500).send(err): res.status(201).send(data);
    });
});
app.get('/tinder/cards', (req, res)=>{
    Cards.find((err, data)=>{
        (err) ? res.status(500).send(err): res.status(200).send(data);
    });
});
//Listener
app.listen(port, ()=> console.log(`Listening on Localhost ${port}`));